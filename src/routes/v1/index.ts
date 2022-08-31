import { Router } from 'express';

/* File imports */
import authRouter from './auth.routes';
import inventoryRouter from './inventories.routes';

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/inventory', inventoryRouter)


export default router;