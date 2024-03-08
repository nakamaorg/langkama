import { Errno } from '../enums/errno.enum';



export class LangKamaError extends Error {

  public errno: Errno;
  private row?: number;
  private col?: number;

  constructor(message: string, row?: number, col?: number) {
    super(message);

    this.row = row;
    this.col = col;

    this.name = 'LangKamaError';
    this.errno = Errno.LangKamaError;
  }

  public toString(): string {
    const loc = (this.row || this.col) ? `${[this.row, this.col].join(':')}` : null;

    return [
      `\t[${this.name}] - ${this.message}.`,
      loc ? `\t${loc} - show line here` : ''
    ].join('\n');
  }
}