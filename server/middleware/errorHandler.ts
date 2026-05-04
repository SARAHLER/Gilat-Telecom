import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import logger from '../utils/logger';

/**
 * Global error handling middleware
 */
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isDev = process.env.NODE_ENV === 'development';
  const statusCode = err?.statusCode || 500;
  const message = err?.message || 'Internal Server Error';

  logger.error(message, { statusCode, stack: isDev ? err?.stack : undefined });

  res.status(statusCode).json({
    status: 'error',
    message,
    ...(isDev && { stack: err?.stack })
  });
};