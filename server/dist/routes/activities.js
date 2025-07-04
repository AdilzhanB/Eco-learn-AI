"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activitiesRouter = void 0;
const express_1 = require("express");
const init_1 = require("../database/init");
exports.activitiesRouter = (0, express_1.Router)();
exports.activitiesRouter.get('/', (req, res) => {
    try {
        const activities = init_1.db.prepare(`
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
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activities' });
    }
});
// Add new activity
exports.activitiesRouter.post('/', (req, res) => {
    try {
        const { category_id, description, carbon_footprint, date } = req.body;
        if (!category_id || !description || carbon_footprint === undefined || !date) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const insert = init_1.db.prepare(`
      INSERT INTO activities (user_id, category_id, description, carbon_footprint, date)
      VALUES (1, ?, ?, ?, ?)
    `);
        const result = insert.run(category_id, description, carbon_footprint, date);
        // Get the created activity with category info
        const activity = init_1.db.prepare(`
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
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create activity' });
    }
});
// Get categories
exports.activitiesRouter.get('/categories', (req, res) => {
    try {
        const categories = init_1.db.prepare('SELECT * FROM activity_categories').all();
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});
// Delete activity
exports.activitiesRouter.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const result = init_1.db.prepare('DELETE FROM activities WHERE id = ?').run(id);
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json({ message: 'Activity deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete activity' });
    }
});
//# sourceMappingURL=activities.js.map