// cookie.service.ts
import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class CookieService {
  setAuthCookie(res: Response, payload: any) {
    const {accessToken,refreshToken,id} = payload;
    
    res.cookie('Authorization', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 2*1000 * 60 * 60 * 24, 
    });

    res.cookie('x-refresh-token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7*1000 * 60 * 60 * 24, 
      });

      res.cookie('x-client-id', id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7*1000 * 60 * 60 * 24, 
      });
  }

  clearAuthCookie(res: Response) {
    res.clearCookie('auth_token');
  }
}
