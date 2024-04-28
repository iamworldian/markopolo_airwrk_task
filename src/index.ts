import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import errorHandler from './middlewares/errorHandler';
import tasks_route from './routes/tasks_route';
import logger from './utils/logger';

import cors from 'cors';
dotenv.config();

const server = express();

const http_con = http.createServer(server);
const io = new Server(http_con);

const PORT = process.env.PORT;
const MONGO_URI: string = process.env.MONGO_URI as string;

const mongoConnect = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    logger.info('Connected to mongoDB atlas cluster');
  } catch (err) {
    throw err;
  }
};

mongoose.connection.on('disconnected', () => {
  logger.warn('mongoDB Disconnected');
});

mongoose.connection.on('connected', () => {
  logger.warn('mongoDB Connected');
});

// middleware
server.use(express.static(__dirname + '/public'));
server.use(express.json());
server.use(cookieParser());
server.use(cors());
// Routers

// server.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html'); // Example route
// });
server.use('/ok', (req, res) => {
  res.status(200).json({ msg: 'OK' });
});

server.use('/api/tasks', tasks_route);

server.use(errorHandler);

// io.on('connection', socket => {
//   console.log('a user connected');
// });

// Server Connect
http_con.listen(PORT, () => {
  mongoConnect();
  logger.info(`Connected to Backend ${PORT}`);
});
