import express from 'express';
import { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import 'express-async-errors';

/* File imports */
import router from './routes';
import { errorHandler } from './middleware/error-handler.middleware';

dotenv.config();

const app: Application = express();

/* Middleware */
app.use(express.json());
// app.use(express.urlencoded()); // giving a warnig ? why
app.use(cors());
app.use(cookieParser());

/* Router */
app.use('/api', router);

/* Error handler */
app.use(errorHandler);

const port: number = +(process.env.PORT ? process.env.PORT : 8000);
const mongouri: string = (process.env.MONGO_URI ? process.env.MONGO_URI : '' );

mongoose.connect(mongouri).then( res => {
	console.log(`Connected to DB`);
	app.listen(port, () => console.log(`Server started listening at PORT ${port}`));
}, (err) => {
	console.log(`Can't connect to Database`);
});