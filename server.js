import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
dotenv.config(); //access variables in .env file
const PORT = process.env.PORT || 3000;


const app = express();

app.use(express.json());
app.use('/api/users', authRoutes);


app.get('/', (req, res) => {
    res.send({ message: 'APA Backend running!' });
});

connectDB();

app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`);
});

