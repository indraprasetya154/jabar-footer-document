import 'dotenv/config'
import express from 'express';
import cors from "cors";

import routes from './routes/index.js';

const app = express();

const PORT = process.env.PORT
const ENV = process.env.APP_ENV

app.use(cors());
app.use(routes);

app.listen(PORT, console.log(`Server running in ${ENV} mode on port ${PORT}`));