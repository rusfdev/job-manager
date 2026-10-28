import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import { Public, SignInService } from "@nestjs/authentication";
import { signInSchema, signUpSchema, type SignInDto, type SignUpDto } from "@repo/contracts/auth";
import type { User } from "@repo/contracts/user";
import { CredentialsService } from "../credentials.service.js";

@Public()
@Controller("auth")
export class AuthController {
  constructor(
    private readonly credentialsService: CredentialsService,
    private readonly signInService: SignInService,
  ) {}

  @Post("sign-up")
  async signUp(@Body({ schema: signUpSchema }) body: SignUpDto): Promise<User> {
    const user = await this.credentialsService.register(body);
    await this.signInService.signIn(user.id, { method: "password" });
    return user;
  }

  @Post("sign-in")
  @HttpCode(HttpStatus.OK)
  async signIn(@Body({ schema: signInSchema }) body: SignInDto): Promise<User> {
    const user = await this.credentialsService.verify(body);
    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }
    await this.signInService.signIn(user.id, { method: "password" });
    return user;
  }
}
