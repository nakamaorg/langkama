import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';
import { TLocation } from '../types/location.type';



export class ExpectedIdentifierError extends LangKamaError {
  constructor(location: TLocation) {
    super('expected identifier', location);
    
    this.name = 'ExpectedIdentifierError';
    this.errno = Errno.ExpectedIdentifierError;
  }
}