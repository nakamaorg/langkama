import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';
import { TLocation } from '../types/location.type';



export class MissingColonError extends LangKamaError {
  constructor(location: TLocation) {
    super('missing colon', location);

    this.name = 'MissingColonError';
    this.errno = Errno.MissingColonError;
  }
}