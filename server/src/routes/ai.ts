import { Router, Request, Response } from 'express'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { authenticateToken } from './auth'
import { db } from '../database/init'

export const aiRouter = Router()

interface AuthRequest extends Request {
  user?: { userId: number; email: string }
}

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '')
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

// AI-powered carbon footprint analysis
aiRouter.post('/analyze-footprint', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId

    // Get user's recent activities
    const activities = db.prepare(`
      SELECT 
        a.description,
        a.carbon_footprint,
        a.date,
        ac.name as category_name
      FROM activities a
      JOIN activity_categories ac ON a.category_id = ac.id
      WHERE a.user_id = ?
      ORDER BY a.date DESC
      LIMIT 20
    `).all(userId)

    const totalCarbon = activities.reduce((sum: number, activity: any) => sum + activity.carbon_footprint, 0)

    const prompt = `
    Analyze this user's carbon footprint data and provide personalized insights:
    
    Total Carbon Footprint: ${totalCarbon.toFixed(1)} kg CO₂
    Number of Activities: ${activities.length}
    
    Activities breakdown:
    ${activities.map((a: any) => `- ${a.category_name}: ${a.description} (${a.carbon_footprint}kg CO₂) on ${a.date}`).join('\n')}
    
    Please provide:
    1. A brief analysis of their carbon footprint patterns
    2. Top 3 specific recommendations to reduce their carbon footprint
    3. Positive reinforcement for good habits
    4. One interesting fact about their environmental impact
    
    Keep the response encouraging, actionable, and under 300 words. Use a friendly, motivational tone.
    `

    const result = await model.generateContent(prompt)
    const analysis = result.response.text()

    res.json({
      analysis,
      totalCarbon,
      activitiesAnalyzed: activities.length
    })
  } catch (error) {
    console.error('AI analysis error:', error)
    res.status(500).json({ error: 'Failed to analyze carbon footprint' })
  }
})

// AI-powered activity suggestions
aiRouter.post('/suggest-activities', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { context } = req.body // e.g., "going to work", "grocery shopping", "weekend plans"
    
    const prompt = `
    I need eco-friendly activity suggestions for this context: "${context}"
    
    Please provide 5 specific, actionable suggestions that would reduce carbon footprint.
    Format as a JSON array with objects containing:
    - title: Brief title
    - description: Detailed description
    - estimatedSaving: Estimated CO₂ savings in kg
    - difficulty: "easy", "medium", or "hard"
    - category: "transportation", "energy", "food", "waste", or "shopping"
    
    Focus on practical, achievable actions. Be specific with numbers and savings.
    `

    const result = await model.generateContent(prompt)
    let suggestions
    
    try {
      suggestions = JSON.parse(result.response.text())
    } catch {
      // Fallback if AI doesn't return valid JSON
      suggestions = [
        {
          title: "Walk or bike instead of driving",
          description: "For trips under 3 miles, walking or biking can save significant emissions while improving your health.",
          estimatedSaving: 2.4,
          difficulty: "easy",
          category: "transportation"
        }
      ]
    }

    res.json({ suggestions })
  } catch (error) {
    console.error('AI suggestions error:', error)
    res.status(500).json({ error: 'Failed to generate suggestions' })
  }
})

// AI-powered carbon calculation from description
aiRouter.post('/calculate-carbon', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { description, category } = req.body

    const prompt = `
    Calculate the carbon footprint for this activity: "${description}"
    Category: ${category}
    
    Based on standard carbon footprint calculations, estimate the CO₂ emissions in kilograms.
    Consider factors like:
    - Distance (if transportation)
    - Energy consumption (if energy-related)
    - Food production (if food-related)
    - Manufacturing impact (if shopping)
    - Waste processing (if waste-related)
    
    Respond with ONLY a number (the kg CO₂ equivalent). No explanation, just the number.
    If you cannot determine, respond with 0.
    `

    const result = await model.generateContent(prompt)
    const carbonFootprint = parseFloat(result.response.text().trim()) || 0

    res.json({ 
      carbonFootprint: Math.round(carbonFootprint * 10) / 10, // Round to 1 decimal
      description,
      category 
    })
  } catch (error) {
    console.error('Carbon calculation error:', error)
    res.status(500).json({ 
      carbonFootprint: 0,
      error: 'Failed to calculate carbon footprint' 
    })
  }
})

// AI-powered eco tips
aiRouter.get('/daily-tip', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId
    
    // Get user's most common category
    const categoryStats = db.prepare(`
      SELECT 
        ac.name,
        COUNT(*) as count,
        AVG(a.carbon_footprint) as avg_carbon
      FROM activities a
      JOIN activity_categories ac ON a.category_id = ac.id
      WHERE a.user_id = ?
      GROUP BY ac.id
      ORDER BY count DESC
      LIMIT 1
    `).get(userId) as any

    const focusCategory = categoryStats?.name || 'general'

    const prompt = `
    Provide a daily eco-tip focused on "${focusCategory}" activities.
    Make it:
    - Actionable and specific
    - Under 50 words
    - Motivational and positive
    - Include a specific carbon saving if possible
    
    Format: Just the tip text, no extra formatting.
    `

    const result = await model.generateContent(prompt)
    const tip = result.response.text().trim()

    res.json({ 
      tip,
      category: focusCategory,
      date: new Date().toISOString().split('T')[0]
    })
  } catch (error) {
    console.error('Daily tip error:', error)
    res.status(500).json({ 
      tip: "Every small action counts! Try walking instead of driving for short trips to reduce your carbon footprint.",
      category: "general"
    })
  }
})

// AI-powered goal setting
aiRouter.post('/suggest-goals', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId

    // Get user's carbon footprint data
    const stats = db.prepare(`
      SELECT 
        COUNT(*) as total_activities,
        SUM(carbon_footprint) as total_carbon,
        AVG(carbon_footprint) as avg_carbon
      FROM activities 
      WHERE user_id = ?
    `).get(userId) as any

    const prompt = `
    Based on this user's carbon footprint data, suggest 3 realistic monthly goals:
    
    Total Activities: ${stats?.total_activities || 0}
    Total Carbon: ${stats?.total_carbon?.toFixed(1) || 0} kg CO₂
    Average per Activity: ${stats?.avg_carbon?.toFixed(1) || 0} kg CO₂
    
    Suggest goals as JSON array with:
    - title: Goal title
    - description: What to do
    - target: Specific target (number + unit)
    - timeframe: "weekly" or "monthly"
    - difficulty: "beginner", "intermediate", "advanced"
    - category: relevant category
    
    Make goals specific, measurable, and achievable based on their current patterns.
    `

    const result = await model.generateContent(prompt)
    let goals

    try {
      goals = JSON.parse(result.response.text())
    } catch {
      goals = [
        {
          title: "Reduce Transportation Emissions",
          description: "Walk or bike for short trips instead of driving",
          target: "10 kg CO₂ reduction",
          timeframe: "monthly",
          difficulty: "beginner",
          category: "transportation"
        }
      ]
    }

    res.json({ goals })
  } catch (error) {
    console.error('Goal suggestion error:', error)
    res.status(500).json({ error: 'Failed to suggest goals' })
  }
})
