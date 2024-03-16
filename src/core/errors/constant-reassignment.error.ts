import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';



export class ConstantReassignmentError extends LangKamaError {
  constructor(name: string) {
    super(`constant "${name}" can't be reassigned`);

    this.name = 'ConstantReassignmentError';
    this.errno = Errno.ConstantReassignmentError;
  }
}