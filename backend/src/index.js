import express from 'express';
import { PORT } from './config/serverConfig.js';
import { connectDB } from './config/dbConfig.js';
import routes from './routes/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.use('/api', routes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})