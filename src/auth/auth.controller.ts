import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthGuard } from './guards/auth.guard';
import { LoginResponse, User } from './interfaces/login-response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  create(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @UseGuards( AuthGuard )
  @Get()
  findAll( @Request() req: Request ) {
    return this.authService.findAll();
  }

  @UseGuards( AuthGuard )
  @Get('check-token')
  checkToken( @Request() req ): LoginResponse {

    const user = req['user'] as User;

    return {
      user,
      token: this.authService.getJwtToken({ id: user._id })
    };
  }
  
}
