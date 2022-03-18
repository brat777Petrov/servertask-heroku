import { Injectable, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vinils } from './vinil.entity';
import { Reviews } from './review.entity';
import { CreateReviewDto } from './dto/create-dto.review';
import { Repository } from 'typeorm';
import { InitialData } from './migration/initial-data'


@Injectable()
export class VinilService {
  constructor(
    @InjectRepository(Vinils)
    private vinilsRepository: Repository<Vinils>,
    @InjectRepository(Reviews)
    private reviewsRepository: Repository<Reviews>,
    private initial: InitialData,
  ) { }

  async initialMigrationData(): Promise<void> {
    const data = this.initial.init();
    await this.vinilsRepository.query(`
    CREATE TABLE vinils ( 
      vinil_id INT AUTO_INCREMENT PRIMARY KEY, 
      name VARCHAR(255), 
      author VARCHAR(255), 
      description VARCHAR(255), 
      price DOUBLE 
     );  
    `);
    await this.vinilsRepository.query(`
    CREATE TABLE reviews ( 
      review_id INT AUTO_INCREMENT PRIMARY KEY,
      vinil_id INT(11),
      review VARCHAR(255),
      user_id INT(11)
     );  
    `)

    for (let key in data) {
      const d = await this.vinilsRepository.insert(data[key]);
    }
  }

  async create(@Body() body): Promise<Vinils> {
    await this.vinilsRepository.insert(body);
    return body;
  }

  async getAll(): Promise<Vinils[]> {
    return await this.vinilsRepository.find();
  }

  async getName(name: string): Promise<Vinils[]> {
    return await this.vinilsRepository.find({ name: name });
  }

  async getAuthor(author: string): Promise<Vinils[]> {
    return await this.vinilsRepository.find({ author: author });
  }

  async getSortPrice(): Promise<Vinils[]> {
    return await this.vinilsRepository.query("SELECT * FROM vinils ORDER BY price");
  }

  async addReview(body: CreateReviewDto): Promise<CreateReviewDto> {
    await this.reviewsRepository.insert(body);
    
    return body;
  }

}
