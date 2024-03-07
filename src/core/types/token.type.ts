import { TNullable } from './nullable.type';
import { TokenType } from '../enums/token-type.enum';



export type TToken = {
  row: number
  col: number
  type: TokenType
  value: TNullable<string>
}