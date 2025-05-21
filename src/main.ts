import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips unrecognized fields
      forbidNonWhitelisted: true, // throws error for unrecognized fields
      transform: true, // auto-transform payloads to DTO classes
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
