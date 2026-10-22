import { Router } from 'express';
import {
  createPolicy,
  getPolicy,
  listPolicies,
  updatePolicy,
} from '../controllers/policiesController.js';

const router = Router();

router.get('/', listPolicies);
router.get('/:id', getPolicy);
router.post('/', createPolicy);
router.patch('/:id', updatePolicy);

export default router;
