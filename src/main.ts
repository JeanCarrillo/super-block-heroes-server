import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import * as fs from 'fs';

config();

async function bootstrap() {
  if (process.env.HTTPS === 'true') {
    const httpsOptions = {
      key: fs.readFileSync(`${process.env.CERT_PATH}/private-key.pem`),
      cert: fs.readFileSync(`${process.env.CERT_PATH}/public-certificate.pem`),
    };
    const app = await NestFactory.create(AppModule, {
      httpsOptions,
    });
    app.enableCors();
    await app.listen(process.env.PORT);
  } else {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(process.env.PORT);
  }
}
bootstrap();
