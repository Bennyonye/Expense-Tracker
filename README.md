# Expense Tracker App

## Overview
The Expense Tracker App is a full-stack application built using the MERN (MongoDB, Express.js, React, Node.js) stack. This app helps users efficiently manage their finances by tracking their spending, saving, and investments. The project leverages modern technologies for both the backend and frontend, with TypeScript ensuring type safety throughout the application.

---

## Features
- Track expenses, savings, and investments
- Visualize spending with interactive charts
- Add, edit, and delete expense records
- Filter transactions by date or category
- User-friendly interface with a responsive design

---

## Technologies Used

### Backend
- **Express.js**: Web framework for Node.js used to create APIs.
- **Mongoose**: MongoDB object modeling tool for Node.js.
- **CORS**: Middleware for enabling Cross-Origin Resource Sharing.
- **Node.js**: JavaScript runtime for building scalable server-side applications.

Additional tools and platforms:
- **Postman**: Used to test and document APIs.
- **MongoDB Atlas**: Cloud-based database service.

### Frontend
- **React**: Component-based library for building user interfaces.
- **TypeScript**: Typed superset of JavaScript for type safety and improved developer experience.
- **Axios**: HTTP client for communicating with the backend API.
- **Chart.js & react-chartjs-2**: Libraries for creating interactive and dynamic charts.
- **Moment.js**: Library for formatting and manipulating dates.
- **React-datepicker**: Component for selecting dates in forms.
- **Styled-components**: CSS-in-JS library for styling React components.

---

## Installation

### Prerequisites
- Node.js and npm installed on your machine.
- A MongoDB Atlas account for hosting the database (or a locally installed MongoDB instance).
- Postman (optional, for API testing).

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend directory and add the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React application:
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`.

---

## API Endpoints

### Expense Routes
- **GET /api/expenses**: Fetch all expenses
- **POST /api/expenses**: Add a new expense
- **PUT /api/expenses/:id**: Update an expense
- **DELETE /api/expenses/:id**: Delete an expense

### Example Response
**GET /api/expenses**
```json
[
  {
    "_id": "1234567890",
    "amount": 50,
    "category": "Food",
    "date": "2025-01-01T00:00:00.000Z"
  },
  {
    "_id": "0987654321",
    "amount": 100,
    "category": "Transportation",
    "date": "2025-01-02T00:00:00.000Z"
  }
]
```

---

## Folder Structure

### Backend
```
backend/
|-- controllers/
|-- models/
|-- routes/
|-- server.ts
```

### Frontend
```
frontend/
|-- components/
|-- pages/
|-- styles/
|-- App.tsx
|-- index.tsx
```

---

## Usage
1. Add new expenses by specifying the category, amount, and date.
2. View expenses in a categorized pie chart.
3. Filter expenses by date or category to focus on specific transactions.
4. Monitor financial habits and make informed decisions.

---

## Future Improvements
- Add user authentication for personalized accounts.
- Introduce budgeting features to set spending limits.
- Enable exporting data to CSV or Excel.
- Add recurring expense tracking.

---

## Author
1. Benedict Igbukolu
   Github Acount: /Bennyonye
2. Daniel Izevbije
    Github Account:
    