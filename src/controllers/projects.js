import { body, validationResult } from 'express-validator';
import { 
  getAllProjects,
  createProject,
  getUpcomingProjects,
  getProjectDetails,
  updateProject,
  addVolunteer,
  removeVolunteer,
  isVolunteer,
  getVolunteerProjects
} from '../models/projects.js';
import { 
    getAllCategories, 
    getCategoriesByProjectId 
} from '../models/categories.js';
import { getAllOrganizations } from '../models/organizations.js';

const projectValidation = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
    body('description')
        .trim()
        .notEmpty().withMessage('Description is required')
        .isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),
    body('location')
        .trim()
        .notEmpty().withMessage('Location is required')
        .isLength({ max: 200 }).withMessage('Location must be less than 200 characters'),
    body('date')
        .notEmpty().withMessage('Date is required')
        .isISO8601().withMessage('Date must be a valid date format'),
    body('organizationId')
        .notEmpty().withMessage('Organization is required')
        .isInt().withMessage('Organization must be a valid integer')
];
const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Define any controller functions
const showProjectsPage = async (req, res) => {
    const projects = await getAllProjects();
    const title = ' Service Projects';

    res.render('projects', {title, projects });
};

const showProjectDetailsPage = async (req, res) => {
    const id = req.params.id;

    const project = await getProjectDetails(id);
    const categories = await getCategoriesByProjectId(id);

    let volunteer = false;

    if (req.session.user) {
        volunteer = await isVolunteer(
            req.session.user.user_id,
            id
        );
    }

    res.render('project', {
        title: project.title,
        project,
        categories,
        volunteer
    });
};
const showNewProjectForm = async (req, res) => {
    const organizations = await getAllOrganizations();
    const categories = await getAllCategories();
    const title = 'Add New Service Project';

    res.render('new-project', { title, organizations, categories });
}

const processNewProjectForm = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Loop through validation errors and flash them
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new project form
        return res.redirect('/new-project');
    }
    // Extract form data from req.body
    const { title, description, location, date, organizationId } = req.body;

    try {
        // Create the new project in the database
        const newProjectId = await createProject(title, description, location, date, organizationId);

        req.flash('success', 'New service project created successfully!');
        res.redirect(`/project/${newProjectId}`);
    } catch (error) {
        console.error('Error creating new project:', error);
        req.flash('error', 'There was an error creating the service project.');
        res.redirect('/new-project');
    }
}
const showEditProjectForm = async (req, res) => {
    const projectId = req.params.id;

    const project = await getProjectDetails(projectId);
    const organizations = await getAllOrganizations();

    const title = 'Edit Project';

    res.render('edit-project', {
        title,
        project,
        organizations
    });
};
const processEditProjectForm = async (req, res) => {
    const projectId = req.params.id;

    const {
        title,
        description,
        location,
        date,
        organizationId
    } = req.body;

    await updateProject(
        projectId,
        title,
        description,
        location,
        date,
        organizationId
    );

    req.flash('success', 'Project updated successfully!');

    res.redirect(`/project/${projectId}`);
};
const volunteerForProject = async (req, res) => {
    const userId = req.session.user.user_id;
    const projectId = req.params.id;

    try {
        await addVolunteer(userId, projectId);

        req.flash(
            'success',
            'You have successfully volunteered for this project.'
        );

        res.redirect(`/project/${projectId}`);
    } catch (error) {
        console.error(error);

        req.flash(
            'error',
            'Unable to volunteer for this project.'
        );

        res.redirect(`/project/${projectId}`);
    }
};

const removeVolunteerFromProject = async (req, res) => {
    const userId = req.session.user.user_id;
    const projectId = req.params.id;

    try {
        await removeVolunteer(userId, projectId);

        req.flash(
            'success',
            'You have been removed as a volunteer.'
        );

        res.redirect(`/project/${projectId}`);
    } catch (error) {
        console.error(error);

        req.flash(
            'error',
            'Unable to remove volunteer status.'
        );

        res.redirect(`/project/${projectId}`);
    }
};

// Export any controller functions
export {
  showProjectsPage,
  showProjectDetailsPage,
  showNewProjectForm,
  processNewProjectForm,
  showEditProjectForm,
  processEditProjectForm,
  volunteerForProject,
  removeVolunteerFromProject,
  projectValidation
};