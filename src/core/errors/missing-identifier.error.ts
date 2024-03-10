import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';
import { TLocation } from '../types/location.type';



export class MissingIdentifierError extends LangKamaError {
  constructor(location: TLocation) {
    super('missing identifier name', location);

    this.name = 'MissingIdentifierError';
    this.errno = Errno.MissingIdentifierError;
  }
}