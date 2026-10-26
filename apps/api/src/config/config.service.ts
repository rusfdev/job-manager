import { Injectable } from "@nestjs/common";
import { ConfigService as NestConfigService } from "@nestjs/config";
import type { Env } from "./env.schema.js";

@Injectable()
export class ConfigService {
  constructor(private readonly config: NestConfigService<Env, true>) {}

  private get<K extends keyof Env>(key: K): Env[K] {
    return this.config.getOrThrow(key, { infer: true });
  }

  get port() {
    return this.get("PORT");
  }

  get database() {
    return {
      url: this.get("DATABASE_URL"),
    };
  }
}
