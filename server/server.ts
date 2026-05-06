import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes';
import { errorHandler } from './middleware/errorHandler';
import logger from './utils/logger';

/** * Main server file for the Task Manager application.
 * Sets up the Express server, connects to MongoDB, and defines middleware and routes.
 * Utilizes environment variables for configuration and Winston for logging.
 */
dotenv.config();

const app = express();
app.use(express.json());
const allowedOrigin = process.env.CLIENT_URL;

app.use(
  cors({
    origin: allowedOrigin,
  })
);
app.use('/api/tasks', taskRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

if (!MONGO_URI) {
  logger.error('MONGO_URI is not defined in .env file');
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => {
    logger.info('Connected to MongoDB successfully');
    app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
  })
  .catch(err => {
    logger.error('MongoDB Connection Error: ' + err.message);
    process.exit(1);
  });