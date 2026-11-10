import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import { Public, SignInService } from "@nestjs/authentication";
import {
  signInSchema,
  signUpSchema,
  type SignInDto,
  type SignUpDto,
  type UserDto,
} from "@repo/contracts";
import { CredentialsService } from "./credentials.service.js";

@Public()
@Controller("auth")
export class AuthController {
  constructor(
    private readonly credentialsService: CredentialsService,
    private readonly signInService: SignInService,
  ) {}

  @Post("sign-up")
  async signUp(@Body({ schema: signUpSchema }) body: SignUpDto): Promise<UserDto> {
    const user = await this.credentialsService.register(body);
    await this.signInService.signIn(user.id, { method: "password" });
    return user;
  }

  @Post("sign-in")
  @HttpCode(HttpStatus.OK)
  async signIn(@Body({ schema: signInSchema }) body: SignInDto): Promise<UserDto> {
    const user = await this.credentialsService.verify(body);
    if (!user) throw new UnauthorizedException("Invalid email or password");
    await this.signInService.signIn(user.id, { method: "password" });
    return user;
  }

  @Post("sign-out")
  @HttpCode(HttpStatus.NO_CONTENT)
  async signOut(): Promise<void> {
    const isSignedOut = await this.signInService.signOut();
    if (!isSignedOut) throw new UnauthorizedException();
  }
}
