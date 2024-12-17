import {
  IsString,
  IsEmail,
  IsDateString,
  IsNumber,
  MinLength,
  IsNotEmpty,
} from 'class-validator';

export class CreateCatDto {
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsDateString()
  birthDate: string;

  @IsEmail()
  email: string;

  @IsNumber()
  weight: number;

  @IsString()
  @MinLength(6)
  password: string;
}
