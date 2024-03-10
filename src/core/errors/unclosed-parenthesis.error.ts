import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';
import { TLocation } from '../types/location.type';



export class UnclosedParenthesisError extends LangKamaError {
  constructor(location: TLocation) {
    super('open paranthesis was left unclosed', location);

    this.name = 'UnclosedParenthesisError';
    this.errno = Errno.UnclosedParenthesisError;
  }
}