import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';
import { TLocation } from '../types/location.type';



export class IncompleteExpressionError extends LangKamaError {
  constructor(localtion: TLocation) {
    super('incomplete expression', localtion);

    this.name = 'IncompleteExpressionError';
    this.errno = Errno.IncompleteExpressionError;
  }
}