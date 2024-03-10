import { TNullable } from './nullable.type';
import { TokenType } from '../enums/token-type.enum';
import { TLocation } from './location.type';



export type TToken = {
  type: TokenType
  location: TLocation
  value: TNullable<string>
}