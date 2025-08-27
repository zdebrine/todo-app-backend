import { NextFunction, Request, Response } from 'express';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err?.code && typeof err.code === 'string' && err.code.startsWith('P')) {
    return res.status(400).json({ error: 'PrismaError', details: err.message });
  }
  console.error(err);
  res.status(500).json({ error: 'InternalServerError' });
}
