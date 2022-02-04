import { Router } from 'express';
import { check } from 'express-validator';
import AuthController from '../controllers/AuthController';

const router = Router();

router.post(
  '/login',
  [
    check('email', 'invalid email address').isEmail(),
    check(
      'password',
      'password length must be min 6, max 16 characters'
    ).isLength({ min: 6, max: 16 }),
  ],
  AuthController.login
);

router.post(
  '/register',
  [
    check('email', 'invalid email address').isEmail(),
    check(
      'password',
      'password length must be min 6, max 16 characters'
    ).isLength({ min: 6, max: 16 }),
  ],
  AuthController.register
);

router.post('/logout', AuthController.logout);

router.post('/refresh', AuthController.refresh);

export default router;
