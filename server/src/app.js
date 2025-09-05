import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { requestLogger, errorHandler } from './middlewares/loggerMiddleware.js';

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).send('ok');
});

// Middleware de logging
app.use(requestLogger);

// Rutas
app.use('/api', routes);

// Middleware de errores
app.use(errorHandler);

export default app;
