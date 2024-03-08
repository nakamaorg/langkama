import { LangKamaError } from './langkama.error';



export class UnclosedStringError extends LangKamaError {
  constructor(row: number, col: number) {
    super(row, col, 'unclosed string');
    this.name = 'UnclosedStringError';
  }
}