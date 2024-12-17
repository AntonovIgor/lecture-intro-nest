import { Test, TestingModule } from '@nestjs/testing';

import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

describe('CatsController', () => {
  let controller: CatsController;
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        {
          provide: CatsService,
          useValue: {
            registerCat: jest.fn(),
            getAllCats: jest.fn(),
            updateCat: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CatsController>(CatsController);
    service = module.get<CatsService>(CatsService);
  });

  describe('registerCat', () => {
    it('should call service to register a new cat', () => {
      const catData: CreateCatDto = {
        nickname: 'Whiskers',
        birthDate: '2020-01-01',
        email: 'whiskers@example.com',
        weight: 5,
        password: 'securepassword',
      };

      controller.registerCat(catData);
      expect(service.registerCat).toHaveBeenCalledWith(catData);
    });
  });

  describe('getAllCats', () => {
    it('should return an array of cats', () => {
      const cats = [
        {
          id: 1,
          nickname: 'Whiskers',
          birthDate: new Date(),
          email: 'whiskers@example.com',
          weight: 5,
          password: 'securepassword',
        },
      ];

      jest.spyOn(service, 'getAllCats').mockReturnValue(cats);

      expect(controller.getAllCats()).toEqual(cats);
    });
  });

  describe('updateCat', () => {
    it('should call service to update a cat', () => {
      const updateData: UpdateCatDto = { nickname: 'NewName' };

      controller.updateCat('1', updateData);
      expect(service.updateCat).toHaveBeenCalledWith(1, updateData);
    });
  });
});
