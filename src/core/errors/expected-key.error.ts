import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';
import { TLocation } from '../types/location.type';



export class ExpectedKeyError extends LangKamaError {
  constructor(location: TLocation) {
    super('expected key', location);
    
    this.name = 'ExpectedKeyError';
    this.errno = Errno.ExpectedKeyError;
  }
}