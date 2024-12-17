import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CatsRepository } from '../cats/cats.repository';
import { Cat } from 'src/cats/cat.interfaces';
import { Payload } from './payload.interface';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private readonly jwtService: JwtService,
  ) {}

  validateCat(loginDto: LoginDto): Cat {
    const cat = this.catsRepository
      .findAll()
      .find((cat) => cat.email === loginDto.email);

    if (cat && cat.password === loginDto.password) {
      return cat;
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  login(cat: Cat) {
    const payload: Payload = { email: cat.email, sub: cat.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
