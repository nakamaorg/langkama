import { TLocation } from '..';
import { Errno } from '../enums/errno.enum';
import { LangKamaError } from './langkama.error';



export class InvalidAssignmentError extends LangKamaError {
  constructor(location: TLocation) {
    super('invalid assignment', location);

    this.name = 'InvalidAssignmentError';
    this.errno = Errno.InvalidAssignmentError;
  }
}