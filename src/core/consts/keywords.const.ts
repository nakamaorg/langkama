import { TokenType } from '../enums/token-type.enum';



export const keywords: Record<string, TokenType> = {
  let: TokenType.Let,
  const: TokenType.Const
}