import { Request, Response, NextFunction } from 'express';

const error = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(error.message);
  return response.status(500).send({ message: error.message });
};

export default error;
