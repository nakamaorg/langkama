import { TokenType } from '../enums/token-type.enum';



export const keywords: Record<string, TokenType> = {
  null: TokenType.Null,
  let: TokenType.Identifier
}