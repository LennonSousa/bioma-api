import express from 'express';

import UsersAuthenticationsController from '../controllers/UsersAuthenticationController';
import UsersNewController from '../controllers/UsersNewController';
import UsersResetsController from '../controllers/UsersResetsController';
import SharesLicensingAttachmentController from '../controllers/SharesLicensingAttachmentController';
import SharesCustomerAttachmentController from '../controllers/SharesCustomerAttachmentController';
import SharesProjectAttachmentController from '../controllers/SharesProjectAttachmentController';
import SharesPropertyAttachmentController from '../controllers/SharesPropertyAttachmentController';

const userPublicRoutes = express.Router();

userPublicRoutes.post('/users/authenticate', UsersAuthenticationsController.create);

userPublicRoutes.get('/users/new/auth', UsersNewController.show);

userPublicRoutes.get('/users/reset', UsersResetsController.show);
userPublicRoutes.post('/users/reset', UsersResetsController.create);

userPublicRoutes.put('/shares/customers/:id', SharesCustomerAttachmentController.update);
userPublicRoutes.put('/shares/licensings/:id', SharesLicensingAttachmentController.update);
userPublicRoutes.put('/shares/projects/:id', SharesProjectAttachmentController.update);
userPublicRoutes.put('/shares/properties/:id', SharesPropertyAttachmentController.update);

export default userPublicRoutes;