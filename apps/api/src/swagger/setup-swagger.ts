import type { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder().setVersion("1.0").build();
  SwaggerModule.setup("api", app, () => SwaggerModule.createDocument(app, config));
}
