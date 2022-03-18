import {
  Controller,
  Request,
  Post,
  Body,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-dto.user';
import { loginUserDto } from './dto/login-dto.user';
import { User } from './user.entity';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  @UsePipes(new ValidationPipe())
  @Post('/registration')
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'The profile of the new user has been successfully created.', type: CreateUserDto })
  async registration(@Body() user: CreateUserDto): Promise<string> {
    await this.usersService.registration(user);
    return "Registration complete"
  }


  @UseGuards(LocalAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('/login')
  @ApiBody({ type: loginUserDto })
  @ApiResponse({ status: 200, description: 'Login user is complited. A token is being generated.', type: loginUserDto })
  @ApiResponse({ status: 401, description: 'User not found or password is not valid.' })
  async login(@Request() req): Promise<string> {
    const user = (await (this.usersService.findOne(req.body.email)));
    const payload = { email: user.email, role: user.role };
    const access_token = this.jwtService.sign(payload);
    return access_token;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/profile')
  @ApiResponse({ status: 200, description: 'Get user profile.' })
  @ApiResponse({ status: 401, description: 'User not found.' })
  async getProfile(@Body('email') email: string): Promise<User> {
    return await this.usersService.findOne(email);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('/update')
  @ApiBody({ type: User })
  @ApiResponse({ status: 200, description: 'The user profile successfully updated.' })
  @ApiResponse({ status: 401, description: 'User not found.' })
  async updateProfile(@Body() data: User): Promise<string> {
    await this.usersService.update(data);
    return "Profile update"
  }

}
