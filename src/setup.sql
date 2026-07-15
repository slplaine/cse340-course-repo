
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
    date DATE NOT NULL,
    organization_id INTEGER NOT NULL,
    CONSTRAINT fk_org FOREIGN KEY (organization_id) REFERENCES organization(organization_id)
);

-- ============================================
-- Insert sample data: Projects
-- ============================================

INSERT INTO projects (title, description, date, organization_id)
VALUES
('Community Cleanup', 'Neighborhood cleaning initiative', '2026-07-01', 1),
('Food Drive', 'Collecting food for families', '2026-07-05', 1),
('Tree Planting', 'Environmental project', '2026-07-10', 1),
('Recycling Workshop', 'Educational event on recycling', '2026-07-15', 2),
('Urban Garden', 'Creating a community garden', '2026-07-20', 2),
('Charity Run', 'Fundraising marathon', '2026-07-25', 3),
('Book Drive', 'Collecting books for schools', '2026-07-30', 3);
