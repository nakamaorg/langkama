import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';



export class InvalidStringError extends LangKamaError {
  constructor() {
    super('name is not a string');

    this.name = 'InvalidStringError';
    this.errno = Errno.InvalidStringError;
  }
}