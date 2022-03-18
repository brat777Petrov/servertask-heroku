import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateReviewDto {

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
 
   readonly vinil_id: number

  @ApiProperty() 
  @IsNotEmpty()
  @IsString() 
  readonly review: string 

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly user_id: number
}

