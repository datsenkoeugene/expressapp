import { Router } from 'express';
import authRoutes from './auth.routes';
import booksRoutes from './books.routes';

const routes: Router[] = [authRoutes, booksRoutes];

export default routes;
