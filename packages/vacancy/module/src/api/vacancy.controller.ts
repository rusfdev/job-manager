import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { CurrentUser } from "@nestjs/authentication";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { unwrapResult } from "@repo/common/utils";
import type { Principal } from "@repo/auth-common/contracts";
import {
  CreateVacancyDto,
  TransitionVacancyDto,
  type VacancyCreatedDto,
  type VacancyDto,
  VacancyId,
} from "@repo/vacancy-common";
import { CreateVacancyCommand, ListVacancyQuery, TransitionVacancyCommand } from "../core/index.js";

@Controller("vacancies")
export class VacancyController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  list(@CurrentUser() principal: Principal): Promise<VacancyDto[]> {
    return this.queryBus.execute(new ListVacancyQuery(principal.id));
  }

  @Post()
  async create(
    @CurrentUser() principal: Principal,
    @Body({ schema: CreateVacancyDto }) { url, position, description }: CreateVacancyDto,
  ): Promise<VacancyCreatedDto> {
    const result = await this.commandBus.execute(
      new CreateVacancyCommand(principal.id, url, position, description),
    );
    return { id: unwrapResult(result) };
  }

  @Post(":id/transitions")
  @HttpCode(HttpStatus.NO_CONTENT)
  async transition(
    @CurrentUser() principal: Principal,
    @Param("id", { schema: VacancyId }) id: VacancyId,
    @Body({ schema: TransitionVacancyDto }) { transition }: TransitionVacancyDto,
  ): Promise<void> {
    const result = await this.commandBus.execute(
      new TransitionVacancyCommand(principal.id, id, transition),
    );
    unwrapResult(result);
  }
}
