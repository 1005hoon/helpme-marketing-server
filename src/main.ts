import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('App');

  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT;

  await app.listen(PORT, () => logger.log(`Server running on port ${PORT}`));
}
bootstrap();
