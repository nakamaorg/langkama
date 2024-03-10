import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';
import { TLocation } from '../types/location.type';



export class UnclosedStringError extends LangKamaError {
  constructor(location: TLocation) {
    super('unclosed string', location);
    
    this.name = 'UnclosedStringError';
    this.errno = Errno.UnclosedStringError;
  }
}