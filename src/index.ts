import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import tasksRouter from './routes/tasks.routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

app.use(cors({
  origin(origin, cb) {
    if (!origin) return cb(null, true);
    return allowedOrigins.includes(origin)
      ? cb(null, true)
      : cb(new Error('Not allowed by CORS'));
  },
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: false,
}));

app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/tasks', tasksRouter);

app.use(errorHandler);

const port = Number(process.env.PORT) || 4000;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

export default app;
