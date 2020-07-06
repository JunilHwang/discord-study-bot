import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(require('cookie-parser')); // 쿠키 사용

  await app.listen(3000);
}
bootstrap();
