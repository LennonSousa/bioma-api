import express from 'express';

import { UploadsConfig } from '../config/uploads';

import BanksController from '../controllers/BanksController';

import CustomerAttachmentsController from '../controllers/CustomerAttachmentsController';
import CustomerDocsController from '../controllers/CustomerDocsController';
import CustomersController from '../controllers/CustomersController';
import CustomerPropertiesController from '../controllers/CustomerPropertiesController';

import DocsCustomerController from '../controllers/DocsCustomerController';
import DocsPropertyController from '../controllers/DocsPropertyController';

import EventsLicensingController from '../controllers/EventsLicensingController';
import EventsProjectController from '../controllers/EventsProjectController';

import InstitutionsController from '../controllers/InstitutionsController';

import LicensingAgenciesController from '../controllers/LicensingAgenciesController';
import LicensingAttachmentsController from '../controllers/LicensingAttachmentsController';
import LicensingAuthorizationsController from '../controllers/LicensingAuthorizationsController';
import LicensingInfringementsController from '../controllers/LicensingInfringementsController';
import LicensingsController from '../controllers/LicensingsController';
import LicensingStatusController from '../controllers/LicensingStatusController';

import ProjectAttachmentsController from '../controllers/ProjectAttachmentsController';
import ProjectLinesController from '../controllers/ProjectLinesController';
import ProjectsController from '../controllers/ProjectsController';
import ProjectStatusController from '../controllers/ProjectStatusController';
import ProjectTypesController from '../controllers/ProjectTypesController';

import PropertyAttachmentsController from '../controllers/PropertyAttachmentsController';
import PropertiesController from '../controllers/PropertiesController';
import PropertyDocsController from '../controllers/PropertyDocsController';

import UsersController from '../controllers/UsersController';
import UsersRolesController from '../controllers/UsersRolesController';
import UsersNewController from '../controllers/UsersNewController';

import usersAuthMiddleware from '../middlewares/usersAuth';

const userAuthRoutes = express.Router();

userAuthRoutes.get('/users/authenticated', usersAuthMiddleware, function (request, response) {
    return response.status(202).json();
});

userAuthRoutes.get('/users', usersAuthMiddleware, UsersController.index);
userAuthRoutes.get('/users/:id', usersAuthMiddleware, UsersController.show);
userAuthRoutes.post('/users', usersAuthMiddleware, UsersController.create);
userAuthRoutes.put('/users/:id', usersAuthMiddleware, UsersController.update);
userAuthRoutes.delete('/users/:id', usersAuthMiddleware, UsersController.delete);

userAuthRoutes.get('/user/roles/:id', usersAuthMiddleware, UsersRolesController.index);
userAuthRoutes.get('/users/roles/:id', usersAuthMiddleware, UsersRolesController.show);
userAuthRoutes.get('/users/roles', usersAuthMiddleware, UsersRolesController.generate);
userAuthRoutes.put('/users/roles/:id', usersAuthMiddleware, UsersRolesController.update);

userAuthRoutes.put('/users/new/:id', usersAuthMiddleware, UsersNewController.update);

userAuthRoutes.get('/banks', usersAuthMiddleware, BanksController.index);
userAuthRoutes.get('/banks/:id', usersAuthMiddleware, BanksController.show);
userAuthRoutes.post('/banks', usersAuthMiddleware, BanksController.create);
userAuthRoutes.put('/banks/:id', usersAuthMiddleware, BanksController.update);
userAuthRoutes.delete('/banks/:id', usersAuthMiddleware, BanksController.delete);

//userAuthRoutes.get('/customers/attachments', usersAuthMiddleware, CustomerAttachmentsController.index);
userAuthRoutes.get('/customers/attachments/:id', usersAuthMiddleware, CustomerAttachmentsController.show);
userAuthRoutes.post('/customers/:id/attachments', usersAuthMiddleware, UploadsConfig('customers').single('file'), CustomerAttachmentsController.create);
userAuthRoutes.put('/customers/attachments/:id', usersAuthMiddleware, CustomerAttachmentsController.update);
userAuthRoutes.delete('/customers/attachments/:id', usersAuthMiddleware, CustomerAttachmentsController.delete);

userAuthRoutes.get('/customers/docs', usersAuthMiddleware, CustomerDocsController.index);
userAuthRoutes.get('/customers/docs/:id', usersAuthMiddleware, CustomerDocsController.show);
userAuthRoutes.post('/customers/docs', usersAuthMiddleware, CustomerDocsController.create);
userAuthRoutes.put('/customers/docs/:id', usersAuthMiddleware, CustomerDocsController.update);
userAuthRoutes.delete('/customers/docs/:id', usersAuthMiddleware, CustomerDocsController.delete);

userAuthRoutes.get('/customers', usersAuthMiddleware, CustomersController.index);
userAuthRoutes.get('/customers/:id', usersAuthMiddleware, CustomersController.show);
userAuthRoutes.post('/customers', usersAuthMiddleware, CustomersController.create);
userAuthRoutes.put('/customers/:id', usersAuthMiddleware, CustomersController.update);
userAuthRoutes.delete('/customers/:id', usersAuthMiddleware, CustomersController.delete);

userAuthRoutes.get('/customers/:id/properties', usersAuthMiddleware, CustomerPropertiesController.index);

userAuthRoutes.get('/docs/customer', usersAuthMiddleware, DocsCustomerController.index);
userAuthRoutes.get('/docs/customer/:id', usersAuthMiddleware, DocsCustomerController.show);
userAuthRoutes.post('/docs/customer', usersAuthMiddleware, DocsCustomerController.create);
userAuthRoutes.put('/docs/customer/:id', usersAuthMiddleware, DocsCustomerController.update);
userAuthRoutes.delete('/docs/customer/:id', usersAuthMiddleware, DocsCustomerController.delete);

userAuthRoutes.get('/docs/property', usersAuthMiddleware, DocsPropertyController.index);
userAuthRoutes.get('/docs/property/:id', usersAuthMiddleware, DocsPropertyController.show);
userAuthRoutes.post('/docs/property', usersAuthMiddleware, DocsPropertyController.create);
userAuthRoutes.put('/docs/property/:id', usersAuthMiddleware, DocsPropertyController.update);
userAuthRoutes.delete('/docs/property/:id', usersAuthMiddleware, DocsPropertyController.delete);

userAuthRoutes.get('/licensing/:id/events', usersAuthMiddleware, EventsLicensingController.index);
userAuthRoutes.get('/events/licensing/:id', usersAuthMiddleware, EventsLicensingController.show);
userAuthRoutes.post('/events/licensing', usersAuthMiddleware, EventsLicensingController.create);
userAuthRoutes.put('/events/licensing/:id', usersAuthMiddleware, EventsLicensingController.update);
userAuthRoutes.delete('/events/licensing/:id', usersAuthMiddleware, EventsLicensingController.delete);

userAuthRoutes.get('/project/:id/events', usersAuthMiddleware, EventsProjectController.index);
userAuthRoutes.get('/events/project/:id', usersAuthMiddleware, EventsProjectController.show);
userAuthRoutes.post('/events/project', usersAuthMiddleware, EventsProjectController.create);
userAuthRoutes.put('/events/project/:id', usersAuthMiddleware, EventsProjectController.update);
userAuthRoutes.delete('/events/project/:id', usersAuthMiddleware, EventsProjectController.delete);

userAuthRoutes.get('/institutions', usersAuthMiddleware, InstitutionsController.index);
userAuthRoutes.get('/institutions/:id', usersAuthMiddleware, InstitutionsController.show);
userAuthRoutes.post('/institutions', usersAuthMiddleware, InstitutionsController.create);
userAuthRoutes.put('/institutions/:id', usersAuthMiddleware, InstitutionsController.update);
userAuthRoutes.delete('/institutions/:id', usersAuthMiddleware, InstitutionsController.delete);

userAuthRoutes.get('/licensings/agencies', usersAuthMiddleware, LicensingAgenciesController.index);
userAuthRoutes.get('/licensings/agencies/:id', usersAuthMiddleware, LicensingAgenciesController.show);
userAuthRoutes.post('/licensings/agencies', usersAuthMiddleware, LicensingAgenciesController.create);
userAuthRoutes.put('/licensings/agencies/:id', usersAuthMiddleware, LicensingAgenciesController.update);
userAuthRoutes.delete('/licensings/agencies/:id', usersAuthMiddleware, LicensingAgenciesController.delete);

userAuthRoutes.get('/licensings/attachments/:id', usersAuthMiddleware, LicensingAttachmentsController.show);
userAuthRoutes.post('/licensings/:id/attachments', usersAuthMiddleware, UploadsConfig('licensings').single('file'), LicensingAttachmentsController.create);
userAuthRoutes.put('/licensings/attachments/:id', usersAuthMiddleware, LicensingAttachmentsController.update);
userAuthRoutes.delete('/licensings/attachments/:id', usersAuthMiddleware, LicensingAttachmentsController.delete);

userAuthRoutes.get('/licensings/authorizations', usersAuthMiddleware, LicensingAuthorizationsController.index);
userAuthRoutes.get('/licensings/authorizations/:id', usersAuthMiddleware, LicensingAuthorizationsController.show);
userAuthRoutes.post('/licensings/authorizations', usersAuthMiddleware, LicensingAuthorizationsController.create);
userAuthRoutes.put('/licensings/authorizations/:id', usersAuthMiddleware, LicensingAuthorizationsController.update);
userAuthRoutes.delete('/licensings/authorizations/:id', usersAuthMiddleware, LicensingAuthorizationsController.delete);



userAuthRoutes.get('/licensings/infringements', usersAuthMiddleware, LicensingInfringementsController.index);
userAuthRoutes.get('/licensings/infringements/:id', usersAuthMiddleware, LicensingInfringementsController.show);
userAuthRoutes.post('/licensings/infringements', usersAuthMiddleware, LicensingInfringementsController.create);
userAuthRoutes.put('/licensings/infringements/:id', usersAuthMiddleware, LicensingInfringementsController.update);
userAuthRoutes.delete('/licensings/infringements/:id', usersAuthMiddleware, LicensingInfringementsController.delete);

userAuthRoutes.get('/licensings/status', usersAuthMiddleware, LicensingStatusController.index);
userAuthRoutes.get('/licensings/status/:id', usersAuthMiddleware, LicensingStatusController.show);
userAuthRoutes.post('/licensings/status', usersAuthMiddleware, LicensingStatusController.create);
userAuthRoutes.put('/licensings/status/:id', usersAuthMiddleware, LicensingStatusController.update);
userAuthRoutes.delete('/licensings/status/:id', usersAuthMiddleware, LicensingStatusController.delete);

userAuthRoutes.get('/licensings', usersAuthMiddleware, LicensingsController.index);
userAuthRoutes.get('/licensings/:id', usersAuthMiddleware, LicensingsController.show);
userAuthRoutes.post('/licensings', usersAuthMiddleware, LicensingsController.create);
userAuthRoutes.put('/licensings/:id', usersAuthMiddleware, LicensingsController.update);
userAuthRoutes.delete('/licensings/:id', usersAuthMiddleware, LicensingsController.delete);

userAuthRoutes.get('/projects/attachments/:id', usersAuthMiddleware, ProjectAttachmentsController.show);
userAuthRoutes.post('/projects/:id/attachments', usersAuthMiddleware, UploadsConfig('projects').single('file'), ProjectAttachmentsController.create);
userAuthRoutes.put('/projects/attachments/:id', usersAuthMiddleware, ProjectAttachmentsController.update);
userAuthRoutes.delete('/projects/attachments/:id', usersAuthMiddleware, ProjectAttachmentsController.delete);

userAuthRoutes.get('/projects/lines', usersAuthMiddleware, ProjectLinesController.index);
userAuthRoutes.get('/projects/lines/:id', usersAuthMiddleware, ProjectLinesController.show);
userAuthRoutes.post('/projects/lines', usersAuthMiddleware, ProjectLinesController.create);
userAuthRoutes.put('/projects/lines/:id', usersAuthMiddleware, ProjectLinesController.update);
userAuthRoutes.delete('/projects/lines/:id', usersAuthMiddleware, ProjectLinesController.delete);

userAuthRoutes.get('/projects/status', usersAuthMiddleware, ProjectStatusController.index);
userAuthRoutes.get('/projects/status/:id', usersAuthMiddleware, ProjectStatusController.show);
userAuthRoutes.post('/projects/status', usersAuthMiddleware, ProjectStatusController.create);
userAuthRoutes.put('/projects/status/:id', usersAuthMiddleware, ProjectStatusController.update);
userAuthRoutes.delete('/projects/status/:id', usersAuthMiddleware, ProjectStatusController.delete);

userAuthRoutes.get('/projects/types', usersAuthMiddleware, ProjectTypesController.index);
userAuthRoutes.get('/projects/types/:id', usersAuthMiddleware, ProjectTypesController.show);
userAuthRoutes.post('/projects/types', usersAuthMiddleware, ProjectTypesController.create);
userAuthRoutes.put('/projects/types/:id', usersAuthMiddleware, ProjectTypesController.update);
userAuthRoutes.delete('/projects/types/:id', usersAuthMiddleware, ProjectTypesController.delete);

userAuthRoutes.get('/projects', usersAuthMiddleware, ProjectsController.index);
userAuthRoutes.get('/projects/:id', usersAuthMiddleware, ProjectsController.show);
userAuthRoutes.post('/projects', usersAuthMiddleware, ProjectsController.create);
userAuthRoutes.put('/projects/:id', usersAuthMiddleware, ProjectsController.update);
userAuthRoutes.delete('/projects/:id', usersAuthMiddleware, ProjectsController.delete);

userAuthRoutes.get('/properties/attachments/:id', usersAuthMiddleware, PropertyAttachmentsController.show);
userAuthRoutes.post('/properties/:id/attachments', usersAuthMiddleware, UploadsConfig('properties').single('file'), PropertyAttachmentsController.create);
userAuthRoutes.put('/properties/attachments/:id', usersAuthMiddleware, PropertyAttachmentsController.update);
userAuthRoutes.delete('/properties/attachments/:id', usersAuthMiddleware, PropertyAttachmentsController.delete);

userAuthRoutes.get('/properties', usersAuthMiddleware, PropertiesController.index);
userAuthRoutes.get('/properties/:id', usersAuthMiddleware, PropertiesController.show);
userAuthRoutes.post('/properties', usersAuthMiddleware, PropertiesController.create);
userAuthRoutes.put('/properties/:id', usersAuthMiddleware, PropertiesController.update);
userAuthRoutes.delete('/properties/:id', usersAuthMiddleware, PropertiesController.delete);

userAuthRoutes.get('/properties/docs', usersAuthMiddleware, PropertyDocsController.index);
userAuthRoutes.get('/properties/docs/:id', usersAuthMiddleware, PropertyDocsController.show);
userAuthRoutes.post('/properties/docs', usersAuthMiddleware, PropertyDocsController.create);
userAuthRoutes.put('/properties/docs/:id', usersAuthMiddleware, PropertyDocsController.update);
userAuthRoutes.delete('/properties/docs/:id', usersAuthMiddleware, PropertyDocsController.delete);

export default userAuthRoutes;