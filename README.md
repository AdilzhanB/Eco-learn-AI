# 🌱 EcoTracker - Carbon Footprint Tracking Application

A modern, full-stack web application for tracking personal carbon footprint and promoting sustainable living. Users can log daily activities, view beautiful analytics, and earn achievements for eco-friendly behavior.

![EcoTracker Dashboard](https://github.com/AdilzhanB/Eco-learn-AI/blob/main/Screenshot%202025-07-04%20160511.png)

## ✨ Features

### 🎯 Core Functionality
- **Activity Tracking**: Log carbon footprint activities by category (Transportation, Energy, Food, Waste, Shopping)
- **Real-time Analytics**: Beautiful dashboard with charts and insights
- **Achievements System**: Earn badges for sustainable behavior and milestones
- **Environmental Impact**: See your footprint in real-world terms (trees needed, car miles equivalent)
- **AI-Powered Insights**: Get personalized recommendations and environmental impact analysis
- **User Authentication**: Secure login/registration with JWT tokens
- **Profile Management**: Customizable user profiles with sustainability goals

### 🎨 Amazing Design
- **Modern Glassmorphism UI**: Beautiful gradient backgrounds with frosted glass effects
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Smooth Animations**: Powered by Framer Motion for delightful interactions
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **Interactive Charts**: Powered by Recharts with custom styling
- **Quick Actions**: Convenient shortcuts for common activities

### 📊 Analytics & Insights
- Daily carbon footprint trends
- Category-wise breakdown
- Weekly and monthly comparisons
- Environmental impact calculations
- Progress tracking and goal setting
- AI-generated sustainability tips
- Personal carbon footprint goals

### 🔧 DevOps & Infrastructure
- **Docker Support**: Multi-stage builds for optimal production deployment
- **Kubernetes Ready**: Complete K8s manifests for scalable deployment
- **Monitoring**: Prometheus metrics and Grafana dashboards
- **CI/CD Pipeline**: GitHub Actions for automated testing and deployment
- **Security**: Automated security scanning and vulnerability checks
- **Load Balancing**: Nginx reverse proxy configuration

## 🚀 Tech Stack

### Frontend
- **React 18** + **TypeScript** - Modern UI framework
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Recharts** - Beautiful data visualization
- **Lucide React** - Modern icon library
- **Date-fns** - Date manipulation
- **Zustand** - Lightweight state management
- **React Router** - Client-side routing

### Backend
- **Node.js** + **Express** - RESTful API server
- **TypeScript** - Type-safe backend development
- **Better-SQLite3** - Fast, reliable database
- **JWT** - JSON Web Token authentication
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment configuration

### Database
- **SQLite** - Lightweight, file-based database
- Optimized schema for carbon tracking
- Prepared statements for security
- User authentication and sessions

### DevOps & Infrastructure
- **Docker** - Containerization with multi-stage builds
- **Docker Compose** - Development and production environments
- **Kubernetes** - Container orchestration
- **Nginx** - Reverse proxy and load balancing
- **Prometheus** - Metrics collection and monitoring
- **Grafana** - Data visualization and dashboards
- **GitHub Actions** - CI/CD pipeline automation

## 🏗️ Project Structure

```
ecotracker/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Dashboard.tsx        # Main dashboard with charts
│   │   │   ├── ActivityForm.tsx     # Add new activities
│   │   │   ├── ActivityList.tsx     # Activity history
│   │   │   ├── Achievements.tsx     # Achievements page
│   │   │   ├── DashboardLayout.tsx  # Main layout wrapper
│   │   │   ├── Loading.tsx          # Loading component
│   │   │   ├── Notifications.tsx    # Toast notifications
│   │   │   └── ThemeToggle.tsx      # Dark/light mode toggle
│   │   ├── pages/           # Page components
│   │   │   ├── AIInsightsPage.tsx   # AI recommendations
│   │   │   ├── AuthPage.tsx         # Login/register
│   │   │   ├── ProfilePage.tsx      # User profile
│   │   │   └── SettingsPage.tsx     # App settings
│   │   ├── stores/          # Zustand state management
│   │   │   ├── activityStore.ts     # Activity state
│   │   │   ├── aiStore.ts           # AI insights state
│   │   │   ├── authStore.ts         # Authentication state
│   │   │   └── themeStore.ts        # Theme state
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
│   │   │   ├── achievements.ts  # Achievements system
│   │   │   ├── auth.ts          # Authentication routes
│   │   │   └── ai.ts            # AI insights endpoints
│   │   └── index.ts         # Main server file
│   ├── mydb.db             # SQLite database file
│   └── package.json
├── nginx/                   # Nginx configuration
│   ├── nginx.conf          # Main nginx config
│   ├── dev.conf            # Development config
│   └── conf.d/
│       └── default.conf    # Default server block
├── k8s/                     # Kubernetes manifests
│   ├── deployment.yaml     # App deployment
│   └── nginx.yaml          # Nginx deployment
├── monitoring/              # Monitoring configuration
│   ├── prometheus.yml      # Prometheus config
│   ├── alert_rules.yml     # Alert rules
│   └── grafana/
│       └── provisioning/   # Grafana provisioning
├── .github/
│   └── workflows/          # GitHub Actions
│       ├── ci-cd.yml       # CI/CD pipeline
│       └── security.yml    # Security scanning
├── Dockerfile              # Multi-stage Docker build
├── docker-compose.yml      # Production compose
├── docker-compose.dev.yml  # Development compose
├── docker-entrypoint.sh    # Container entry point
├── Makefile               # Build automation
├── build.sh               # Build script
├── deploy.sh              # Deployment script
└── .github/
    └── copilot-instructions.md # AI coding guidelines
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Docker** (optional, for containerized deployment)

### Quick Start

#### Option 1: Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecotracker
   ```

2. **Install dependencies and start services**
   ```bash
   # Install backend dependencies
   cd server
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Run the application**
   ```bash
   # Start backend (from server directory)
   npm run dev
   
   # Start frontend (from frontend directory)
   npm run dev
   ```

#### Option 2: Docker Development

1. **Clone and start with Docker Compose**
   ```bash
   git clone <repository-url>
   cd ecotracker
   docker-compose -f docker-compose.dev.yml up
   ```

2. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3001`

#### Option 3: Production Deployment

1. **Build and deploy with Docker**
   ```bash
   # Build production images
   ./build.sh
   
   # Deploy to production
   ./deploy.sh
   ```

2. **Or use Kubernetes**
   ```bash
   # Apply Kubernetes manifests
   kubectl apply -f k8s/
   ```

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

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### Activities
- `GET /api/activities` - Get user activities (authenticated)
- `POST /api/activities` - Add new activity (authenticated)
- `DELETE /api/activities/:id` - Delete activity (authenticated)
- `GET /api/activities/categories` - Get activity categories

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard statistics
- `GET /api/analytics/trend` - Get carbon footprint trend data

### Achievements
- `GET /api/achievements` - Get achievements with progress
- `POST /api/achievements/check` - Check and award new achievements

### AI Insights
- `GET /api/ai/insights` - Get AI-generated insights
- `POST /api/ai/recommendations` - Get personalized recommendations

## 🗄️ Database Schema

### Tables
- **users** - User profiles, authentication, and settings
- **activity_categories** - Predefined categories (Transportation, Energy, etc.)
- **activities** - User-logged activities with carbon footprint data
- **achievements** - Available achievements and requirements
- **user_achievements** - Earned achievements per user

### Sample Data
The application comes with pre-populated categories and achievements:

**Categories:**
- 🚗 Transportation (Blue) - Driving, flying, public transport
- ⚡ Energy (Orange) - Electricity, heating, cooling
- 🍎 Food (Green) - Meals, groceries, dining
- ♻️ Waste (Purple) - Recycling, composting, disposal
- 🛍️ Shopping (Red) - Purchases, online shopping

**Achievements:**
- 🌱 First Steps - Log your first activity
- 📅 Week Warrior - Log activities for 7 days
- 💚 Carbon Saver - Save 50kg of CO₂
- 🏆 Eco Champion - Save 100kg of CO₂
- 🌿 Green Month - Log activities for 30 days
- 🔥 Streak Master - 15-day activity streak
- 📊 Data Driven - View analytics 10 times

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

### Local Development Setup

1. **Environment Variables**
   
   Create `.env` files in both directories:
   
   **Server** (`server/.env`):
   ```env
   PORT=3001
   NODE_ENV=development
   DATABASE_PATH=./mydb.db
   JWT_SECRET=your-secret-key
   ```
   
   **Frontend** (`frontend/.env`):
   ```env
   VITE_API_URL=http://localhost:3001
   ```

2. **Database Setup**
   ```bash
   # Database is automatically initialized on first run
   cd server
   npm run dev
   ```

3. **Development Commands**
   ```bash
   # Backend development
   cd server
   npm run dev          # Start with hot reload
   npm run build        # Build for production
   npm start           # Start production server
   
   # Frontend development
   cd frontend
   npm run dev          # Start development server
   npm run build        # Build for production
   npm run preview      # Preview production build
   ```

### Docker Development

1. **Development Environment**
   ```bash
   # Start development environment
   docker-compose -f docker-compose.dev.yml up
   
   # Build and restart
   docker-compose -f docker-compose.dev.yml up --build
   ```

2. **Production Environment**
   ```bash
   # Build production images
   docker-compose build
   
   # Start production environment
   docker-compose up -d
   ```

### Kubernetes Deployment

1. **Apply Manifests**
   ```bash
   # Deploy to Kubernetes
   kubectl apply -f k8s/
   
   # Check deployment status
   kubectl get pods
   kubectl get services
   ```

2. **Scale Application**
   ```bash
   # Scale frontend replicas
   kubectl scale deployment ecotracker-frontend --replicas=3
   
   # Scale backend replicas
   kubectl scale deployment ecotracker-backend --replicas=2
   ```

### Monitoring Setup

1. **Prometheus & Grafana**
   ```bash
   # Start monitoring stack
   docker-compose -f monitoring/docker-compose.yml up -d
   
   # Access Grafana
   # URL: http://localhost:3000
   # Username: admin
   # Password: admin
   ```

2. **View Metrics**
   - Application metrics: `http://localhost:3001/metrics`
   - Prometheus: `http://localhost:9090`
   - Grafana: `http://localhost:3000`

### Build & Deployment Scripts

1. **Build Script** (`build.sh`):
   ```bash
   ./build.sh          # Build Docker images
   ./build.sh --push   # Build and push to registry
   ```

2. **Deployment Script** (`deploy.sh`):
   ```bash
   ./deploy.sh dev     # Deploy to development
   ./deploy.sh prod    # Deploy to production
   ```

3. **Makefile Commands**:
   ```bash
   make build          # Build application
   make dev            # Start development environment
   make prod           # Start production environment
   make clean          # Clean up containers and images
   ```

### Adding New Features

1. **Backend**: Add routes in `server/src/routes/`
2. **Frontend**: Create components in `frontend/src/components/`
3. **Database**: Update schema in `server/src/database/init.ts`
4. **API**: Update API documentation in this README

## 🌟 Key Features Showcase

### 📊 Beautiful Dashboard
- Real-time carbon footprint tracking with interactive charts
- Environmental impact calculations and visualizations
- Weekly, monthly, and yearly trend analysis
- Quick action buttons for common activities
- Personalized sustainability goals and progress tracking

### 🤖 AI-Powered Insights
- Intelligent recommendations based on your activity patterns
- Environmental impact analysis and suggestions
- Personalized tips for reducing carbon footprint
- Trend analysis and predictive insights

### 🏆 Gamified Achievement System
- Comprehensive achievement tracking and rewards
- Progress indicators and milestone celebrations
- Motivational badges for sustainable behaviors
- Social features for friendly competition

### 🔐 Secure Authentication
- JWT-based authentication system
- Secure user registration and login
- Protected routes and API endpoints
- User profile management

### 📱 Modern UI/UX
- Responsive design optimized for all devices
- Dark and light mode support with smooth transitions
- Smooth animations and micro-interactions
- Intuitive navigation and user flow
- Accessibility-first design principles

### 🎨 Advanced Design System
- Glassmorphism effects with backdrop blur
- Custom gradient backgrounds and themes
- Consistent color palette and typography
- Loading states and error handling
- Toast notifications and feedback systems

### 🏗️ Production-Ready Infrastructure
- Multi-stage Docker builds for optimized deployments
- Kubernetes manifests for scalable cloud deployment
- Comprehensive monitoring with Prometheus and Grafana
- CI/CD pipeline with automated testing and deployment
- Security scanning and vulnerability assessments
- Load balancing and reverse proxy configuration

## 🚀 Deployment Options

### Option 1: Docker Compose (Recommended)
```bash
# Clone the repository
git clone <repository-url>
cd ecotracker

# Start production environment
docker-compose up -d

# Or start development environment
docker-compose -f docker-compose.dev.yml up
```

### Option 2: Kubernetes
```bash
# Apply all manifests
kubectl apply -f k8s/

# Check deployment status
kubectl get pods -l app=ecotracker
```

### Option 3: Cloud Deployment
The application is ready for deployment on major cloud platforms:

- **AWS**: ECS, EKS, or EC2
- **Azure**: Container Instances, AKS, or App Service
- **Google Cloud**: Cloud Run, GKE, or Compute Engine
- **DigitalOcean**: App Platform or Kubernetes

### Option 4: Manual Deployment
```bash
# Build and deploy manually
./build.sh
./deploy.sh prod
```

## 🔍 Monitoring & Observability

### Metrics & Monitoring
- **Prometheus**: Metrics collection and storage
- **Grafana**: Beautiful dashboards and visualizations
- **Custom Metrics**: Application-specific monitoring
- **Alerting**: Automated alerts for issues

### Logging
- **Structured Logging**: JSON-formatted logs
- **Log Levels**: Debug, Info, Warning, Error
- **Request Logging**: HTTP request/response tracking
- **Error Tracking**: Comprehensive error reporting

### Health Checks
- **Liveness Probes**: Container health monitoring
- **Readiness Probes**: Application readiness checks
- **Database Health**: Connection and query monitoring
- **API Health**: Endpoint availability tracking

## 🛠️ Build & Automation

### Available Scripts
```bash
# Build scripts
./build.sh              # Build Docker images
./build.sh --push       # Build and push to registry

# Deployment scripts
./deploy.sh dev         # Deploy to development
./deploy.sh prod        # Deploy to production

# Makefile commands
make build              # Build application
make dev                # Start development environment
make prod               # Start production environment
make test               # Run tests
make clean              # Clean up containers
```

### CI/CD Pipeline
The application includes a comprehensive GitHub Actions workflow:

- **Automated Testing**: Unit tests, integration tests
- **Code Quality**: ESLint, TypeScript checking
- **Security Scanning**: Vulnerability assessments
- **Build Automation**: Docker image building
- **Deployment**: Automated deployment to staging/production
- **Monitoring**: Health checks and rollback capabilities

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Commit changes (`git commit -m 'Add amazing feature'`)
6. Push to branch (`git push origin feature/amazing-feature`)
7. Create a Pull Request

### Code Style
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting and formatting
- **Prettier**: Consistent code formatting
- **Commit Messages**: Conventional commit format

### Testing
- **Unit Tests**: Component and function testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Full application workflow testing
- **Performance Tests**: Load and stress testing

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **UI/UX**: Icons by [Lucide](https://lucide.dev/)
- **Charts**: Data visualization by [Recharts](https://recharts.org/)
- **Animations**: Smooth transitions by [Framer Motion](https://www.framer.com/motion/)
- **Styling**: Modern CSS by [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: Lightweight stores by [Zustand](https://github.com/pmndrs/zustand)
- **DevOps**: Container orchestration by [Docker](https://www.docker.com/) and [Kubernetes](https://kubernetes.io/)

---

## 🆘 Support & Help

### Documentation
- **API Documentation**: Available at `/api/docs` when running locally
- **Component Documentation**: Storybook documentation (coming soon)
- **Deployment Guide**: Comprehensive deployment instructions above

### Getting Help
- **Issues**: Create an issue on GitHub for bugs or feature requests
- **Discussions**: Join GitHub Discussions for questions and community support
- **Wiki**: Check the project wiki for additional documentation

### Quick Links
- **Live Demo**: [Coming Soon]
- **API Docs**: `http://localhost:3001/api/docs`
- **Monitoring**: `http://localhost:3000` (Grafana)
- **Metrics**: `http://localhost:9090` (Prometheus)

---

**Made with 💚 for a sustainable future**

*Start tracking your carbon footprint today and make a positive impact on our planet!*

🌱 **Ready to go green?** Clone the repository and start your sustainability journey!
