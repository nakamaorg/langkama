import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';



export class MissingIdentifierError extends LangKamaError {
  constructor(row: number, col: number) {
    super('missing identifier name', row, col);

    this.name = 'MissingIdentifierError';
    this.errno = Errno.MissingIdentifierError;
  }
}