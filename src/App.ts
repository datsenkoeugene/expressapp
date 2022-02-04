import express, { Application, Router } from 'express';
import cors from 'cors';
import config from './config/config';
import errorMiddleware from './middlewares/errorMiddleware';

export default class App {
  private _app: Application;
  private _port?: number | string;
  private _routes: Router[];

  constructor(routes: Router[]) {
    this._app = express();
    this._port = config.PORT;
    this._routes = routes;
  }

  private useMiddlewares() {
    this._app.use(cors());
    this._app.use(express.json());
    this.useRoutes();
    this._app.use(errorMiddleware);
  }

  private useRoutes() {
    this._routes.forEach((route) => this._app.use('/api', route));
  }

  async init() {
    this.useMiddlewares();
    this._app.listen(this._port);
    console.log(`Server started on ${this._port} port...`);
  }
}
