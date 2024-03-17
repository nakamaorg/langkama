import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';
import { TLocation } from '../types/location.type';



export class ExpectedCloseBraceError extends LangKamaError {
  constructor(location: TLocation) {
    super('expected close brace', location);
    
    this.name = 'ExpectedCloseBraceError';
    this.errno = Errno.ExpectedCloseBraceError;
  }
}