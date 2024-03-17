import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';
import { TLocation } from '../types/location.type';



export class ExpectedFunctionNameError extends LangKamaError {
  constructor(location: TLocation) {
    super('expected function name', location);
    
    this.name = 'ExpectedFunctionNameError';
    this.errno = Errno.ExpectedFunctionNameError;
  }
}