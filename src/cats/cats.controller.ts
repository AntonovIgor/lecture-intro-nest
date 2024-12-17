import {
  Body,
  Controller,
  HttpCode,
  Post,
  Get,
  Patch,
  Param,
  UsePipes,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';

import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { RemoveUndefinedPipe } from 'src/pipes/remove-undefined.pipe';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';

@Controller('cats')
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post('register')
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true }))
  registerCat(@Body() createCatDto: CreateCatDto) {
    return this.catsService.registerCat(createCatDto);
  }

  @Get()
  getAllCats() {
    return this.catsService.getAllCats();
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }), RemoveUndefinedPipe)
  updateCat(@Param('id') id: number, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.updateCat(id, updateCatDto);
  }
}
