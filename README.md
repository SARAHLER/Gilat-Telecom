Task Management System

The system is built on the server side in Backend
and client side in React
Installation instructions for Backend

A robust Task Management Backend built with Node.js, Express, and TypeScript. This system provides a full CRUD API with built-in validation, global error handling, and structured logging.

Technologies & Libraries
Node.js & Express: Core server framework.

TypeScript: For static typing and enhanced developer experience.

MongoDB & Mongoose: Database and Object Data Modeling.

CORS: Cross-Origin Resource Sharing enabled for frontend integration.

Dotenv: Environment variables management.

Winston: Advanced logging for production-ready monitoring.

-Installation & Setup
Install Dependencies:
npm install

-Environment Configuration:
Create a .env file in the root directory and add the following:
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    NODE_ENV=development

-Run the Server:
npm run dev

-Assumptions & Features

-Data Integrity: Every task requires a title (max 100 chars) and a description (max 1000 chars).
-Status Management: Tasks use a strict Enum: Pending, In Progress, or Completed.
-Automated Logging: System logs are automatically generated in the /logs directory, separatinggeneral info from errors.
-Graceful Shutdown**: The server validates DB connections on startup and terminates if the configuration is missing.

API Endpoints

Base URL: /api/tasks

GET:/ - Fetch all tasks (supports filtering by name and date).
POST : /- Create a new task (includes validation). 
PUT : /:id- Update an existing task (partial or full).
DELETE :/:id - Remove a task from the database.


Project Structure

-controllers/: Request handling and business logic.
-models/: Mongoose schemas and TypeScript interfaces.
-routes/: API endpoint definitions.
-middleware/: Custom error handling and system middle-layers.
-utils/: Validation logic, custom error classes, and logger configuration.


-Error Handling

The application uses a centralized error-handling middleware. It distinguishes between operational errors (via the AppError class) and unexpected system errors, ensuring the client receives a clean, consistent JSON response even when things go wrong.



The system is built on the server side in Frontend


A modern, responsive Task Management dashboard built with React, TypeScript, and Material UI (MUI). The application offers a seamless user experience for managing daily tasks with real-time updates and intuitive design.

Features

-Task Dashboard: View all tasks in a clean tab-based layout.

-Search and Filter: Filter tasks in real time with a built-in search bar.

-CRUD Operations: Full flow for adding, editing, and deleting tasks.

-Interactive Dialogs: Smooth modal transitions for creating and deleting tasks.

-Optimized Updates: Fast UI response times by updating the local state immediately after the creation is deleted.

-Error Handling: Integrated notifications (Snackbars) for API failures and validation warnings.

Tech Stack
-React (Functional Components & Hooks): Core library.

-TypeScript: Ensures type safety across components and API responses.

-Material UI (MUI): For high-quality, accessible UI components.

-Axios: For handling HTTP requests to the backend.

-Notistack: For stacked snackbar notifications.


Installation & Setup
Install Dependencies:

npm install

Environment Configuration:
Create a .env file in the root directory:
REACT_APP_API_URL=http://localhost:5000/api/tasks


Run the Application:
npm start


Architecture & Project Structure
The project follows a modular architecture for better maintainability:
-components: Reusable UI elements (TaskList, SearchBar, Dialogs).
-hooks: Custom React hooks (useTasks, useEditTask, useDeleteTask)
to encapsulate business logic and API calls.
-services: API layer using Axios instances and interceptors.
-types: Global TypeScript interfaces and DTOs (Data Transfer Objects).
-App.tsx: Main entry point managing the high-level layout and search state.


Key Functionalities

-Custom Hooks
-useTasks: Manages the lifecycle of fetching tasks, including loading states, error handling, and search debouncing.
-useDeleteTask: Handles the confirmation logic and loading state for deleting a task.
-useEditTask: Manages the task editing flow, handling the dialog state and ensuring data persistence through the API.


API Integration
The frontend communicates with the backend via a centralized api.ts service. It includes a response interceptor to globally log errors, making debugging easier during development.


Final Note
Thank you for the opportunity to showcase my skills through this project. I truly enjoyed the process of building a full-stack solution and implementing best practices in both Backend and Frontend development

I would be happy to hear any feedback or insights to help me learn and grow further. Please feel free to reach out to me:
s8538239@gmail.com