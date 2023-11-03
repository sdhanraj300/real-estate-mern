import express from 'express';
import dotenv from 'dotenv';
import connectToDb from './config/db.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
connectToDb();

app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies



app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
