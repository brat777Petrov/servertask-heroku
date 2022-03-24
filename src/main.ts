import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import  'dotenv/config'
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const express = require('express')
const passport = require('passport'),
  session = require('express-session'),
  GoogleStrategy = require('passport-google-oauth')
    .OAuth2Strategy,
  flash = require('connect-flash')

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))


async function bootstrap() {  
  
  const app = await NestFactory.create(AppModule);


  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(session({
    secret: 'you secret key',
    resave: true,
    saveUninitialized: true
  }))
  app.use(flash())
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(
    new GoogleStrategy(
      {
        clientID: '263071930874-r6glmhk96nfm94c9trtc7q0dh4v5h2g8.apps.googleusercontent.com', //YOUR GOOGLE_CLIENT_ID
        clientSecret: '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', //YOUR GOOGLE_CLIENT_SECRET
        callbackURL:
          'http://sleepy-badlands-22966.herokuapp.com/auth/google/callback',
      },
      (accessToken, refreshToken, profile, done) => {
        return done(null, profile)
      }
    )
  )







  const config = new DocumentBuilder()
    .setTitle('Vinil catalog')
    .setDescription('The vinil info')
    .setVersion('1.0')
    .addTag('vinil')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.init();
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  console.log("server started at port ", port, " ... ");
  await app.listen(port);

}
bootstrap();
