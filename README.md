# 🌱 EcoTracker - Carbon Footprint Tracking Application

A modern, full-stack web application for tracking personal carbon footprint and promoting sustainable living. Users can log daily activities, view beautiful analytics, and earn achievements for eco-friendly behavior.

![EcoTracker Dashboard](https://via.placeholder.com/800x400/10B981/FFFFFF?text=EcoTracker+Dashboard)

## ✨ Features

### 🎯 Core Functionality
- **Activity Tracking**: Log carbon footprint activities by category (Transportation, Energy, Food, Waste, Shopping)
- **Real-time Analytics**: Beautiful dashboard with charts and insights
- **Achievements System**: Earn badges for sustainable behavior and milestones
- **Environmental Impact**: See your footprint in real-world terms (trees needed, car miles equivalent)

### 🎨 Amazing Design
- **Modern Glassmorphism UI**: Beautiful gradient backgrounds with frosted glass effects
- **Smooth Animations**: Powered by Framer Motion for delightful interactions
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **Interactive Charts**: Powered by Recharts with custom styling

### 📊 Analytics & Insights
- Daily carbon footprint trends
- Category-wise breakdown
- Weekly and monthly comparisons
- Environmental impact calculations
- Progress tracking and goal setting

## 🚀 Tech Stack

### Frontend
- **React 18** + **TypeScript** - Modern UI framework
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Recharts** - Beautiful data visualization
- **Lucide React** - Modern icon library
- **Date-fns** - Date manipulation

### Backend
- **Node.js** + **Express** - RESTful API server
- **TypeScript** - Type-safe backend development
- **Better-SQLite3** - Fast, reliable database
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment configuration

### Database
- **SQLite** - Lightweight, file-based database
- Optimized schema for carbon tracking
- Prepared statements for security

## 🏗️ Project Structure

```
ecotracker/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Dashboard.tsx     # Main dashboard with charts
│   │   │   ├── ActivityForm.tsx  # Add new activities
│   │   │   ├── ActivityList.tsx  # Activity history
│   │   │   └── Achievements.tsx  # Achievements page
│   │   ├── App.tsx          # Main app component
│   │   └── main.tsx         # App entry point
│   ├── tailwind.config.js   # Tailwind configuration
│   └── package.json
├── server/                  # Express backend API
│   ├── src/
│   │   ├── database/        # Database setup and migrations
│   │   │   └── init.ts      # Database initialization
│   │   ├── routes/          # API route handlers
│   │   │   ├── activities.ts    # Activities CRUD operations
│   │   │   ├── analytics.ts     # Dashboard analytics
│   │   │   └── achievements.ts  # Achievements system
│   │   └── index.ts         # Main server file
│   ├── database.sqlite      # SQLite database file
│   └── package.json
└── .github/
    └── copilot-instructions.md # AI coding guidelines
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecotracker
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the backend server** (in `server/` directory)
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:3001`

2. **Start the frontend development server** (in `frontend/` directory)
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

3. **Open your browser** and navigate to `http://localhost:5173`

## 📡 API Endpoints

### Activities
- `GET /api/activities` - Get all activities
- `POST /api/activities` - Add new activity
- `DELETE /api/activities/:id` - Delete activity
- `GET /api/activities/categories` - Get activity categories

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard statistics
- `GET /api/analytics/trend` - Get carbon footprint trend data

### Achievements
- `GET /api/achievements` - Get achievements with progress
- `POST /api/achievements/check` - Check and award new achievements

## 🗄️ Database Schema

### Tables
- **users** - User profiles and settings
- **activity_categories** - Predefined categories (Transportation, Energy, etc.)
- **activities** - User-logged activities with carbon footprint data
- **achievements** - Available achievements and requirements
- **user_achievements** - Earned achievements per user

### Sample Data
The application comes with pre-populated categories and achievements:

**Categories:**
- 🚗 Transportation (Blue)
- ⚡ Energy (Orange)
- 🍎 Food (Green)
- ♻️ Waste (Purple)
- 🛍️ Shopping (Red)

**Achievements:**
- 🌱 First Steps - Log your first activity
- 📅 Week Warrior - Log activities for 7 days
- 💚 Carbon Saver - Save 50kg of CO₂
- 🏆 Eco Champion - Save 100kg of CO₂
- 🌿 Green Month - Log activities for 30 days

## 🎨 Design System

### Colors
- **Primary Green**: `#10B981` (Eco-friendly theme)
- **Gradient Backgrounds**: Green to emerald, blue to cyan, purple to pink
- **Text Colors**: Gray scale for readability

### Components
- **Glassmorphism Cards**: Semi-transparent backgrounds with backdrop blur
- **Rounded Corners**: 12px-24px border radius for modern look
- **Hover Effects**: Scale and shadow transitions
- **Loading States**: Spinning indicators with brand colors

## 🔧 Development

### Adding New Features
1. **Backend**: Add routes in `server/src/routes/`
2. **Frontend**: Create components in `frontend/src/components/`
3. **Database**: Update schema in `server/src/database/init.ts`

### Environment Variables
Create `.env` files in both `frontend/` and `server/` directories:

**Server** (`.env`):
```env
PORT=3001
NODE_ENV=development
DATABASE_PATH=./database.sqlite
```

### Building for Production

**Backend:**
```bash
cd server
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
```

## 🌟 Key Features Showcase

### 📊 Beautiful Dashboard
- Real-time carbon footprint tracking
- Interactive charts and visualizations
- Environmental impact calculations
- Trend analysis and insights

### 🏆 Achievement System
- Gamified sustainability tracking
- Progress indicators and milestones
- Motivational badges and rewards
- Social features for competition

### 📱 Modern UI/UX
- Responsive design for all devices
- Smooth animations and transitions
- Intuitive navigation and flow
- Accessibility-first design

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Charts by [Recharts](https://recharts.org/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- Styling by [Tailwind CSS](https://tailwindcss.com/)

---

**Made with 💚 for a sustainable future**

*Start tracking your carbon footprint today and make a positive impact on our planet!*
