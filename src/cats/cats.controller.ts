import {
  Body,
  Controller,
  HttpCode,
  Post,
  Get,
  Patch,
  Param,
} from '@nestjs/common';

import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post('register')
  @HttpCode(201)
  registerCat(@Body() createCatDto: CreateCatDto) {
    return this.catsService.registerCat(createCatDto);
  }

  @Get()
  getAllCats() {
    return this.catsService.getAllCats();
  }

  @Patch(':id')
  updateCat(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    const idNumber = parseInt(id);
    return this.catsService.updateCat(idNumber, updateCatDto);
  }
}
