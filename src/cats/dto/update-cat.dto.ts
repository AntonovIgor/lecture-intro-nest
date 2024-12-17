import {
  IsString,
  IsEmail,
  IsDateString,
  IsNumber,
  MinLength,
  IsOptional,
} from 'class-validator';

export class UpdateCatDto {
  @IsOptional()
  @IsString()
  nickname?: string;

  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;
}
