import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';



export class InvalidFileError extends LangKamaError {
  constructor(filePath: string) {
    super(`file "${filePath}" is not a valid LangKama script`);
    
    this.name = 'InvalidFileError';
    this.errno = Errno.InvalidFileError;
  }
}