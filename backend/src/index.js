import express from 'express';
import { PORT } from './config/serverConfig.js';
import { connectDB } from './config/dbConfig.js';

const app = express();

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})