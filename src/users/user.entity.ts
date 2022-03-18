import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  user_id: number;

  @ApiProperty() 
  @Column()
  firstName: string;

  @ApiProperty() 
  @Column()
  lastName: string;

  @ApiProperty() 
  @Column()
  birthDate: string;

  @ApiProperty() 
  @Column()
  avatar: string;

  @ApiProperty() 
  @Column()
  boughtvinil: string;
  
  @ApiProperty() 
  @Column()
  email: string;

  @ApiProperty() 
  @Column()
  password: string;
  
  @ApiProperty() 
  @Column()
  role: string;
}