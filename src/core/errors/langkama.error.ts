export class LangKamaError extends Error {

  private row: number;
  private col: number;

  constructor(row: number, col: number, message: string) {
    super(message);

    this.row = row;
    this.col = col;
  }

  public toString(): string {
    return `[${this.row}:${this.col}] ${this.name} - ${this.message}.`;
  }
}