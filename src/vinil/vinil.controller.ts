import {
  Body,
  Get,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { VinilService } from './vinil.service';
import { Vinils } from './vinil.entity';
import { CreateReviewDto } from './dto/create-dto.review'
import { Reviews } from './review.entity';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator'
import { RolesGuard } from '../auth/roles.guard'

@ApiTags('vinil')
@Controller('vinil')
export class VinilController {
  constructor(
    private vinilService: VinilService,
  ) { }


  @Get('get-all')
  @ApiResponse({ status: 200, description: 'Get all vinils.', type: [Vinils] })
  async getAll(): Promise<Vinils[]> {
    return await this.vinilService.getAll();
  }

  @Get('sort-price')
  @ApiResponse({ status: 200, description: 'Sort vinyls by price.', type: [Vinils] })
  async getSortPrice(): Promise<Vinils[]> {
    return await this.vinilService.getSortPrice();
  }

  @Post('get-name')
  @ApiResponse({ status: 200, description: 'Get vinyls by name.', type: Vinils })
  @ApiResponse({ status: 404, description: 'Not found.', type: Vinils })
  async getName(@Body('name') name: string): Promise<Vinils[]> {
    return await this.vinilService.getName(name);
  }

  @Post('get-author')
  @ApiResponse({ status: 200, description: 'Get vinyls by author.', type: Vinils })
  async getAuthor(@Body('author') author: string): Promise<Vinils[]> {
    return await this.vinilService.getAuthor(author);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('addreview') 
  @ApiBody({ type: Reviews })
  @ApiResponse({ status: 201, description: 'The new review successfully created.' })
  async addReview(@Body() body: CreateReviewDto): Promise<CreateReviewDto> {
      const result = await this.vinilService.addReview(body);
      const review = {
        "vinil_id": result.vinil_id,
        "review": result.review,
        "user_id": result.user_id
    }
    return review;
  }

  // @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('initialmigration')
  @ApiResponse({ status: 201, description: 'Create "vinils" and "reviews" tables and create 50 new records in the vinil table.' })
  @ApiResponse({ status: 500, description: 'Tables or records have already been created.' })
  async initialMigrationData(): Promise<string> {
    await this.vinilService.initialMigrationData();
    return 'Initial migration completed';
  }

  // @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  @ApiBody({ type: Vinils })
  @ApiResponse({ status: 201, description: 'The new vinil successfully created.' })
  async create(@Body() body: Vinils): Promise<Vinils> {
    return await this.vinilService.create(body);
  }

}
