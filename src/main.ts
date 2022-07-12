import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

const allowedOrigins = ['http://localhost:3000'];

async function bootstrap() {
  const logger = new Logger('App');
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    cors: {
      origin: allowedOrigins,
      credentials: true,
    },
  });
  app.use(cookieParser());

  const PORT = process.env.PORT || 8080;
  await app.listen(PORT, () => logger.log(`Server running on port ${PORT}`));
}
bootstrap();
