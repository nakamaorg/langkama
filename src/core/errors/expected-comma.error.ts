import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';
import { TLocation } from '../types/location.type';



export class ExpectedCommaError extends LangKamaError {
  constructor(location: TLocation) {
    super('expected comma', location);
    
    this.name = 'ExpectedCommaError';
    this.errno = Errno.ExpectedCommaError;
  }
}