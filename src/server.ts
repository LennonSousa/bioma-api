import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import './database/connection';
import errorHandler from './errors/handler';
import userAuthRoutes from './routes/user.auth.routes';

require('dotenv/config');

const app = express();

app.use(cors({
    //'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}));

app.use(express.json());

app.use(userAuthRoutes);
app.use(errorHandler);

app.listen(process.env.PORT || 3333, () => {
    console.info(`> Server listening on port: ${process.env.PORT || 3333}`);
});