import express from 'express';

import CustomersController from '../controllers/CustomersController';
import ProjectsController from '../controllers/ProjectsController';

const userAuthRoutes = express.Router();

userAuthRoutes.get('/customers', CustomersController.index);
userAuthRoutes.get('/customers/:id', CustomersController.show);
userAuthRoutes.post('/customers', CustomersController.create);
userAuthRoutes.put('/customers/:id', CustomersController.update);
userAuthRoutes.delete('/customers/:id', CustomersController.delete);

userAuthRoutes.get('/projects', ProjectsController.index);
userAuthRoutes.get('/projects/:id', ProjectsController.show);
userAuthRoutes.post('/projects', ProjectsController.create);
userAuthRoutes.put('/projects/:id', ProjectsController.update);
userAuthRoutes.delete('/projects/:id', ProjectsController.delete);

export default userAuthRoutes;