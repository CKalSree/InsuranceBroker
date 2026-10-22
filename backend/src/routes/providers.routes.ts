import { Router } from 'express';
import {
  createProvider,
  getProvider,
  listProviders,
  updateProvider,
} from '../controllers/providersController.js';

const router = Router();

router.get('/', listProviders);
router.get('/:id', getProvider);
router.post('/', createProvider);
router.patch('/:id', updateProvider);

export default router;
