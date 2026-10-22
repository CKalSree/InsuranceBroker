import type { NextFunction, Request, Response } from 'express';
import { EnrollmentsService } from '../services/enrollmentsService.js';

const service = new EnrollmentsService();

export async function listEnrollments(req: Request, res: Response, next: NextFunction) {
  try {
    const employeeId = req.query.employeeId ? Number(req.query.employeeId) : undefined;
    const enrollments = employeeId ? await service.listByEmployee(employeeId) : await service.list();
    res.json({ success: true, data: enrollments });
  } catch (error) {
    next(error);
  }
}

export async function getEnrollment(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const enrollment = await service.getById(id);
    res.json({ success: true, data: enrollment });
  } catch (error) {
    next(error);
  }
}

export async function createEnrollment(req: Request, res: Response, next: NextFunction) {
  try {
    const enrollment = await service.create(req.body);
    res.status(201).json({ success: true, data: enrollment });
  } catch (error) {
    next(error);
  }
}

export async function updateEnrollment(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const enrollment = await service.update(id, req.body);
    res.json({ success: true, data: enrollment });
  } catch (error) {
    next(error);
  }
}
