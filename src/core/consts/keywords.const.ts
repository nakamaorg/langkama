import { TokenType } from '../enums/token-type.enum';



export const keywords: Record<string, TokenType> = {
  'is': TokenType.Equals,
  'bs': TokenType.Comment,
  'reda': TokenType.Return,
  'big if true': TokenType.If,
  'hear me out': TokenType.Let,
  'let me cook': TokenType.Function,
  'a sa7 hear me out': TokenType.Const
}