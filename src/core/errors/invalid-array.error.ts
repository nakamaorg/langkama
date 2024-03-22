import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';



export class InvalidArrayError extends LangKamaError {
  constructor() {
    super('identifier is not a valid array');

    this.name = 'InvalidArrayError';
    this.errno = Errno.InvalidArrayError;
  }
}