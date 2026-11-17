import { NestFactory } from "@nestjs/core";
import { Logger } from "@repo/logger";
import { AppModule } from "./app.module.js";
import { appConfig, type AppConfig } from "./config/app.config.js";
import { setupSwagger } from "./swagger/setup-swagger.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config = app.get<AppConfig>(appConfig.KEY);
  const logger = await app.resolve(Logger);

  app.useLogger(logger);
  app.enableShutdownHooks();

  setupSwagger(app);

  await app.listen(config.port);
}

await bootstrap();
