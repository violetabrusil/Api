import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from "./Routes/routes"


const app = express()

app.use(morgan('dev'));
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(express.json());
app.use(routes);

export default app;