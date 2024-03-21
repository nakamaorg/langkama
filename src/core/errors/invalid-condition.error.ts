import { TLocation } from '..';
import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';



export class InvalidConditionError extends LangKamaError {
  constructor(location: TLocation) {
    super('a jk or sike condition should be preluded by a big if true condition', location);

    this.name = 'InvalidConditionError';
    this.errno = Errno.InvalidConditionError;
  }
}