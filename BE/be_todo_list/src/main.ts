import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidatePipe())
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  //swagger configuration
  const config = new DocumentBuilder()
    .setTitle('TodoList')
    .setDescription('todo list curd operation')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  //cors enable
  app.enableCors();
  //port running in 8080
  await app.listen(8080);
}
bootstrap();
