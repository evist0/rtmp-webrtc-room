import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('sign-up')
  signUp(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signUp(registerUserDto);
  }

  @Post('sign-in')
  signIn(@Body() loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Request() req: { user: { username: string } }) {
    return this.userService.findOne(req.user.username);
  }
}
