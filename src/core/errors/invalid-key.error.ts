import { TLocation } from '..';
import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';



export class InvalidKeyError extends LangKamaError {
  constructor(location: TLocation) {
    super('invalid key', location);

    this.name = 'InvalidKeyError';
    this.errno = Errno.InvalidKeyError;
  }
}