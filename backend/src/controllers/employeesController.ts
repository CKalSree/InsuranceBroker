import type { NextFunction, Request, Response } from 'express';
import { EmployeesService } from '../services/employeesService.js';

const service = new EmployeesService();

export async function listEmployees(req: Request, res: Response, next: NextFunction) {
  try {
    const brokerId = req.query.brokerId ? Number(req.query.brokerId) : undefined;
    const employees = brokerId ? await service.listByBroker(brokerId) : await service.list();
    res.json({ success: true, data: employees });
  } catch (error) {
    next(error);
  }
}

export async function getEmployee(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const employee = await service.getById(id);
    res.json({ success: true, data: employee });
  } catch (error) {
    next(error);
  }
}

export async function createEmployee(req: Request, res: Response, next: NextFunction) {
  try {
    const employee = await service.create(req.body);
    res.status(201).json({ success: true, data: employee });
  } catch (error) {
    next(error);
  }
}

export async function updateEmployee(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const employee = await service.update(id, req.body);
    res.json({ success: true, data: employee });
  } catch (error) {
    next(error);
  }
}
