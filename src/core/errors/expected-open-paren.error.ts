import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';
import { TLocation } from '../types/location.type';



export class ExpectedOpenParenError extends LangKamaError {
  constructor(location: TLocation) {
    super('expected open parenthesis', location);
    
    this.name = 'ExpectedOpenParenError';
    this.errno = Errno.ExpectedOpenParenError;
  }
}