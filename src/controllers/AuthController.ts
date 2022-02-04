import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import AuthService from '../services/AuthService';

export default class AuthController {
  static async login(request: Request, response: Response, next: NextFunction) {
    try {
      const error = validationResult(request);
      if (!error.isEmpty()) {
        return response.status(400).json({ message: error });
      }
      const { email, password } = request.body;
      const user = await AuthService.login(email, password);
      response.send(user);
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }
  static async register(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const error = validationResult(request);
      if (!error.isEmpty()) {
        return response.status(400).json({ message: error });
      }
      const { email, password } = request.body;
      const user = await AuthService.register(email, password);
      response.send(user);
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }

  static async refresh(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { refreshToken } = request.body;

      const user = await AuthService.refresh(refreshToken);

      response.send(user);
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }
  static async logout(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { refreshToken } = request.body;
      const token = await AuthService.logout(refreshToken);
      response.send({ message: token });
    } catch (error) {
      console.log((error as Error).message);
      next(error);
    }
  }
}
