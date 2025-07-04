"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const init_1 = require("./database/init");
const activities_1 = require("./routes/activities");
const analytics_1 = require("./routes/analytics");
const achievements_1 = require("./routes/achievements");
const auth_1 = require("./routes/auth");
const ai_1 = require("./routes/ai");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Security middleware
app.use((0, helmet_1.default)({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));
// Rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);
// CORS configuration
app.use((0, cors_1.default)({
    origin: process.env.NODE_ENV === 'production'
        ? ['https://your-domain.com']
        : ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
}));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// Initialize database
(0, init_1.initializeDatabase)();
// Routes
app.use('/api/auth', auth_1.authRouter);
app.use('/api/ai', ai_1.aiRouter);
app.use('/api/activities', activities_1.activitiesRouter);
app.use('/api/analytics', analytics_1.analyticsRouter);
app.use('/api/achievements', achievements_1.achievementsRouter);
// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'EcoTracker API is running!',
        timestamp: new Date().toISOString(),
        version: '2.0.0'
    });
});
// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
app.listen(PORT, () => {
    console.log(`🚀 EcoTracker server running on http://localhost:${PORT}`);
    console.log(`🔐 Security features enabled`);
    console.log(`🤖 AI features powered by Gemini 1.5 Flash`);
});
//# sourceMappingURL=index.js.map