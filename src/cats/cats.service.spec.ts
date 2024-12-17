import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';

import { CatsService } from './cats.service';
import { CatsRepository } from './cats.repository';

describe('CatsService', () => {
  let service: CatsService;
  let repository: CatsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatsService, CatsRepository],
    }).compile();

    service = module.get<CatsService>(CatsService);
    repository = module.get<CatsRepository>(CatsRepository);
  });

  describe('registerCat', () => {
    it('should register a cat successfully', () => {
      const catData = {
        nickname: 'Whiskers',
        birthDate: '2020-01-01',
        email: 'whiskers@example.com',
        weight: 5,
        password: 'securepassword',
      };

      jest.spyOn(repository, 'create').mockImplementation((cat) => ({
        ...cat,
        id: 1,
      }));

      const result = service.registerCat(catData);
      expect(result).toEqual({
        id: 1,
        ...catData,
        birthDate: new Date(catData.birthDate),
      });
    });

    it('should throw an error if cat is younger than 1 year', () => {
      const catData = {
        nickname: 'Kitten',
        birthDate: new Date().toISOString(),
        email: 'kitten@example.com',
        weight: 2,
        password: 'securepassword',
      };

      expect(() => service.registerCat(catData)).toThrow(BadRequestException);
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

      jest.spyOn(repository, 'findAll').mockReturnValue(cats);

      expect(service.getAllCats()).toEqual(cats);
    });
  });

  describe('updateCat', () => {
    it('should update a cat successfully', () => {
      const cat = {
        id: 1,
        nickname: 'Whiskers',
        birthDate: new Date(),
        email: 'whiskers@example.com',
        weight: 5,
        password: 'securepassword',
      };
      const updateData = { nickname: 'UpdatedWhiskers' };

      jest.spyOn(repository, 'findOne').mockReturnValue(cat);
      jest
        .spyOn(repository, 'update')
        .mockImplementation((_id, data) => ({ ...cat, ...data }));

      const result = service.updateCat(1, updateData);
      expect(result.nickname).toEqual('UpdatedWhiskers');
    });

    it('should throw an error if cat not found', () => {
      jest.spyOn(repository, 'findOne').mockReturnValue(undefined);

      expect(() => service.updateCat(1, { nickname: 'GhostCat' })).toThrow(
        NotFoundException,
      );
    });
  });
});
