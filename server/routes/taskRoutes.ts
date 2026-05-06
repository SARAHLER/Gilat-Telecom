import { Router } from 'express';
import { 
  getTasks, 
  createTask, 
  updateTask, 
  deleteTask, 
} from '../controllers/taskController';

const router = Router();

/**
 * @route GET /api/tasks
 * @desc Retrieve all tasks with optional filtering
 * @query {string} name - Optional task title to filter (case-insensitive regex)
 * @query {string} date - Optional ISO date string to filter by creation date
 * @returns {Object} { status, results, totalTasks, data: { tasks } }
 */
router.get('/', getTasks);

/**
 * @route POST /api/tasks
 * @desc Create a new task
 * @body {string} title - Task title (required, max 100 chars)
 * @body {string} description - Task description (required, max 1000 chars)
 * @body {string} status - Task status: 'Pending' | 'In Progress' | 'Completed' (optional)
 * @returns {Object} { status, data: { task } }
 */
router.post('/', createTask);

/**
 * @route PUT /api/tasks/:id
 * @desc Update an existing task
 * @param {string} id - MongoDB task ID
 * @body {string} title - New task title (optional)
 * @body {string} description - New task description (optional)
 * @body {string} status - New task status (optional)
 * @returns {Object} { status, data: { task } }
 */
router.put('/:id', updateTask);

/**
 * @route DELETE /api/tasks/:id
 * @desc Delete a task
 * @param {string} id - MongoDB task ID
 * @returns {Object} { status, data: null }
 */
router.delete('/:id', deleteTask);

export default router;