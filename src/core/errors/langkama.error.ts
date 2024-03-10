import { Errno } from '../enums/errno.enum';
import { TLocation } from '../types/location.type';



export class LangKamaError extends Error {

  public errno: Errno;
  private code: string;
  private location?: TLocation;

  constructor(message: string, location?: TLocation) {
    super(message);

    this.code = '';
    this.location = location;
    this.name = 'LangKamaError';
    this.errno = Errno.LangKamaError;
  }

  public setCode(code: string): void {
    this.code = code;
  }

  public toString(): string {
    const row = this.location?.row ?? 0;
    const col = this.location?.col ?? 0;

    const loc = (row || col) ? `${[row, col].join(':')}` : null;
    const lines = this.code.split('\n');
    const snippet = lines[row];

    return [
      `  [${this.name}] - ${this.message}.`,
      loc ? `  ${loc} - ${snippet}` : ''
    ].join('\n');
  }
}