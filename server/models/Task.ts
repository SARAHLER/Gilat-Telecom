import mongoose, { Schema, Document } from 'mongoose';

/**
 * Task status enum
 */
export enum TaskStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed'
}

/**
 * TypeScript interface for Task documents
 */
export interface ITask extends Document {
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
}

/**
 * Mongoose schema for Task collection
 */
const TaskSchema: Schema<ITask> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.PENDING
    }
  },
  {
    timestamps: true 
  }
);

export default mongoose.model<ITask>('Task', TaskSchema);