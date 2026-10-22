import { Router } from 'express';
import {
  createBroker,
  getBroker,
  listBrokers,
  updateBroker,
} from '../controllers/brokersController.js';

const router = Router();

router.get('/', listBrokers);
router.get('/:id', getBroker);
router.post('/', createBroker);
router.patch('/:id', updateBroker);

export default router;
