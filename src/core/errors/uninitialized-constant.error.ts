import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';
import { TLocation } from '../types/location.type';



export class UninitializedConstantError extends LangKamaError {
  constructor(location: TLocation) {
    super('constants should always be initialized', location);
    
    this.name = 'UninitializedConstantError';
    this.errno = Errno.UninitializedConstantError;
  }
}