import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { ConfigService } from "./config/config.service.js";
import { setupSwagger } from "./swagger/setup-swagger.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.enableShutdownHooks();

  setupSwagger(app);

  await app.listen(config.port);
}

await bootstrap();
