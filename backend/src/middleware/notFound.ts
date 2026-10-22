import type { NextFunction, Request, Response } from 'express';

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  if (req.path) {
    const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`) as Error & { statusCode: number };
    error.statusCode = 404;
    next(error);
    return;
  }

  res.status(404).json({ success: false, message: 'Endpoint not found' });
}
