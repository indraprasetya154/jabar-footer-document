import 'dotenv/config'
import express from 'express';
import cors from "cors";
import bodyParser from 'body-parser';
import helmet from 'helmet';
import routes from './routes/index.js';
import path from 'path';

const app = express();

const PORT = process.env.PORT
const ENV = process.env.APP_ENV

app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);
app.use(express.static(path.resolve('public')));

app.listen(PORT, console.log(`Server running in ${ENV} mode on port ${PORT}`));