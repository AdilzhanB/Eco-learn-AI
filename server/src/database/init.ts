import type { Database as BetterSqliteDatabase } from 'better-sqlite3';
import Database from 'better-sqlite3';

export const db: BetterSqliteDatabase = new Database('mydb.db');
export type DBType = BetterSqliteDatabase;

export const initializeDatabase = () => {
  // Enable foreign keys
  db.pragma('foreign_keys = ON');

  // Create users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      avatar_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create activity categories table
  db.exec(`
    CREATE TABLE IF NOT EXISTS activity_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      icon TEXT NOT NULL,
      color TEXT NOT NULL
    )
  `);

  // Create activities table
  db.exec(`
    CREATE TABLE IF NOT EXISTS activities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER DEFAULT 1,
      category_id INTEGER NOT NULL,
      description TEXT NOT NULL,
      carbon_footprint REAL NOT NULL,
      date DATE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (category_id) REFERENCES activity_categories(id)
    )
  `);

  // Create achievements table
  db.exec(`
    CREATE TABLE IF NOT EXISTS achievements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      icon TEXT NOT NULL,
      requirement_value REAL NOT NULL,
      requirement_type TEXT NOT NULL
    )
  `);

  // Create user_achievements table
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_achievements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      achievement_id INTEGER NOT NULL,
      earned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (achievement_id) REFERENCES achievements(id),
      UNIQUE(user_id, achievement_id)
    )
  `);

  // Insert default data
  insertDefaultData();
  
  console.log('✅ Database initialized successfully');
};

const insertDefaultData = () => {
  // Insert default user
  const insertUser = db.prepare(`
    INSERT OR IGNORE INTO users (id, email, name) 
    VALUES (1, 'demo@ecotracker.com', 'Demo User')
  `);
  insertUser.run();

  // Insert activity categories
  const insertCategory = db.prepare(`
    INSERT OR IGNORE INTO activity_categories (name, icon, color) 
    VALUES (?, ?, ?)
  `);
  
  const categories = [
    ['Transportation', '🚗', '#3B82F6'],
    ['Energy', '⚡', '#F59E0B'],
    ['Food', '🍎', '#10B981'],
    ['Waste', '♻️', '#8B5CF6'],
    ['Shopping', '🛍️', '#EF4444']
  ];
  
  categories.forEach(([name, icon, color]) => {
    insertCategory.run(name, icon, color);
  });

  // Insert achievements
  const insertAchievement = db.prepare(`
    INSERT OR IGNORE INTO achievements (name, description, icon, requirement_value, requirement_type) 
    VALUES (?, ?, ?, ?, ?)
  `);
  
  const achievements = [
    ['First Steps', 'Log your first activity', '🌱', 1, 'activities_count'],
    ['Week Warrior', 'Log activities for 7 days', '📅', 7, 'daily_streak'],
    ['Carbon Saver', 'Save 50kg of CO2', '💚', 50, 'carbon_saved'],
    ['Eco Champion', 'Save 100kg of CO2', '🏆', 100, 'carbon_saved'],
    ['Green Month', 'Log activities for 30 days', '🌿', 30, 'daily_streak']
  ];
  
  achievements.forEach(([name, description, icon, value, type]) => {
    insertAchievement.run(name, description, icon, value, type);
  });
};

