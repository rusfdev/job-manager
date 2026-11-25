import { Module } from "@nestjs/common";
import { VacancyModule } from "../core/index.js";
import { VacancyController } from "./vacancy.controller.js";

@Module({
  imports: [VacancyModule],
  controllers: [VacancyController],
})
export class VacancyApiModule {}
