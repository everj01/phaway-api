import { 
  Controller, 
  Body, 
  Post, 
  UnauthorizedException
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto'; // DTO to receive login credentials
import { AuthService } from './auth.service'; // Import AuthService dependency

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const result = await this.authService.login(dto.email, dto.password);
    if (!result) throw new UnauthorizedException('Credenciales inválidas');
    return result;
  }
}
