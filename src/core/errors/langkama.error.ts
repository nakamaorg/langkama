import { Errno } from '../enums/errno.enum';
import { TLocation } from '../types/location.type';



export class LangKamaError extends Error {

  public errno: Errno;
  private location?: TLocation;

  constructor(message: string, location?: TLocation) {
    super(message);

    this.location = location;
    this.name = 'LangKamaError';
    this.errno = Errno.LangKamaError;
  }

  public toString(): string {
    const loc = (this.location?.row || this.location?.col) ? `${[this.location?.row, this.location?.col].join(':')}` : null;

    return [
      `  [${this.name}] - ${this.message}.`,
      loc ? `  ${loc} - show line here` : ''
    ].join('\n');
  }
}