import express, { Response, Request } from "express"
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cookieParser from 'cookie-parser';

// Environment const
import dotenv from 'dotenv';
dotenv.config();

import loginRoute from './routes/login';
import registerRoute from './routes/register';
import { authenticationInitialize } from "./config/authentication";
import { authenticatedRoute } from "./middlewares/authenticatedRoute";
import { IParent } from "./models/parents";

const app = express()
const port = 3002;

app.use(logger('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(authenticationInitialize());
app.use(cookieParser());


app.use('/login', loginRoute);
app.use('/register', registerRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Bienvenue dans la Cabane aux étoiles')
})

app.get('/teapot', authenticatedRoute(), (req: Request, res: Response) => {
  res.status(418).send(`Hello ${(req.user as IParent).firstname} ! I am a teapot (ou ton p'tit pote)`);
})

const mongoUri = process.env.DATABASE_URL || '';
console.log(`Trying to connect to DB : ${mongoUri}`);
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  console.log(`Connected to database`);
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });
});




