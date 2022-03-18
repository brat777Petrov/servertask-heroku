import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vinils {
  @ApiProperty() 
  @PrimaryGeneratedColumn()
  vinil_id: number;

  @ApiProperty() 
  @Column()
  name: string 

  @ApiProperty()
  @Column()
  author: string 

  @ApiProperty() 
  @Column()
  description: string

  @ApiProperty() 
  @Column()
  price: number
}