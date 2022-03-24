import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';


@Injectable()
export class checkAuth implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
      next()
    } else {
      res.redirect('/login')
    }
  }
}

module.exports = { checkAuth };