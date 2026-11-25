import { AggregateRoot } from "@nestjs/cqrs";
import { err, ok, type Result } from "@repo/common/result";
import type { UserId } from "@repo/contracts/auth";
import { VacancyStatus, type VacancyId, type VacancyTransition } from "@repo/contracts/vacancy";
import { InvalidVacancyTransitionError } from "./errors/invalid-vacancy-transition.error.js";
import {
  VACANCY_TRANSITION_RULES,
  type VacancyTransitionRule,
} from "./vacancy-transition-rules.js";
import type { VacancyUrl } from "./vacancy-url.js";

export interface VacancyProps {
  id: VacancyId;
  ownerId: UserId;
  url: VacancyUrl;
  position: string;
  description: string;
  status: VacancyStatus;
}

export type CreateVacancyProps = Omit<VacancyProps, "status">;

export class Vacancy extends AggregateRoot {
  readonly #id: VacancyId;
  readonly #ownerId: UserId;
  readonly #url: VacancyUrl;
  readonly #position: string;
  readonly #description: string;
  #status: VacancyStatus;

  private constructor(props: VacancyProps) {
    super();
    this.#id = props.id;
    this.#ownerId = props.ownerId;
    this.#url = props.url;
    this.#position = props.position;
    this.#description = props.description;
    this.#status = props.status;
  }

  static create(props: CreateVacancyProps): Vacancy {
    return new Vacancy({
      ...props,
      status: VacancyStatus.enum.NEW,
    });
  }

  static restore(props: VacancyProps): Vacancy {
    return new Vacancy(props);
  }

  get id(): VacancyId {
    return this.#id;
  }

  get ownerId(): UserId {
    return this.#ownerId;
  }

  get url(): VacancyUrl {
    return this.#url;
  }

  get position(): string {
    return this.#position;
  }

  get description(): string {
    return this.#description;
  }

  get status(): VacancyStatus {
    return this.#status;
  }

  isOwnedBy(userId: UserId): boolean {
    return this.#ownerId === userId;
  }

  transition(transition: VacancyTransition): Result<void, InvalidVacancyTransitionError> {
    const { from, to }: VacancyTransitionRule = VACANCY_TRANSITION_RULES[transition];

    if (!from.includes(this.#status)) {
      return err(new InvalidVacancyTransitionError(transition, this.#status));
    }

    this.#status = to;
    return ok();
  }
}
