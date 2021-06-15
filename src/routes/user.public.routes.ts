import express from 'express';

import UsersAuthenticationsController from '../controllers/UsersAuthenticationController';
import UsersNewController from '../controllers/UsersNewController';

const userPublicRoutes = express.Router();

userPublicRoutes.post('/users/authenticate', UsersAuthenticationsController.create);

userPublicRoutes.get('/users/new/auth', UsersNewController.show);

export default userPublicRoutes;