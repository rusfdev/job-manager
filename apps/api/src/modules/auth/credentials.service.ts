import { PasswordHasher } from "@nestjs/authentication";
import { ConflictException, Injectable } from "@nestjs/common";
import type { SignInDto, SignUpDto, UserDto } from "@repo/shared/contracts";
import { AuthRepository } from "./auth.repository.js";

@Injectable()
export class CredentialsService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async register({ email, password }: SignUpDto): Promise<UserDto> {
    const passwordHash = await this.passwordHasher.hash(password);
    const user = await this.authRepository.create(email, passwordHash);

    if (!user) {
      throw new ConflictException("Email already registered");
    }

    return user;
  }

  async verify({ email, password }: SignInDto): Promise<UserDto | undefined> {
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
