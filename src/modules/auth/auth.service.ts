import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs'; // Bcrypt library is used for generate encrypted password
import { JwtService } from '@nestjs/jwt'; // JWT library used for authentication/login
import { UsersService } from '../users/users.service'; // Import UsersService dependency

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService, // Inject dependency
    private readonly jwt: JwtService,
  ) {}

  // Validate user credentials
  async validate(email: string, password: string) {
    const user = await this.users.findOneXEmail(email);
    if (!user) return null;

    const hashedPassword = user.password;
    const passwordMatches = await compare(password, hashedPassword);
    return passwordMatches ? user : null;
  }

  // Generate JWT Access Token if user credentials are valid, null otherwise
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
