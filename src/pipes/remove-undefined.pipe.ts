import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class RemoveUndefinedPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value !== 'object' || value === null) {
      return value;
    }

    return Object.keys(value).reduce((acc, key) => {
      if (value[key] !== undefined) {
        acc[key] = value[key];
      }
      return acc;
    }, {});
  }
}