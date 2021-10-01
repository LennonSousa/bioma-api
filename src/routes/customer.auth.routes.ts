import express from 'express';
import SharesCustomerAttachmentController from '../controllers/SharesCustomerAttachmentController';
import SharesLicensingAttachmentController from '../controllers/SharesLicensingAttachmentController';
import SharesProjectAttachmentController from '../controllers/SharesProjectAttachmentController';
import SharesPropertyAttachmentController from '../controllers/SharesPropertyAttachmentController';
import customersAuthMiddleware from '../middlewares/customersAuth';

const customerAuthRoutes = express.Router();

customerAuthRoutes.get('/shares/customers/:id', customersAuthMiddleware, SharesCustomerAttachmentController.show);
customerAuthRoutes.get('/shares/licensings/:id', customersAuthMiddleware, SharesLicensingAttachmentController.show);
customerAuthRoutes.get('/shares/projects/:id', customersAuthMiddleware, SharesProjectAttachmentController.show);
customerAuthRoutes.get('/shares/properties/:id', customersAuthMiddleware, SharesPropertyAttachmentController.show);

export default customerAuthRoutes;