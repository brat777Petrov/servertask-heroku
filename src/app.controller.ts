import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AppService } from './app.service';
const passport = require('passport');

@Controller()
export class AppController {
  constructor(
    private appService: AppService,
  ) { }
  @Get('/')
  main():string {
    console.log('/');
    return "server work ... / ";
  }

  @Get('/login')
  async login(): Promise<string> {
    console.log('/login');
    return '/login';
  }

  @Get('/auth/google')
  async authGoggle () {
    passport.authenticate('google', {
      scope: ['email', 'profile'],
    })
    return '/auth/google';
  }

  @Get('/auth/google/callback')
  async authGoogleCallback(): Promise<string> {
    console.log('/auth/google/callback');
    passport.authenticate('google', {
      failureRedirect: '/login',
      successRedirect: '/home',
    })
    return '/auth/google/callback';
  }

  @Get('/home')
  home():string {
    return "Home page. You're authorized."
  }

}
