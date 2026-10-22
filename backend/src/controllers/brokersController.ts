import type { NextFunction, Request, Response } from 'express';
import { BrokersService } from '../services/brokersService.js';

const service = new BrokersService();

export async function listBrokers(req: Request, res: Response, next: NextFunction) {
  try {
    const brokers = await service.list();
    res.json({ success: true, data: brokers });
  } catch (error) {
    next(error);
  }
}

export async function getBroker(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const broker = await service.getById(id);
    res.json({ success: true, data: broker });
  } catch (error) {
    next(error);
  }
}

export async function createBroker(req: Request, res: Response, next: NextFunction) {
  try {
    const broker = await service.create(req.body);
    res.status(201).json({ success: true, data: broker });
  } catch (error) {
    next(error);
  }
}

export async function updateBroker(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const broker = await service.update(id, req.body);
    res.json({ success: true, data: broker });
  } catch (error) {
    next(error);
  }
}
