import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { setupSwagger } from "./swagger/setup-swagger.js";
import { appConfig, type AppConfig } from "./config/app.config.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<AppConfig>(appConfig.KEY);

  app.enableShutdownHooks();

  setupSwagger(app);

  await app.listen(config.port);
}

await bootstrap();
