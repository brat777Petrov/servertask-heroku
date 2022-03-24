import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config'
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
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
        clientID: '66787984352-7natlf8u3q0bo0u3r6pl6n3i1dgimk62.apps.googleusercontent.com', //YOUR GOOGLE_CLIENT_ID
        clientSecret: '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', //YOUR GOOGLE_CLIENT_SECRET
        callbackURL:
          'http://localhost:2222/auth/google/callback',
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

  app.use(cookieParser());
  app.use(passport.session())

  await app.init();
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  console.log("server started at port ", port, " ... ");
  await app.listen(port);

}
bootstrap();
