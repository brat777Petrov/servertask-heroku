
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateVinilDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly vinil_id?: number;

  @ApiProperty()
  @IsString()
  readonly name: string 
  
  @ApiProperty()
  @IsString()
  readonly author: string 


  @ApiProperty()
  @IsString()
  readonly description: string

  @ApiProperty()
  @IsNumber()
  readonly price: number

}