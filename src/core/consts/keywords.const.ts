import { TokenType } from '../enums/token-type.enum';



export const keywords: Record<string, TokenType> = {
  'is': TokenType.Equals,
  'reda': TokenType.Return,
  'hear me out': TokenType.Let,
  'let me cook': TokenType.Function,
  'a sa7 hear me out': TokenType.Const
}