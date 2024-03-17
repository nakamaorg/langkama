import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';
import { TLocation } from '../types/location.type';



export class ExpectedOpenBraceError extends LangKamaError {
  constructor(location: TLocation) {
    super('expected open brace', location);
    
    this.name = 'ExpectedOpenBraceError';
    this.errno = Errno.ExpectedOpenBraceError;
  }
}