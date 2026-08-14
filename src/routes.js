import express from 'express';
import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation,
    showEditOrganizationForm,
    processEditOrganizationForm
} from './controllers/organizations.js';
import { 
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm,
    projectValidation
} from './controllers/projects.js';
import { 
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    categoryValidation
} from './controllers/categories.js';
import { 
    showUserRegistrationForm, 
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    requireLogin,
    showDashboard,
    requireRole
} from './controllers/users.js'; 
import { showHomePage } from './controllers/index.js';
import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);


// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);
// Route for project details page
router.get('/project/:id', showProjectDetailsPage);
// Route for category details page
router.get('/category/:id', showCategoryDetailsPage);
// Route for new organization form
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);
// Route to display the edit organization form
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
// Route for new project page
router.get('/new-project', requireRole('admin'), showNewProjectForm);

// Route to handle new organization form submission
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);
// Route to handle the edit organization form submission
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);
// Route to handle new project form submission
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);
// Route to display the edit project form
router.get('/edit-project/:id', requireRole('admin'),  showEditProjectForm);
// Route to handle the edit project form submission
router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm);
// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);
// Route for new category page
router.get('/new-category', requireRole('admin'), showNewCategoryForm);
// Route to handle new category form submission
router.post('/new-category', requireRole('admin'), categoryValidation,processNewCategoryForm);
// Route to display the edit category form
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);
// Route to handle the edit category form submission
router.post('/edit-category/:id', requireRole('admin'), categoryValidation,processEditCategoryForm);

// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);
// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);
// Protected dashboard route
router.get('/dashboard', requireLogin, showDashboard);


// error-handling routes
router.get('/test-error', testErrorPage);

export default router;