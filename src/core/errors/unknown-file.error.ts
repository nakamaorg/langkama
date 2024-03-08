import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';



export class UnknownFileError extends LangKamaError {
  constructor(filePath: string) {
    super(`file "${filePath}" does not exist`);

    this.name = 'UnknownFileError';
    this.errno = Errno.UnknownFileError;
  }
}