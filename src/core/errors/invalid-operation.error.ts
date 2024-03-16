import { TLocation } from '..';
import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';



export class InvalidOperationError extends LangKamaError {
  constructor(location: TLocation) {
    super('invalid operation', location);

    this.name = 'InvalidOperationError';
    this.errno = Errno.InvalidOperationError;
  }
}