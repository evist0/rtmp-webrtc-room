import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHmac } from 'crypto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { jwtConstants } from '../config';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const passwordHash = createHmac('sha256', jwtConstants.secret);
    passwordHash.update(registerUserDto.password);

    const createdEvent = new this.userModel({
      username: registerUserDto.username,
      description: registerUserDto.description,
      passwordHash: passwordHash.digest('hex'),
    });

    await createdEvent.save();

    return {
      access_token: this.jwtService.sign({
        username: registerUserDto.username,
      }),
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersService.findOne(loginUserDto.username, true);

    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordHash = createHmac('sha256', jwtConstants.secret);
    passwordHash.update(loginUserDto.password);

    if (passwordHash.digest('hex') !== user.passwordHash) {
      throw new UnauthorizedException();
    }

    return {
      access_token: this.jwtService.sign({
        username: loginUserDto.username,
      }),
    };
  }
}
