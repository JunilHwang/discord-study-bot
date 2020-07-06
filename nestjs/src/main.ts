import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const cookieParser = require('cookie-parser');

  app.use(cookieParser()); // 쿠키 사용

  await app.listen(3000);
}
bootstrap();
