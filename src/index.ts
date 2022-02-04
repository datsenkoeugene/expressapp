import App from './App';
import { createConnection } from './db/db';
import routes from './routes/routes';

(async () => {
  try {
    createConnection();
    const app = new App(routes);
    await app.init();
  } catch (error) {
    console.log((error as Error).message);
  }
})();
