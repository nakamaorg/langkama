export class LangKamaError extends Error {

  private row: number;
  private col: number;

  constructor(row: number, col: number, message: string) {
    super(message);

    this.row = row;
    this.col = col;

    this.name = 'LangKamaError';
  }

  public toString(): string {
    return [
      `\t[${this.name}] - ${this.message}.`,
      `\t[${this.row}:${this.col}] - show line here`
    ].join('\n');
  }
}