import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';
import { TLocation } from '../types/location.type';



export class UnrecognizedStatementError extends LangKamaError {
  constructor(location: TLocation) {
    super('unrecognized statement', location);

    this.name = 'UnrecognizedStatementError';
    this.errno = Errno.UnrecognizedStatementError;
  }
}