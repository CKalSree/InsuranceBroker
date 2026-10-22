import type { NextFunction, Request, Response } from 'express';
import { ProvidersService } from '../services/providersService.js';

const service = new ProvidersService();

export async function listProviders(req: Request, res: Response, next: NextFunction) {
  try {
    const providers = await service.list();
    res.json({ success: true, data: providers });
  } catch (error) {
    next(error);
  }
}

export async function getProvider(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const provider = await service.getById(id);
    res.json({ success: true, data: provider });
  } catch (error) {
    next(error);
  }
}

export async function createProvider(req: Request, res: Response, next: NextFunction) {
  try {
    const provider = await service.create(req.body);
    res.status(201).json({ success: true, data: provider });
  } catch (error) {
    next(error);
  }
}

export async function updateProvider(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const provider = await service.update(id, req.body);
    res.json({ success: true, data: provider });
  } catch (error) {
    next(error);
  }
}
