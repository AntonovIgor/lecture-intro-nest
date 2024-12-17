import { HttpException, HttpStatus } from '@nestjs/common';

export class AgeTooYoungException extends HttpException {
  constructor() {
    super('Cats younger than 1 year cannot register.', HttpStatus.BAD_REQUEST);
  }
}
