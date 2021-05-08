import express from 'express';

import CustomersController from '../controllers/CustomersController'

const userAuthRoutes = express.Router();

userAuthRoutes.get('/customers', CustomersController.index);
userAuthRoutes.get('/customers/:id', CustomersController.show);
userAuthRoutes.post('/customers', CustomersController.create);
userAuthRoutes.put('/customers/:id', CustomersController.update);
userAuthRoutes.delete('/customers/:id', CustomersController.delete);

export default userAuthRoutes;