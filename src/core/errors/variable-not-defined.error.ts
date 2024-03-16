import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';



export class VariableNotDefinedError extends LangKamaError {
  constructor(name: string) {
    super(`variable "${name}" is not defined`);

    this.name = 'VariableNotDefinedError';
    this.errno = Errno.VariableNotDefinedError;
  }
}