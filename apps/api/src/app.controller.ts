import { Controller, Get } from "@nestjs/common";
import { ConfigService } from "./config/config.service.js";

@Controller()
export class AppController {
  constructor(private readonly config: ConfigService) {}

  @Get()
  getHello() {
    return this.config.port;
  }
}
