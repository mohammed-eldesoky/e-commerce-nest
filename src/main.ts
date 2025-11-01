import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MongooseExceptionFilter  } from '@common/filters/mongoose-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new MongooseExceptionFilter ());
  await app.listen(process.env.PORT ?? 3000); 
  app.useGlobalPipes(new ValidationPipe());
}
bootstrap();
