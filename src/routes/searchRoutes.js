import { Router } from 'express';

import * as searchController from '../controllers/search';

const router = Router();

router.get('/', searchController.search);

export default router;
