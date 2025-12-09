import express from 'express';
import cors from 'cors';
import { PORT } from './config/serverConfig.js';
import { connectDB } from './config/dbConfig.js';
import routes from './routes/index.js';
import { auditLog } from './middlewares/auditMiddleware.js';
import { validateRequest } from './middlewares/validateRequest.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(auditLog);
app.use(validateRequest);

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.use('/api', routes);
app.use(errorHandler);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})