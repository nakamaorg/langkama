import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';



export class MissingDotError extends LangKamaError {
  constructor(row: number, col: number) {
    super('statements should end with a dot', row, col);

    this.name = 'MissingDotError';
    this.errno = Errno.MissingDotError;
  }
}