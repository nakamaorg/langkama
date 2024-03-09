import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';



export class UninitializedConstantError extends LangKamaError {
  constructor(row: number, col: number) {
    super('constants should always be initialized', row, col);
    
    this.name = 'UninitializedConstantError';
    this.errno = Errno.UninitializedConstantError;
  }
}