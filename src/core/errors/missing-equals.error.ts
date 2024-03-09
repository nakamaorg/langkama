import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';



export class MissingEqualsError extends LangKamaError {
  constructor(row: number, col: number) {
    super('missing assignment operation', row, col);

    this.name = 'MissingEqualsError';
    this.errno = Errno.MissingEqualsError;
  }
}