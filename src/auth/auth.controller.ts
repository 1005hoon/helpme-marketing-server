import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { VerificationTokenDto } from './dto/verification-token.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RequestWithUser } from './request-with-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async me(@Req() req: RequestWithUser) {
    return req.user;
  }

  @Post('/google')
  async login(@Body() tokenData: VerificationTokenDto, @Req() req: Request) {
    const { cookie, user } = await this.authService.authenticate(
      tokenData.token,
    );

    req.res.setHeader('Set-Cookie', cookie);
    return user;
  }
}
