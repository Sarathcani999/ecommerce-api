import { Router } from 'express';

/* File imports */
import { default as router_v1 } from './v1';

const router: Router = Router();

router.use('/v1', router_v1);

export default router;