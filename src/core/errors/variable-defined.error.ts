import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';



export class VariableDefinedError extends LangKamaError {
  constructor(name: string) {
    super(`variable "${name}" already defined`);

    this.name = 'VariableDefinedError';
    this.errno = Errno.VariableDefinedError;
  }
}