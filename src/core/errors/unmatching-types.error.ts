import { TLocation } from '..';
import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';



export class UnmatchingTypesError extends LangKamaError {
  constructor(location: TLocation) {
    super('types do not match', location);

    this.name = 'UnmatchingTypesError';
    this.errno = Errno.UnmatchingTypesError;
  }
}