import { LangKamaError } from './langkama.error';



export class UnrecognizedTokenError extends LangKamaError {
  constructor(row: number, col: number) {
    super(row, col, 'unrecognized token');
    this.name = 'UnrecognizedTokenError';
  }
}