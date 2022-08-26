import express from 'express';
import { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

dotenv.config();

const app: Application = express();

/* Middleware */
app.use(express.json());
// app.use(express.urlencoded()); // giving a warnig ? why
app.use(cors());
app.use(cookieParser());

const port: Number = +(process.env.PORT ? process.env.PORT : 8000);
const mongouri: string = (process.env.MONGO_URI ? process.env.MONGO_URI : '' );

mongoose.connect(mongouri).then( res => {
	console.log(`Connected to DB`);
	app.listen(port, () => console.log(`Server started listening at PORT ${port}`));
}, (err) => {
	console.log(`Can't connect to Database`);
});