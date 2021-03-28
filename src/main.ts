import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { createDocumentation } from "./core/docs/swagger";
import { AllExceptionFilter } from "./core/filters/all-exception.filter";
import { HttpExceptionFilter } from "./core/filters/http-exception.filter";
import { PGExceptionFilter } from "./core/filters/pg-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ["error", "warn", "log"],
  });
  app.setGlobalPrefix("api");
  app.set("trust proxy", true);

  // filters in descending order
  app.useGlobalFilters(
    new AllExceptionFilter(), // 3
    new HttpExceptionFilter(), // 2
    new PGExceptionFilter(), // 1
  );

  createDocumentation(app);

  await app.listen(3000);
}
bootstrap();
