import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
const cookie = require ('cookie-session');

@Injectable()
export class cookieSession implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    cookie({
      secret: 'very secret key'
    })
    next();
  }
}

module.exports = {cookieSession};
