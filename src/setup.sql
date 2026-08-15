
-- ========================================
-- Organization Table
-- ========================================

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);


-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

-- ============================================
-- Projects Table
-- ============================================

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    location VARCHAR(150) NOT NULL,
    date DATE NOT NULL,
    organization_id INTEGER NOT NULL,
    CONSTRAINT fk_org FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
);

-- ============================================
-- Insert sample data: Projects
-- ============================================

INSERT INTO projects (title, description, location, date, organization_id)
VALUES
('Community Cleanup', 'Neighborhood cleaning initiative', 'Downtown Park', '2026-07-01', 1),
('Food Drive', 'Collecting food for families', 'Community Center', '2026-07-05', 1),
('Tree Planting', 'Environmental project', 'Riverside Area', '2026-07-10', 1),
('Recycling Workshop', 'Educational event on recycling', 'City Library', '2026-07-15', 2),
('Urban Garden', 'Creating a community garden', 'Westside Neighborhood', '2026-07-20', 2),
('Charity Run', 'Fundraising marathon', 'Main Avenue', '2026-07-25', 3),
('Book Drive', 'Collecting books for schools', 'Public School District', '2026-07-30', 3);

-- ============================================
-- Create table: Categories
-- ============================================

CREATE TABLE categories (
  category_id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);

-- ============================================
-- Create table: Project-Categories relationships
-- ============================================

CREATE TABLE project_categories (
  project_id INT REFERENCES projects(project_id) ON DELETE CASCADE,
  category_id INT REFERENCES categories(category_id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, category_id)
);

-- ============================================
-- Insert sample data: Categories
-- ============================================

INSERT INTO categories (name)
VALUES
('Environmental'),
('Educational'),
('Community Service'),
('Health and Wellness');

-- ============================================
-- Insert sample data: Project-Categories relationships
-- ============================================

INSERT INTO project_categories (project_id, category_id)
VALUES
(1, 1), -- Projeto 1 -> Environmental
(2, 2), -- Projeto 2 -> Educational
(3, 1), -- Projeto 3 -> Environmental
(4, 2), -- Projeto 4 -> Educational
(5, 3), -- Projeto 5 -> Community Service
(6, 4), -- Projeto 6 -> Health and Wellness
(7, 2); -- Projeto 7 -> Educational

CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    role_description TEXT
);

INSERT INTO roles (role_name, role_description) VALUES 
    ('user', 'Standard user with basic access'),
    ('admin', 'Administrator with full system access');

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INTEGER REFERENCES roles(role_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

UPDATE users SET role_id = (SELECT role_id FROM roles WHERE role_name = 'admin') WHERE email = 'admin@example.com';

CREATE TABLE project_volunteers (
    volunteer_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    project_id INTEGER NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    UNIQUE(user_id, project_id)
);