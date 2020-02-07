import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from '../config.json';
import * as fs from 'fs';

async function bootstrap() {
  if (config.https) {
    const httpsOptions = {
      key: fs.readFileSync(`${config.certPath}/privkey.pem`),
      cert: fs.readFileSync(`${config.certPath}/cert.pem`),
    };
    const app = await NestFactory.create(AppModule, {
      httpsOptions,
    });
    app.enableCors();
    await app.listen(config.port);
  } else {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(config.port);
  }
}
bootstrap();
