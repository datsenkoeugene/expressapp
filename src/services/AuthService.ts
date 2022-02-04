import { getConnection } from '../db/db';
import bcrypt from 'bcrypt';
import { User } from '../types/types';
import TokenService from './TokenService';

export default class AuthService {
  static async login(email: string, password: string) {    

    const user = getConnection().get('users').find({'email': email}).value();

    if (!user) {
      throw new Error('bad email or password!');
    }

    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw new Error('bad email or password!');
    }

    const userDto: Omit<User, 'id' | 'password'> = {
      email: user.email,
      role: user.role,
    };

    const tokens = await TokenService.generateTokens(userDto);

    return { ...tokens, user: userDto };
  }
  static async register(email: string, password: string) {    

    const candidate = getConnection().get('users').find({'email': email}).value();

    if (candidate) {
      throw new Error('User with the same email already exists');
    }

    const hashPassword = await bcrypt.hash(password, 3);

    const newUser: User = {
      id: getConnection().get('users').value().length + 1,
      email,
      password: hashPassword,
      role: 'user',
    };   

    getConnection().get('users').push(newUser).write();

    const userDto: Omit<User, 'id' | 'password'> = {
      email: newUser.email,
      role: newUser.role,
    };

    const tokens = await TokenService.generateTokens(userDto);

    return { ...tokens, user: userDto };
  }
  
  static async refresh(refreshToken: string) {    

    if (!getConnection().get('refreshTokens').find(t => t === refreshToken).value()) {
      throw new Error('bad token');
    }

    const userData = await TokenService.validateRefreshToken(refreshToken);   

    const user = getConnection().get('users').find({'email': userData!.email}).value();

    const userDto: Omit<User, 'id' | 'password'> = {
      email: user!.email,
      role: user!.role,
    };    

    getConnection().get('refreshTokens').remove(t => t === refreshToken).write();

    const tokens = await TokenService.generateTokens(userDto);

    return { ...tokens, user: userDto };
  }

  static async logout(refreshToken: string) {    
    getConnection().get('refreshTokens').remove(t => t === refreshToken).write();    
    return refreshToken;
  }
}
