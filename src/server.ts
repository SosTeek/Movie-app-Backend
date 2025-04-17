// Import the 'express' module along with 'Request' and 'Response' types from express
import express, { Request, Response, Application, NextFunction } from 'express';
import { port, Database } from './config';
import router from './api/routes';
import cors from 'cors';
import path from 'path';

// Create an Express application
const app: Application = express();

// Database connection
Database.connection();

app.use(cors())

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/v1', router);

// Error-handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message,
  });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  // Log a message when the server is successfully running
  console.log(`Server is running on http://localhost:${port} server`);
});



