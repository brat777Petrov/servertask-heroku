import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return ' Server started .................  https://www.phpmyadmin.co/db_structure.php?server=1&db=sql11479588';
  }
}
