import {NextFunction, Request, Response} from 'express';
import {config} from './config';

import * as cors from 'cors';
import * as express from 'express';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import * as dotenv from 'dotenv';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';

dotenv.config();

const serverRequestLimit = rateLimit({
  windowMs: 10000,
  max: 100 //TODO
});

class App {
  public readonly app: express.Application = express();

  constructor() {
    (global as any).appRoot = path.resolve(process.cwd(), '../');

    this.app.use(morgan('dev'));
    this.app.use(helmet());
    this.app.use(serverRequestLimit);
    this.app.use(cors({
      origin: this.configureCors
    }));

    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));

    this.app.use(express.static(path.join((global as any).appRoot, '../', 'public')));

    this.mountRoutes();
    this.setupDB();

    this.app.use(this.customErrorHandler);
  }

  private setupDB(): void {
    mongoose.connect(config.MONGODB_URL, {useNewUrlParser: true});

    const db = mongoose.connection;
    db.on('error', console.log.bind(console, 'MONGO ERROR'));
  }

  private customErrorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
    res
      .status(err.status || 500)
      .json({
        message: err.message || 'Unknown Error',
        code: err.code
      });
  }

  private configureCors = (origin: any, callback: any) => {
    const whiteList = config.ALLOWED_ORIGIN.split(';');
    if (!origin) {
      return callback(null, true);
    }
    if (!whiteList.includes(origin)) {
      return callback(new Error('Cors not allowed'));
    }

    return callback(null, true);
  };

  private mountRoutes(): void{
    this.app.use('/admin', adminRouter);
    this.app.use('/auth', authRouter);
    this.app.use('/product', productsRouter);
    this.app.use('/user', usersRouter);
  }
}

export const app = new App().app;
