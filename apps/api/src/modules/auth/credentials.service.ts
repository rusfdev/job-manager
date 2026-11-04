import { ConflictException, Injectable } from "@nestjs/common";
import { PasswordHasher } from "@nestjs/authentication";
import type { SignInDto, SignUpDto } from "@repo/contracts/auth";
import type { User } from "@repo/contracts/user";
import { AuthRepository } from "./auth.repository.js";

@Injectable()
export class CredentialsService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async register({ email, password }: SignUpDto): Promise<User> {
    const passwordHash = await this.passwordHasher.hash(password);
    const user = await this.authRepository.create(email, passwordHash);

    if (!user) {
      throw new ConflictException("Email already registered");
    }

    return user;
  }

  async verify({ email, password }: SignInDto): Promise<User | undefined> {
    const credentials = await this.authRepository.findCredentials(email);
    const isValid = await this.passwordHasher.verify(password, credentials?.passwordHash);

    if (!credentials || !isValid) return;

    if (this.passwordHasher.needsRehash(credentials.passwordHash)) {
      await this.authRepository.updatePasswordHash(
        credentials.user.id,
        await this.passwordHasher.hash(password),
      );
    }

    return credentials.user;
  }
}
