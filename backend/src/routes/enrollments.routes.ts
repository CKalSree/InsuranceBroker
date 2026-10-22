import { Router } from 'express';
import {
  createEnrollment,
  getEnrollment,
  listEnrollments,
  updateEnrollment,
} from '../controllers/enrollmentsController.js';

const router = Router();

router.get('/', listEnrollments);
router.get('/:id', getEnrollment);
router.post('/', createEnrollment);
router.patch('/:id', updateEnrollment);

export default router;
