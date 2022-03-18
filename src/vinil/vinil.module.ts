import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { VinilService } from './vinil.service';
import { VinilController } from './vinil.controller';
import { Vinils } from './vinil.entity';
import { Reviews } from './review.entity';
import { jwtConstants } from '../auth/constants';
import { InitialData } from './migration/initial-data'

@Module({
  imports: [
    TypeOrmModule.forFeature([Vinils, Reviews]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1360s' },
    })
  ],
  providers: [VinilService, InitialData],
  controllers: [VinilController],
  exports: []
})
export class VinilModule { }
