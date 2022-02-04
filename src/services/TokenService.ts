import jwt from 'jsonwebtoken';
import config from '../config/config';
import { getConnection } from '../db/db';
import { User } from '../types/types';

export default class TokenService {
    static async generateTokens(payload: Omit<User, 'id' | 'password'>) {
        const accessToken = await jwt.sign(payload, config.JWT_ACCESS_SECRET!, {
          expiresIn: '2m',
        });
        const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET!);        
        
        getConnection().get('refreshTokens').push(refreshToken).write();

        return {
          accessToken,
          refreshToken,
        };
      }
    
      static async validateAccessToken(token: string) {
        try {
          const userData = await jwt.verify(token, config.JWT_ACCESS_SECRET!);
          return userData;
        } catch (error) {
          return null;
        }
      }
    
      static async validateRefreshToken(token: string) {
        try {
          const userData = await jwt.verify(token, config.JWT_REFRESH_SECRET!);
          return userData;
        } catch (error) {
          return null;
        }
      }
    
}