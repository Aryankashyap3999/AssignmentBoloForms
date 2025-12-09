import express from 'express';
import { PORT } from './config/serverConfig.js';
import { connectDB } from './config/dbConfig.js';
import routes from './routes/index.js';
import { auditLog } from './middlewares/auditMiddleware.js';
import { validateRequest } from './middlewares/validateRequest.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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