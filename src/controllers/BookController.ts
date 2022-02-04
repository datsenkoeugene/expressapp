import { Request, Response, NextFunction } from 'express';
import { getConnection } from '../db/db';

export default class BookController {
  static async allBooks(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const books = getConnection().get('books').value();
      response.send(books);
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }

  static async addBook(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { role } = request.user;

      if (role !== 'admin') {
        return response.status(403).send({ message: 'add book only admin' });
      }

      const book = request.body;

      getConnection()
        .get('books')
        .push(book)
        .write();
      response.send({ message: 'book added successfully' });
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }
}
