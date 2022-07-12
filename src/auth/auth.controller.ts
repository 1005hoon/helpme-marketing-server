import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { VerificationTokenDto } from './dto/verification-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/google')
  async authenticate(
    @Body() tokenData: VerificationTokenDto,
    @Req() req: Request,
  ) {
    const { cookie, user } = await this.authService.authenticate(
      tokenData.token,
    );

    req.res.setHeader('Set-Cookie', cookie);
    return user;
  }
}
