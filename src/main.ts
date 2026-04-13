import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MultiResultResponseInterceptor } from './common/interceptors/multi-result-response.interceptor';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new MultiResultResponseInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
