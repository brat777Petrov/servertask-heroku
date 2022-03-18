import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import  'dotenv/config'
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {  
  
  const app = await NestFactory.create(AppModule);
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
