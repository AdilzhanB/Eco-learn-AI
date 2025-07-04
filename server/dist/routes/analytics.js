"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsRouter = void 0;
const express_1 = require("express");
const init_1 = require("../database/init");
exports.analyticsRouter = (0, express_1.Router)();
// Get dashboard stats
exports.analyticsRouter.get('/dashboard', (req, res) => {
    try {
        // Total carbon footprint
        const totalCarbon = init_1.db.prepare(`
      SELECT COALESCE(SUM(carbon_footprint), 0) as total 
      FROM activities 
      WHERE user_id = 1
    `).get();
        // This week's carbon footprint
        const weekCarbon = init_1.db.prepare(`
      SELECT COALESCE(SUM(carbon_footprint), 0) as total 
      FROM activities 
      WHERE user_id = 1 
      AND date >= date('now', '-7 days')
    `).get();
        // Activities count
        const activitiesCount = init_1.db.prepare(`
      SELECT COUNT(*) as count 
      FROM activities 
      WHERE user_id = 1
    `).get();
        // Carbon by category this month
        const categoryData = init_1.db.prepare(`
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
        const dailyData = init_1.db.prepare(`
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
    }
    catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({ error: 'Failed to fetch analytics data' });
    }
});
// Get carbon footprint trend
exports.analyticsRouter.get('/trend', (req, res) => {
    try {
        const { period = '30' } = req.query;
        const trendData = init_1.db.prepare(`
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
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch trend data' });
    }
});
//# sourceMappingURL=analytics.js.map