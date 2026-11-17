import { Public, SignInService } from "@nestjs/authentication";
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { signInSchema, signUpSchema, type SignInDto, type SignUpDto } from "@repo/shared/contracts";
import { unwrapResult } from "@repo/shared/result";
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
  async signUp(@Body({ schema: signUpSchema }) { email, password }: SignUpDto): Promise<void> {
    const result = await this.commandBus.execute(new CreateUserCommand(email, password));
    const userId = unwrapResult(result);
    await this.signInService.signIn(userId, { method: "password" });
  }

  @Post("sign-in")
  @HttpCode(HttpStatus.NO_CONTENT)
  async signIn(@Body({ schema: signInSchema }) { email, password }: SignInDto): Promise<void> {
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
