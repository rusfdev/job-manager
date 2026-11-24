import { Module } from "@nestjs/common";
import { VacancyModule } from "@repo/vacancy-core";
import { VacancyController } from "./vacancy.controller.js";

@Module({
  imports: [VacancyModule],
  controllers: [VacancyController],
})
export class VacancyApiModule {}
