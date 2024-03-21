import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';
import { TLocation } from '../types/location.type';



export class ExpectedCloseBrackError extends LangKamaError {
  constructor(location: TLocation) {
    super('expected close bracket', location);
    
    this.name = 'ExpectedCloseBrackError';
    this.errno = Errno.ExpectedCloseBrackError;
  }
}