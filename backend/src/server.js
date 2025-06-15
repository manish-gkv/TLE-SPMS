import express from 'express';

import connectDatabase from './config/database.js';
import studentRoutes from './routes/student.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/students', studentRoutes);

const startServer = async () => {
    await connectDatabase();
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
};

startServer();