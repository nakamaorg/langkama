import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';



export class UnclosedParenthesisError extends LangKamaError {
  constructor(row: number, col: number) {
    super('open paranthesis was left unclosed', row, col);

    this.name = 'UnclosedParenthesisError';
    this.errno = Errno.UnclosedParenthesisError;
  }
}