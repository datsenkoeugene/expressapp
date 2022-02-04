import { Router } from 'express';
import BookController from '../controllers/BookController';
import authenticateJWT from '../middlewares/authMiddleware';

const router = Router();

router.get('/books', authenticateJWT, BookController.allBooks);

router.post('/books', authenticateJWT, BookController.addBook);

export default router;