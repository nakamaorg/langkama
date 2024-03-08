import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';



export class UnclosedStringError extends LangKamaError {
  constructor(row: number, col: number) {
    super('unclosed string', row, col);
    
    this.name = 'UnclosedStringError';
    this.errno = Errno.UnclosedStringError;
  }
}