import env from 'dotenv';
env.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './routes/users.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRoutes);

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(app.listen(process.env.PORT), () => console.log(`Running on ${process.env.PORT}`))
        .catch((error) => console.log(error.message));

//Bind connection to error event (to get notification of connection errors)
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));