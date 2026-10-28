import { Controller, HttpCode, HttpStatus, Post, UnauthorizedException } from "@nestjs/common";
import { Public, SignInService } from "@nestjs/authentication";

@Controller("auth")
export class SessionController {
  constructor(private readonly signInService: SignInService) {}

  @Public()
  @Post("sign-out")
  @HttpCode(HttpStatus.NO_CONTENT)
  async signOut(): Promise<void> {
    const isSignedOut = await this.signInService.signOut();
    if (!isSignedOut) {
      throw new UnauthorizedException();
    }
  }
}
