import { Router, Request, Response } from 'express';
import { db } from '../database/init';

export const achievementsRouter = Router();

// Get all achievements with user progress
achievementsRouter.get('/', (req: Request, res: Response) => {
  try {
    const achievements = db.prepare(`
      SELECT 
        a.id,
        a.name,
        a.description,
        a.icon,
        a.requirement_value,
        a.requirement_type,
        CASE WHEN ua.id IS NOT NULL THEN 1 ELSE 0 END as earned,
        ua.earned_at
      FROM achievements a
      LEFT JOIN user_achievements ua ON a.id = ua.achievement_id AND ua.user_id = 1
      ORDER BY earned DESC, a.requirement_value ASC
    `).all();

    res.json(achievements);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch achievements' });
  }
});

// Check and award new achievements
achievementsRouter.post('/check', (req: Request, res: Response) => {
  try {
    const newAchievements: any[] = [];
    
    // Get current user stats
    const stats = getUserStats();
    
    // Check each achievement
    const unearned = db.prepare(`
      SELECT a.*
      FROM achievements a
      LEFT JOIN user_achievements ua ON a.id = ua.achievement_id AND ua.user_id = 1
      WHERE ua.id IS NULL
    `).all();

    unearned.forEach((achievement: any) => {
      let earned = false;
      
      switch (achievement.requirement_type) {
        case 'activities_count':
          earned = stats.totalActivities >= achievement.requirement_value;
          break;
        case 'carbon_saved':
          // Assuming 100kg per month as baseline, calculate savings
          const monthsActive = Math.max(1, stats.daysActive / 30);
          const baseline = monthsActive * 100;
          const saved = Math.max(0, baseline - stats.totalCarbon);
          earned = saved >= achievement.requirement_value;
          break;
        case 'daily_streak':
          earned = stats.currentStreak >= achievement.requirement_value;
          break;
      }
      
      if (earned) {
        // Award achievement
        const insert = db.prepare(`
          INSERT INTO user_achievements (user_id, achievement_id)
          VALUES (1, ?)
        `);
        
        try {
          insert.run(achievement.id);
          newAchievements.push(achievement);
        } catch (error) {
          // Achievement already earned (shouldn't happen due to our query)
        }
      }
    });

    res.json({ 
      newAchievements,
      message: newAchievements.length > 0 
        ? `Congratulations! You earned ${newAchievements.length} new achievement(s)!`
        : 'No new achievements this time. Keep going!'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to check achievements' });
  }
});

function getUserStats() {
  // Total activities
  const totalActivities = db.prepare(`
    SELECT COUNT(*) as count 
    FROM activities 
    WHERE user_id = 1
  `).get() as { count: number };

  // Total carbon footprint
  const totalCarbon = db.prepare(`
    SELECT COALESCE(SUM(carbon_footprint), 0) as total 
    FROM activities 
    WHERE user_id = 1
  `).get() as { total: number };

  // Days active (days with at least one activity)
  const daysActive = db.prepare(`
    SELECT COUNT(DISTINCT date) as days 
    FROM activities 
    WHERE user_id = 1
  `).get() as { days: number };

  // Current streak (consecutive days with activities)
  const recentDates = db.prepare(`
    SELECT DISTINCT date 
    FROM activities 
    WHERE user_id = 1 
    ORDER BY date DESC 
    LIMIT 30
  `).all() as { date: string }[];

  let currentStreak = 0;
  const today = new Date().toISOString().split('T')[0];
  let checkDate = new Date(today);
  
  for (let i = 0; i < recentDates.length; i++) {
    const dateStr = checkDate.toISOString().split('T')[0];
    if (recentDates.some(d => d.date === dateStr)) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return {
    totalActivities: totalActivities.count,
    totalCarbon: totalCarbon.total,
    daysActive: daysActive.days,
    currentStreak
  };
}
