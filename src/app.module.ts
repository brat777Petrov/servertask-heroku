import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersModule } from './users/users.module';
import { VinilModule } from './vinil/vinil.module';
import configuration from './config/configuration';
import { AuthModule } from './auth/auth.module'
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { checkAuth } from './Middlewars/checkAuth';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    AuthModule,
    UsersModule,
    VinilModule,
    TypeOrmModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) { }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(checkAuth)
      .forRoutes({ path: 'home', method: RequestMethod.GET });
  }
}
