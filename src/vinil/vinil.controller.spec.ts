import { Test, TestingModule } from '@nestjs/testing';
import { VinilController } from './vinil.controller';
import { VinilService } from './vinil.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';


describe('VinilController', () => {
  let vinilController: VinilController;
  let vinilService: VinilService;

  const mockVinilsService = {
    getAll: jest.fn(() => []),

    getSortPrice: jest.fn(() => []),

    getName: jest.fn(() => []),

    getAuthor: jest.fn(() => []),

    addReview: jest.fn(() => {
      return {
        "vinil_id": 7,
        "review": "good songs",
        "user_id": 5
      }
    }),

    create: jest.fn(() => {
      return {
        "name":"Звезда по имени Солнце",
        "author":"Цой",
        "description": "альбом 1989",
        "price": 777.77
      }
     }),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '1360s' },
        })
      ],
      providers: [
        VinilController,
        {
          provide: VinilService,
          useValue: mockVinilsService,
        },
      ],
    }).compile();

    vinilController = module.get<VinilController>(VinilController);
  });

  it('Should be defined', () => {
    expect(vinilController).toBeDefined();
  });

  it('getAll: Should return an array of vinils', async () => {
    const result = await vinilController.getAll();
    expect(result).toBeInstanceOf(Array);
    expect(mockVinilsService.getAll).toHaveBeenCalled();
  });

  it('getSortPrice: Should return an array of vinils', async () => {
    const result = await vinilController.getSortPrice();
    expect(result).toBeInstanceOf(Array);
    expect(mockVinilsService.getSortPrice).toHaveBeenCalled();
  });

  it('getName: Should return an array of vinils', async () => {
    const result = await vinilController.getName('name');
    expect(result).toBeInstanceOf(Array);
    expect(mockVinilsService.getName).toHaveBeenCalled();
  });

  it('getAuthor: Should return an array of vinils', async () => {
    const result = await vinilController.getAuthor('author');
    expect(result).toBeInstanceOf(Array);
    expect(mockVinilsService.getAuthor).toHaveBeenCalled();
  });

  it('addReview: Should add review', async () => {
    const body = {
      "vinil_id": 7,
      "review": "good songs",
      "user_id": 5
    }
    const result = await vinilController.addReview(body);
    expect(mockVinilsService.addReview).toHaveBeenCalled();
    expect(result).toHaveProperty('vinil_id', expect.any(Number));
    expect(result).toHaveProperty('vinil_id', body.vinil_id);
    expect(result).toHaveProperty('review', body.review);
    expect(result).toHaveProperty('user_id', expect.any(Number));
    expect(result).toHaveProperty('user_id', body.user_id);
  });

  it('create: Should create vinil', async () => {
    const req = {
        "vinil_id":7,
        "name":"Звезда по имени Солнце",
        "author":"Цой",
        "description": "альбом 1989",
        "price": 777.77
    }
    console. log(req) ;
    const result = await vinilController.create(req);
    expect(mockVinilsService.addReview).toHaveBeenCalled();
    
    expect(result).toHaveProperty('name', req.name);
    expect(result).toHaveProperty('author', req.author);
    expect(result).toHaveProperty('description', req.description);

    expect(result).toHaveProperty('price', expect.any(Number));
    expect(result).toHaveProperty('price', req.price);
  });

})
