# Gilat Telecom Service Tickets Manager

A full-stack application for managing service tickets in Gilat Telecom's NOC operations. Handles communication service calls and network faults.

## Project Structure

- `server/` — Node.js API server with TypeScript and MongoDB
- `client/` — React frontend with TypeScript, Redux and Material-UI

## Features

### Backend (Node.js + TypeScript + MongoDB)
- RESTful API for service tickets CRUD
- Search functionality across title and description
- Date range filtering
- Proper error handling and middleware
- MongoDB integration with TypeScript interfaces

### Frontend (React + TypeScript + Redux + MUI)
- Add new service tickets via form or Enter key
- Toggle completion with checkbox (strikethrough + muted color for completed)
- Delete tickets with trash icon
- Search and filter by dates
- Task counter
- Loading states and error handling
- Responsive Material-UI design

## Installation

1. **Server Setup:**
   ```bash
   cd server
   npm install
   # Create .env file with MONGO_URI=mongodb://localhost:27017/gilat-service-tickets
   npm run build
   npm start
   ```

2. **Client Setup:**
   ```bash
   cd client
   npm install
   npm start
   ```

3. **MongoDB:** Ensure MongoDB is running locally on default port.

## API Endpoints

- `GET /api/service-tickets` — List tickets (with search/date filters)
- `POST /api/service-tickets` — Create ticket
- `PUT /api/service-tickets/:id` — Update ticket
- `DELETE /api/service-tickets/:id` — Delete ticket

## Technologies

- **Backend:** Node.js, TypeScript, Express, MongoDB, Mongoose
- **Frontend:** React, TypeScript, Redux Toolkit, Material-UI, Axios

## Usage

- Start both server and client
- Add tickets using the form
- Toggle completion, search, filter, and delete as needed

This project demonstrates full-stack development skills with TypeScript suitable for telecom NOC operations.