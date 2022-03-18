import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
export class CreateUserDto {
  readonly user_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @ApiProperty() 
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @ApiProperty() 
  @IsNotEmpty()
  @IsString()
  readonly birthDate: string;

  @ApiProperty() 
  @IsNotEmpty()
  @IsString()
  readonly avatar: string;

  @ApiProperty() 
  @IsNotEmpty()
  @IsString()
  readonly boughtvinil: string;
 
  @ApiProperty() 
  @IsNotEmpty()
  @IsString()
  readonly email: string; 

  @ApiProperty() 
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty() 
  @IsNotEmpty()
  @IsString()
  readonly role: string;
}
