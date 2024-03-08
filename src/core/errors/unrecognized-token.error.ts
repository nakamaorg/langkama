import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';



export class UnrecognizedTokenError extends LangKamaError {
  constructor(row: number, col: number) {
    super('unrecognized token', row, col);

    this.name = 'UnrecognizedTokenError';
    this.errno = Errno.UnrecognizedTokenError;
  }
}