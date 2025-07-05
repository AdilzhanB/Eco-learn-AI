# EcoTracker - Carbon Footprint Tracking Application

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
EcoTracker is a full-stack web application for tracking personal carbon footprint and promoting sustainable living. Users can log daily activities, view analytics, and earn achievements for eco-friendly behavior.

## Tech Stack
- **Frontend**: React + TypeScript + Vite + Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express + TypeScript + better-sqlite3
- **Database**: SQLite
- **UI Libraries**: Lucide React (icons), Recharts (charts)

## Project Structure
```
/
├── src/                    # Frontend React application
├── server/                 # Backend API server
│   ├── src/
│   │   ├── index.ts       # Main server file
│   │   ├── database/      # Database setup and migrations
│   │   └── routes/        # API route handlers
│   └── database.sqlite    # SQLite database file
```

## Key Features
1. **Activity Tracking**: Log carbon footprint activities by category
2. **Analytics Dashboard**: View carbon footprint trends and insights  
3. **Achievements System**: Earn badges for sustainable behavior
4. **Modern UI**: Glassmorphism design with smooth animations

## API Endpoints
- `GET /api/activities` - Get all activities
- `POST /api/activities` - Add new activity
- `GET /api/activities/categories` - Get activity categories
- `GET /api/analytics/dashboard` - Get dashboard statistics
- `GET /api/achievements` - Get achievements with progress

## Database Schema
- **users**: User profiles
- **activity_categories**: Transportation, Energy, Food, Waste, Shopping
- **activities**: User logged activities with carbon footprint data
- **achievements**: Available achievements and requirements
- **user_achievements**: Earned achievements per user

## Development Guidelines
- Use TypeScript for all new code
- Follow modern React patterns (functional components, hooks)
- Use Tailwind CSS for styling with custom design system colors
- Implement proper error handling in API routes
- Use SQLite prepared statements for database queries
- Add proper TypeScript types for all API responses

## Design System
- Primary color: Green (#10B981) for eco-friendly theme
- Modern glassmorphism effects
- Smooth animations with Framer Motion
- Responsive design for mobile and desktop
