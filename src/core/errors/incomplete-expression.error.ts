import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';



export class IncompleteExpressionError extends LangKamaError {
  constructor(row: number, col: number) {
    super('incomplete expression', row, col);

    this.name = 'IncompleteExpressionError';
    this.errno = Errno.IncompleteExpressionError;
  }
}