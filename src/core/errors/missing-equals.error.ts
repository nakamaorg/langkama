import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';
import { TLocation } from '../types/location.type';



export class MissingEqualsError extends LangKamaError {
  constructor(location: TLocation) {
    super('missing assignment operation', location);

    this.name = 'MissingEqualsError';
    this.errno = Errno.MissingEqualsError;
  }
}