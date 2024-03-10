import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';
import { TLocation } from '../types/location.type';



export class UnrecognizedTokenError extends LangKamaError {
  constructor(location: TLocation) {
    super('unrecognized token', location);

    this.name = 'UnrecognizedTokenError';
    this.errno = Errno.UnrecognizedTokenError;
  }
}