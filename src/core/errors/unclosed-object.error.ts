import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';
import { TLocation } from '../types/location.type';



export class UnclosedObjectError extends LangKamaError {
  constructor(location: TLocation) {
    super('unclosed object', location);
    
    this.name = 'UnclosedObjectError';
    this.errno = Errno.UnclosedObjectError;
  }
}