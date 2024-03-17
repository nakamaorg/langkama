import { TLocation } from '..';
import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';



export class InvalidFunctionError extends LangKamaError {
  constructor(location: TLocation) {
    super('invalid function', location);

    this.name = 'InvalidFunctionError';
    this.errno = Errno.InvalidFunctionError;
  }
}