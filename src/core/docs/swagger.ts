import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function createDocumentation(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle("EcoBeko REST API reference")
    .setDescription("EcoBeko API")
    .setVersion("2.0")
    .addTag("auth")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);
}
