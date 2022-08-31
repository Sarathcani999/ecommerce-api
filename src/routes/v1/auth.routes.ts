import { Router } from 'express';

/* File imports */
import { login, register, validate } from '../../controller/v1/auth.controller';


const authRouter: Router = Router();

/* Register */
authRouter.post('/register', register);

/* Login */
authRouter.post('/login', login);

/* Validate */
authRouter.get('/validate', validate);

export default authRouter;