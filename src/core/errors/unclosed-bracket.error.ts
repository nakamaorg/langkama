import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';
import { TLocation } from '../types/location.type';



export class UnclosedBracketError extends LangKamaError {
  constructor(location: TLocation) {
    super('open bracket was left unclosed', location);

    this.name = 'UnclosedBracketError';
    this.errno = Errno.UnclosedBracketError;
  }
}