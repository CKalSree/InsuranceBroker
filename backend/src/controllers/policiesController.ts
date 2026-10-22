import type { NextFunction, Request, Response } from 'express';
import { PoliciesService } from '../services/policiesService.js';

const service = new PoliciesService();

export async function listPolicies(req: Request, res: Response, next: NextFunction) {
  try {
    const providerId = req.query.providerId ? Number(req.query.providerId) : undefined;
    const policies = providerId ? await service.listByProvider(providerId) : await service.list();
    res.json({ success: true, data: policies });
  } catch (error) {
    next(error);
  }
}

export async function getPolicy(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const policy = await service.getById(id);
    res.json({ success: true, data: policy });
  } catch (error) {
    next(error);
  }
}

export async function createPolicy(req: Request, res: Response, next: NextFunction) {
  try {
    const policy = await service.create(req.body);
    res.status(201).json({ success: true, data: policy });
  } catch (error) {
    next(error);
  }
}

export async function updatePolicy(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const policy = await service.update(id, req.body);
    res.json({ success: true, data: policy });
  } catch (error) {
    next(error);
  }
}
