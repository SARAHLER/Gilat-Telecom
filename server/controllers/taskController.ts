import { Request, Response } from 'express';
import Task, { TaskStatus } from '../models/Task';
import { AppError } from '../utils/AppError';
import { validateTaskInput, validateTaskInputPartial } from '../utils/validators';

/**
 * GET /api/tasks
 * Retrieve all tasks with optional filtering by title and date
 * Query params: name (regex), date (ISO date string)
 */
export const getTasks = async (req: Request, res: Response) => {
  const { name, date } = req.query;
  const filter: Record<string, unknown> = {};

  if (name && typeof name === 'string') {
    filter.title = { $regex: name.trim(), $options: 'i' };
  }

  if (date && typeof date === 'string') {
    const start = new Date(date);
    if (isNaN(start.getTime())) {
      throw new AppError('Invalid date format. Use ISO 8601 format (YYYY-MM-DD)', 400);
    }
    const end = new Date(start);
    end.setDate(start.getDate() + 1);
    filter.createdAt = { $gte: start, $lt: end };
  }

  const [tasks, totalTasks] = await Promise.all([
    Task.find(filter)
      .select('title description status createdAt updatedAt')
      .sort({ createdAt: -1 })
      .lean(),
    Task.countDocuments(filter)
  ]);

  res.status(200).json({
    status: 'success',
    results: tasks.length,
    totalTasks,
    data: { tasks }
  });
};

/**
 * POST /api/tasks
 * Create a new task
 */
export const createTask = async (req: Request, res: Response) => {
  const { title, description, status } = req.body;
  validateTaskInput(title, description);

  if (status && !Object.values(TaskStatus).includes(status)) {
    throw new AppError(
      `Invalid status. Must be one of: ${Object.values(TaskStatus).join(', ')}`,
      400
    );
  }

  const newTask = await Task.create({ title: title.trim(), description: description.trim(), status });
  res.status(201).json({
    status: 'success',
    data: { task: newTask }
  });
};

/**
 * PUT /api/tasks/:id
 * Update an existing task
 */
export const updateTask = async (req: Request, res: Response) => {
  const { title, description, status } = req.body;

  validateTaskInputPartial(title, description);

  if (status && !Object.values(TaskStatus).includes(status)) {
    throw new AppError(
      `Invalid status. Must be one of: ${Object.values(TaskStatus).join(', ')}`,
      400
    );
  }

  const updateData: Record<string, unknown> = {};
  if (title !== undefined) updateData.title = title.trim();
  if (description !== undefined) updateData.description = description.trim();
  if (status !== undefined) updateData.status = status;

  const task = await Task.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true
  });

  if (!task) {
    throw new AppError('No task found with that ID', 404);
  }

  res.status(200).json({
    status: 'success',
    data: { task }
  });
};

/**
 * DELETE /api/tasks/:id
 * Delete a task
 */
export const deleteTask = async (req: Request, res: Response) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) {
    throw new AppError('No task found with that ID', 404);
  }
  res.status(204).end();
};