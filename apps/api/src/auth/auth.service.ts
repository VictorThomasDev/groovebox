import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async register(_dto: { email: string; password: string; username: string }) {
    // TODO: hash password, create user, return JWT
  }

  async login(_dto: { email: string; password: string }) {
    // TODO: validate credentials, return JWT
  }

  async refresh(_refreshToken: string) {
    // TODO: validate refresh token, return new JWT
  }
}
