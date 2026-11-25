import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import { Public, SignInService } from "@nestjs/authentication";
import { CommandBus } from "@nestjs/cqrs";
import { minutes, Throttle } from "@nestjs/throttler";
import { unwrapResult } from "@repo/common/result";
import { SignInDto, SignUpDto } from "@repo/contracts/auth";
import { CreateUserCommand } from "../application/commands/create-user/create-user.command.js";
import { VerifyCredentialsCommand } from "../application/commands/verify-credentials/verify-credentials.command.js";

@Public()
@Controller("auth")
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly signInService: SignInService,
  ) {}

  @Post("sign-up")
  @HttpCode(HttpStatus.NO_CONTENT)
  async signUp(@Body({ schema: SignUpDto }) { email, password }: SignUpDto): Promise<void> {
    const result = await this.commandBus.execute(new CreateUserCommand(email, password));
    const userId = unwrapResult(result);
    await this.signInService.signIn(userId, { method: "password" });
  }

  @Post("sign-in")
  @HttpCode(HttpStatus.NO_CONTENT)
  @Throttle({ default: { limit: 10, ttl: minutes(15) } })
  async signIn(@Body({ schema: SignInDto }) { email, password }: SignInDto): Promise<void> {
    const result = await this.commandBus.execute(new VerifyCredentialsCommand(email, password));
    const userId = unwrapResult(result);
    await this.signInService.signIn(userId, { method: "password" });
  }

  @Post("sign-out")
  @HttpCode(HttpStatus.NO_CONTENT)
  async signOut(): Promise<void> {
    const isSignedOut = await this.signInService.signOut();
    if (!isSignedOut) throw new UnauthorizedException();
  }
}
