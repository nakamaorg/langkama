import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';
import { TLocation } from '../types/location.type';



export class MissingDotError extends LangKamaError {
  constructor(location: TLocation) {
    super('statements should end with a dot', location);

    this.name = 'MissingDotError';
    this.errno = Errno.MissingDotError;
  }
}