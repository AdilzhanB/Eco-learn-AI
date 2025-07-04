import { Router, Request, Response } from 'express';
import { db } from '../database/init';
import { authenticateToken } from './auth';

export const activitiesRouter = Router();

interface AuthRequest extends Request {
  user?: { userId: number; email: string }
}

activitiesRouter.get('/', (req: Request, res: Response) => {
  try {
    const activities = db.prepare(`
      SELECT 
        a.id,
        a.description,
        a.carbon_footprint,
        a.date,
        a.created_at,
        ac.name as category_name,
        ac.icon as category_icon,
        ac.color as category_color
      FROM activities a
      JOIN activity_categories ac ON a.category_id = ac.id
      ORDER BY a.date DESC
    `).all();
    
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// Add new activity
activitiesRouter.post('/', authenticateToken, (req: AuthRequest, res: Response) => {
  try {
    const { category_id, description, carbon_footprint, date } = req.body;
    const userId = req.user?.userId || 1; // fallback to user 1 for now
    
    if (!category_id || !description || carbon_footprint === undefined || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const insert = db.prepare(`
      INSERT INTO activities (user_id, category_id, description, carbon_footprint, date)
      VALUES (?, ?, ?, ?, ?)
    `);
    
    const result = insert.run(userId, category_id, description, carbon_footprint, date);
    
    // Get the created activity with category info
    const activity = db.prepare(`
      SELECT 
        a.id,
        a.description,
        a.carbon_footprint,
        a.date,
        a.created_at,
        ac.name as category_name,
        ac.icon as category_icon,
        ac.color as category_color
      FROM activities a
      JOIN activity_categories ac ON a.category_id = ac.id
      WHERE a.id = ?
    `).get(result.lastInsertRowid);
    
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create activity' });
  }
});

// Get categories
activitiesRouter.get('/categories', (req: Request, res: Response) => {
  try {
    const categories = db.prepare('SELECT * FROM activity_categories').all();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Delete activity
activitiesRouter.delete('/:id', authenticateToken, (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId || 1; // fallback to user 1 for now
    
    const result = db.prepare('DELETE FROM activities WHERE id = ? AND user_id = ?').run(id, userId);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    
    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});
