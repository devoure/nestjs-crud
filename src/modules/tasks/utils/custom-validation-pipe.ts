import { PipeTransform, ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common';

export class CustomValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const parsedValue = parseInt(value);
    if (isNaN(parsedValue)) {
      throw new HttpException("'Id should be of type number'", HttpStatus.BAD_REQUEST);
    }
    return parseInt(value);
  }
}
