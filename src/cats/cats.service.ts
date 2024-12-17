import { Injectable, NotFoundException } from '@nestjs/common';

import { CatsRepository } from './cats.repository';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './cat.interfaces';
import { AgeTooYoungException } from 'src/exceptions/age-too-young.exception';

@Injectable()
export class CatsService {
  private MIN_CAT_AGE = 1;

  constructor(private readonly catsRepository: CatsRepository) {}

  registerCat(createCatDto: CreateCatDto) {
    const { nickname, email, password, weight } = createCatDto;
    const birthDate = new Date(createCatDto.birthDate);

    const age = this.calculateAge(birthDate);

    if (age < this.MIN_CAT_AGE) {
      throw new AgeTooYoungException();
    }

    return this.catsRepository.create({
      nickname,
      birthDate,
      email,
      weight,
      password,
    });
  }

  private calculateAge(birthDate: Date): number {
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  getAllCats() {
    return this.catsRepository.findAll();
  }

  updateCat(id: number, updateCatDto: Partial<UpdateCatDto>) {
    const existingCat = this.catsRepository.findOne(id);
    if (!existingCat) {
      throw new NotFoundException(`Cat with ID ${id} not found.`);
    }

    const cat: Partial<Cat> = {
      ...updateCatDto,
      birthDate: existingCat.birthDate,
    };

    if (updateCatDto.birthDate) {
      const birthDate = new Date(updateCatDto.birthDate);
      cat.birthDate = birthDate;
    }

    return this.catsRepository.update(id, cat);
  }
}
