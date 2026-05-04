import { AppError } from './AppError';

/**
 * Validate task input data (for create/full updates)
 */
export const validateTaskInput = (title?: unknown, description?: unknown): void => {
  if (!title || typeof title !== 'string' || !title.trim()) {
    throw new AppError('Title is required and must be a non-empty string', 400);
  }
  if (!description || typeof description !== 'string' || !description.trim()) {
    throw new AppError('Description is required and must be a non-empty string', 400);
  }
  if (title.trim().length > 100) {
    throw new AppError('Title cannot exceed 100 characters', 400);
  }
  if (description.trim().length > 1000) {
    throw new AppError('Description cannot exceed 1000 characters', 400);
  }
};

/**
 * Validate partial task input (for partial updates)
 */
export const validateTaskInputPartial = (title?: unknown, description?: unknown): void => {
  if (title !== undefined) {
    if (typeof title !== 'string' || !title.trim()) {
      throw new AppError('Title must be a non-empty string', 400);
    }
    if (title.trim().length > 100) {
      throw new AppError('Title cannot exceed 100 characters', 400);
    }
  }

  if (description !== undefined) {
    if (typeof description !== 'string' || !description.trim()) {
      throw new AppError('Description must be a non-empty string', 400);
    }
    if (description.trim().length > 1000) {
      throw new AppError('Description cannot exceed 1000 characters', 400);
    }
  }
};
