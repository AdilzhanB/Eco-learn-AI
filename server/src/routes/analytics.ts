import { Router, Request, Response } from 'express';
import { db } from '../database/init';

export const analyticsRouter = Router();

// Get dashboard stats
analyticsRouter.get('/dashboard', (req: Request, res: Response) => {
  try {
    // Total carbon footprint
    const totalCarbon = db.prepare(`
      SELECT COALESCE(SUM(carbon_footprint), 0) as total 
      FROM activities 
      WHERE user_id = 1
    `).get() as { total: number };

    // This week's carbon footprint
    const weekCarbon = db.prepare(`
      SELECT COALESCE(SUM(carbon_footprint), 0) as total 
      FROM activities 
      WHERE user_id = 1 
      AND date >= date('now', '-7 days')
    `).get() as { total: number };

    // Activities count
    const activitiesCount = db.prepare(`
      SELECT COUNT(*) as count 
      FROM activities 
      WHERE user_id = 1
    `).get() as { count: number };

    // Carbon by category this month
    const categoryData = db.prepare(`
      SELECT 
        ac.name,
        ac.color,
        COALESCE(SUM(a.carbon_footprint), 0) as total
      FROM activity_categories ac
      LEFT JOIN activities a ON ac.id = a.category_id 
        AND a.user_id = 1 
        AND a.date >= date('now', 'start of month')
      GROUP BY ac.id, ac.name, ac.color
      ORDER BY total DESC
    `).all();

    // Daily carbon footprint for the last 30 days
    const dailyData = db.prepare(`
      SELECT 
        date,
        SUM(carbon_footprint) as total
      FROM activities 
      WHERE user_id = 1 
      AND date >= date('now', '-30 days')
      GROUP BY date
      ORDER BY date
    `).all();

    res.json({
      totalCarbon: totalCarbon.total,
      weekCarbon: weekCarbon.total,
      activitiesCount: activitiesCount.count,
      categoryData,
      dailyData
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics data' });
  }
});

// Get carbon footprint trend
analyticsRouter.get('/trend', (req: Request, res: Response) => {
  try {
    const { period = '30' } = req.query;
    
    const trendData = db.prepare(`
      SELECT 
        date,
        SUM(carbon_footprint) as daily_total,
        COUNT(*) as activity_count
      FROM activities 
      WHERE user_id = 1 
      AND date >= date('now', '-${period} days')
      GROUP BY date
      ORDER BY date
    `).all();

    res.json(trendData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trend data' });
  }
});
