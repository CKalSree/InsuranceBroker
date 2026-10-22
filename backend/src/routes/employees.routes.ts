import { Router } from 'express';
import {
  createEmployee,
  getEmployee,
  listEmployees,
  updateEmployee,
} from '../controllers/employeesController.js';

const router = Router();

router.get('/', listEmployees);
router.get('/:id', getEmployee);
router.post('/', createEmployee);
router.patch('/:id', updateEmployee);

export default router;
