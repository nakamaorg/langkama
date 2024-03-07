import { keywords } from '../core/consts/keywords.const';
import { TokenType } from '../core/enums/token-type.enum';



export type TToken = {
  value?: string
  type: TokenType
}

function token(type: TokenType, value?: string): TToken {
  return { type, value };
}

function isskippable(src: string) {
  return src === ' ' || src === '\t' || src === '\n' || src === '\r';
}

function isalpha(src: string): boolean {
  return src.toLowerCase() !== src.toUpperCase();
}

function isnumber(src: string): boolean {
  const c = src.charCodeAt(0);
  const bounds = ['0'.charCodeAt(0), '9'.charCodeAt(0)];

  return c >= bounds[0] && c <= bounds[1];
}

export function tokenize(sourceCode: string): Array<TToken> {
  const tokens: Array<TToken> = [];
  const src = sourceCode.split('');

  while (src.length > 0) {
    if (src[0] === '.') {
      tokens.push(token(TokenType.Dot, src.shift()));
    } else if (src[0] === '(') {
      tokens.push(token(TokenType.OpenP, src.shift()));
    } else if (src[0] === ')') {
      tokens.push(token(TokenType.CloseP, src.shift()));
    } else if (src[0] === ')') {
      tokens.push(token(TokenType.CloseP, src.shift()));
    } else if (src[0] === '+' || src[0] === '-' || src[0] === '*' || src[0] === '/' || src[0] === '%') {
      tokens.push(token(TokenType.BinaryOp, src.shift()));
    } else if (src[0] === '=') {
      tokens.push(token(TokenType.Equals, src.shift()));
    } else {
      if (isnumber(src[0])) {
        let num = '';

        while (src.length > 0 && isnumber(src[0])) {
          num += src.shift();
        }

        tokens.push(token(TokenType.Number, num));
      } else if (isalpha(src[0])) {
        let ident = '';

        while (src.length > 0 && isalpha(src[0])) {
          ident += src.shift();
        }

        const keys = Object.keys(keywords);
        const key = keys.find(e => e.startsWith(ident)) as string;
        const keyword = keywords[key];

        if (keyword) {
          while (src.length > 0 && (isalpha(src[0]) || isnumber(src[0]) || src[0] === ' ')) {
            if (ident === key) {
              break;
            }
            
            ident += src.shift();
          }
        }

        tokens.push(token(keyword ?? TokenType.Identifier, ident.trim()));
      } else if (isskippable(src[0])) {
        src.shift();
      } else {
        throw `Unrecognized character ${src[0]}`;
      }
    }
  }

  tokens.push(token(TokenType.EOF));
  return tokens;
}