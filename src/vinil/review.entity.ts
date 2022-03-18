import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reviews {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  vinil_id: number

  @ApiProperty() 
  @Column()
  review: string 
 
  @ApiProperty() 
  @Column()
  user_id: number
}