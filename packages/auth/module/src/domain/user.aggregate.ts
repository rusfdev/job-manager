import { AggregateRoot } from "@nestjs/cqrs";
import { type Email, type UserId } from "@repo/auth-common";

export interface UserProps {
  id: UserId;
  email: Email;
  passwordHash: string;
}

export class User extends AggregateRoot {
  readonly #id: UserId;
  readonly #email: Email;
  #passwordHash: string;

  private constructor(props: UserProps) {
    super();
    this.#id = props.id;
    this.#email = props.email;
    this.#passwordHash = props.passwordHash;
  }

  static create(props: UserProps): User {
    return new User(props);
  }

  static restore(props: UserProps): User {
    return new User(props);
  }

  get id(): UserId {
    return this.#id;
  }

  get email(): Email {
    return this.#email;
  }

  get passwordHash(): string {
    return this.#passwordHash;
  }

  changePasswordHash(passwordHash: string): void {
    this.#passwordHash = passwordHash;
  }
}
