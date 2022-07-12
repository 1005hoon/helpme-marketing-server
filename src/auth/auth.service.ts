import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Auth, google } from 'googleapis';
import { User } from 'src/users/user.schema';
import { UsersService } from 'src/users/users.service';
import { ENV_VARS } from 'src/utils/constant';
import { TokenPayload } from './token-payload.interface';

@Injectable()
export class AuthService {
  oauthClient: Auth.OAuth2Client;
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {
    const clientId = this.configService.get(ENV_VARS.GOOGLE_API_CLIENT_ID);
    const clientSecret = this.configService.get(
      ENV_VARS.GOOGLE_API_CLIENT_SECRET,
    );

    this.oauthClient = new google.auth.OAuth2(clientId, clientSecret);
  }

  async authenticate(token: string) {
    const tokenInfo = await this.oauthClient.getTokenInfo(token);
    const email = tokenInfo.email;

    try {
      const user = await this.usersService.getByEmail(email);
      return this.handleRegisteredUser(user);
    } catch (error) {
      if (error.status !== 404) {
        throw new Error(error.message);
      }

      return this.registerUser(token, email);
    }
  }

  handleRegisteredUser(user: User) {
    const cookie = this.getCookiesForUser(user);
    return { cookie, user };
  }

  async registerUser(token: string, email: string) {
    const userData = await this.getUserDataFromGoogle(token);
    const { name, picture } = userData;

    const user = await this.usersService.create({
      email,
      name,
      avatar_url: picture,
    });

    return this.handleRegisteredUser(user);
  }

  async getUserDataFromGoogle(token: string) {
    const userInfoClient = google.oauth2('v2').userinfo;
    this.oauthClient.setCredentials({ access_token: token });

    const userInfoResponse = await userInfoClient.get({
      auth: this.oauthClient,
    });

    return userInfoResponse.data;
  }

  getCookiesForUser(user: User) {
    return this.getCookieWithJwtToken(user._id);
  }

  public getCookieWithJwtToken(userId: string) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }
}
