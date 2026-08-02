import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private users: UsersService,
    private jwt: JwtService,
  ) {}

  async validate(email: string, password: string) {
    const user = await this.users.findOneXEmail(email);
    if (!user) return null;

    const hashedPassword = user.password;
    const passwordMatches = await compare(password, hashedPassword);
    return passwordMatches ? user : null;
  }

  async login(email: string, password: string) {
    const user = await this.validate(email, password);
    if (!user) return null;

    const payload = {
      sub: user.uuid,
      role: user.role,
      restaurantId: user.restaurantId,
    };

    return {
      access_token: this.jwt.sign(payload),
    };
  }
}
