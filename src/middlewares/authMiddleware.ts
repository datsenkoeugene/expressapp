import { Request, Response, NextFunction } from 'express';
import TokenService from '../services/TokenService';
import { User } from '../types/types';

declare global {
  namespace Express {
    interface Request {
      user: Omit<User, 'id' | 'password'>;
    }
  }
}

const authenticateJWT = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization;  
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const user = await TokenService.validateAccessToken(token);
    if (user) {
      request.user = user as Omit<User, 'id' | 'password'>;
      next();
    } else {
      response.status(403).send({ message: 'User not logged in' });
    }
  }
};

export default authenticateJWT;
