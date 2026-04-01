-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nickname TEXT NOT NULL,
  goal TEXT,
  level INTEGER DEFAULT 1,
  xp INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  difficulty INTEGER,
  language TEXT,
  icon TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Missions table
CREATE TABLE missions (
  id TEXT PRIMARY KEY,
  project_id TEXT REFERENCES projects(id),
  step INTEGER,
  title TEXT NOT NULL,
  description TEXT,
  hint TEXT,
  template TEXT,
  expected_output TEXT,
  solution TEXT,
  concepts TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- User project progress
CREATE TABLE user_project_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  project_id TEXT REFERENCES projects(id),
  status TEXT DEFAULT 'in_progress',
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User mission progress
CREATE TABLE user_mission_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  mission_id TEXT REFERENCES missions(id),
  status TEXT DEFAULT 'in_progress',
  code TEXT,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Badges table
CREATE TABLE badges (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User badges
CREATE TABLE user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  badge_id TEXT REFERENCES badges(id),
  earned_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_users_nickname ON users(nickname);
CREATE INDEX idx_user_project_progress_user ON user_project_progress(user_id);
CREATE INDEX idx_user_mission_progress_user ON user_mission_progress(user_id);
CREATE INDEX idx_user_badges_user ON user_badges(user_id);

-- Enable RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_project_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_mission_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view their own progress" ON user_project_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own mission progress" ON user_mission_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own badges" ON user_badges
  FOR SELECT USING (auth.uid() = user_id);
