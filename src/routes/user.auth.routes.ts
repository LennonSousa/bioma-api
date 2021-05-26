import express from 'express';
import multer from 'multer';

import uploadConfig from '../config/uploadCustomerAttachments';
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
import LicensingAuthorizationsController from '../controllers/LicensingAuthorizationsController';
import LicensingInfringementsController from '../controllers/LicensingInfringementsController';
import LicensingsController from '../controllers/LicensingsController';
import LicensingStatusController from '../controllers/LicensingStatusController';
import ProjectLinesController from '../controllers/ProjectLinesController';
import ProjectsController from '../controllers/ProjectsController';
import ProjectStatusController from '../controllers/ProjectStatusController';
import ProjectTypesController from '../controllers/ProjectTypesController';
import PropertiesController from '../controllers/PropertiesController';
import PropertyDocsController from '../controllers/PropertyDocsController';

const userAuthRoutes = express.Router();
const upload = multer(uploadConfig);

userAuthRoutes.get('/banks', BanksController.index);
userAuthRoutes.get('/banks/:id', BanksController.show);
userAuthRoutes.post('/banks', BanksController.create);
userAuthRoutes.put('/banks/:id', BanksController.update);
userAuthRoutes.delete('/banks/:id', BanksController.delete);

//userAuthRoutes.get('/customers/attachments', CustomerAttachmentsController.index);
userAuthRoutes.get('/customers/attachments/:id', CustomerAttachmentsController.show);
userAuthRoutes.post('/customers/attachments', upload.single('file'), CustomerAttachmentsController.create);
userAuthRoutes.put('/customers/attachments/:id', CustomerAttachmentsController.update);
userAuthRoutes.delete('/customers/attachments/:id', CustomerAttachmentsController.delete);

userAuthRoutes.get('/customers/docs', CustomerDocsController.index);
userAuthRoutes.get('/customers/docs/:id', CustomerDocsController.show);
userAuthRoutes.post('/customers/docs', CustomerDocsController.create);
userAuthRoutes.put('/customers/docs/:id', CustomerDocsController.update);
userAuthRoutes.delete('/customers/docs/:id', CustomerDocsController.delete);

userAuthRoutes.get('/customers', CustomersController.index);
userAuthRoutes.get('/customers/:id', CustomersController.show);
userAuthRoutes.post('/customers', CustomersController.create);
userAuthRoutes.put('/customers/:id', CustomersController.update);
userAuthRoutes.delete('/customers/:id', CustomersController.delete);

userAuthRoutes.get('/customers/:id/properties', CustomerPropertiesController.index);

userAuthRoutes.get('/docs/customer', DocsCustomerController.index);
userAuthRoutes.get('/docs/customer/:id', DocsCustomerController.show);
userAuthRoutes.post('/docs/customer', DocsCustomerController.create);
userAuthRoutes.put('/docs/customer/:id', DocsCustomerController.update);
userAuthRoutes.delete('/docs/customer/:id', DocsCustomerController.delete);

userAuthRoutes.get('/docs/property', DocsPropertyController.index);
userAuthRoutes.get('/docs/property/:id', DocsPropertyController.show);
userAuthRoutes.post('/docs/property', DocsPropertyController.create);
userAuthRoutes.put('/docs/property/:id', DocsPropertyController.update);
userAuthRoutes.delete('/docs/property/:id', DocsPropertyController.delete);

userAuthRoutes.get('/events/licensing', EventsLicensingController.index);
userAuthRoutes.get('/events/licensing/:id', EventsLicensingController.show);
userAuthRoutes.post('/events/licensing', EventsLicensingController.create);
userAuthRoutes.put('/events/licensing/:id', EventsLicensingController.update);
userAuthRoutes.delete('/events/licensing/:id', EventsLicensingController.delete);

userAuthRoutes.get('/project/:id/events', EventsProjectController.index);
userAuthRoutes.get('/events/project/:id', EventsProjectController.show);
userAuthRoutes.post('/events/project', EventsProjectController.create);
userAuthRoutes.put('/events/project/:id', EventsProjectController.update);
userAuthRoutes.delete('/events/project/:id', EventsProjectController.delete);

userAuthRoutes.get('/institutions', InstitutionsController.index);
userAuthRoutes.get('/institutions/:id', InstitutionsController.show);
userAuthRoutes.post('/institutions', InstitutionsController.create);
userAuthRoutes.put('/institutions/:id', InstitutionsController.update);
userAuthRoutes.delete('/institutions/:id', InstitutionsController.delete);

userAuthRoutes.get('/licensings/agencies', LicensingAgenciesController.index);
userAuthRoutes.get('/licensings/agencies/:id', LicensingAgenciesController.show);
userAuthRoutes.post('/licensings/agencies', LicensingAgenciesController.create);
userAuthRoutes.put('/licensings/agencies/:id', LicensingAgenciesController.update);
userAuthRoutes.delete('/licensings/agencies/:id', LicensingAgenciesController.delete);

userAuthRoutes.get('/licensings/authorizations', LicensingAuthorizationsController.index);
userAuthRoutes.get('/licensings/authorizations/:id', LicensingAuthorizationsController.show);
userAuthRoutes.post('/licensings/authorizations', LicensingAuthorizationsController.create);
userAuthRoutes.put('/licensings/authorizations/:id', LicensingAuthorizationsController.update);
userAuthRoutes.delete('/licensings/authorizations/:id', LicensingAuthorizationsController.delete);

userAuthRoutes.get('/licensings/infringements', LicensingInfringementsController.index);
userAuthRoutes.get('/licensings/infringements/:id', LicensingInfringementsController.show);
userAuthRoutes.post('/licensings/infringements', LicensingInfringementsController.create);
userAuthRoutes.put('/licensings/infringements/:id', LicensingInfringementsController.update);
userAuthRoutes.delete('/licensings/infringements/:id', LicensingInfringementsController.delete);

userAuthRoutes.get('/licensings/status', LicensingStatusController.index);
userAuthRoutes.get('/licensings/status/:id', LicensingStatusController.show);
userAuthRoutes.post('/licensings/status', LicensingStatusController.create);
userAuthRoutes.put('/licensings/status/:id', LicensingStatusController.update);
userAuthRoutes.delete('/licensings/status/:id', LicensingStatusController.delete);

userAuthRoutes.get('/licensings', LicensingsController.index);
userAuthRoutes.get('/licensings/:id', LicensingsController.show);
userAuthRoutes.post('/licensings', LicensingsController.create);
userAuthRoutes.put('/licensings/:id', LicensingsController.update);
userAuthRoutes.delete('/licensings/:id', LicensingsController.delete);

userAuthRoutes.get('/projects/lines', ProjectLinesController.index);
userAuthRoutes.get('/projects/lines/:id', ProjectLinesController.show);
userAuthRoutes.post('/projects/lines', ProjectLinesController.create);
userAuthRoutes.put('/projects/lines/:id', ProjectLinesController.update);
userAuthRoutes.delete('/projects/lines/:id', ProjectLinesController.delete);

userAuthRoutes.get('/projects/status', ProjectStatusController.index);
userAuthRoutes.get('/projects/status/:id', ProjectStatusController.show);
userAuthRoutes.post('/projects/status', ProjectStatusController.create);
userAuthRoutes.put('/projects/status/:id', ProjectStatusController.update);
userAuthRoutes.delete('/projects/status/:id', ProjectStatusController.delete);

userAuthRoutes.get('/projects/types', ProjectTypesController.index);
userAuthRoutes.get('/projects/types/:id', ProjectTypesController.show);
userAuthRoutes.post('/projects/types', ProjectTypesController.create);
userAuthRoutes.put('/projects/types/:id', ProjectTypesController.update);
userAuthRoutes.delete('/projects/types/:id', ProjectTypesController.delete);

userAuthRoutes.get('/projects', ProjectsController.index);
userAuthRoutes.get('/projects/:id', ProjectsController.show);
userAuthRoutes.post('/projects', ProjectsController.create);
userAuthRoutes.put('/projects/:id', ProjectsController.update);
userAuthRoutes.delete('/projects/:id', ProjectsController.delete);

userAuthRoutes.get('/properties', PropertiesController.index);
userAuthRoutes.get('/properties/:id', PropertiesController.show);
userAuthRoutes.post('/properties', PropertiesController.create);
userAuthRoutes.put('/properties/:id', PropertiesController.update);
userAuthRoutes.delete('/properties/:id', PropertiesController.delete);

userAuthRoutes.get('/properties/docs', PropertyDocsController.index);
userAuthRoutes.get('/properties/docs/:id', PropertyDocsController.show);
userAuthRoutes.post('/properties/docs', PropertyDocsController.create);
userAuthRoutes.put('/properties/docs/:id', PropertyDocsController.update);
userAuthRoutes.delete('/properties/docs/:id', PropertyDocsController.delete);

export default userAuthRoutes;