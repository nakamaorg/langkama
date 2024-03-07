import { LangKamaError } from './langkama.error';



export class UnrecognizedTokenError extends LangKamaError {
  constructor(row: number, col: number, token: string) {
    super(row, col, `unrecognized token "${token}"`);
    this.name = 'UnrecognizedTokenError';
  }
}