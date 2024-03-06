export enum TokenType {
  Dot,
  Number,
  Identifier,
  Equals,
  OpenP,
  CloseP,
  BinaryOp,
  Let
}

const keywords: Record<string, TokenType> = {
  let: TokenType.Let
}

export type Token = {
  value: string
  type: TokenType
}

function token(value: string = '', type: TokenType): Token {
  return { value, type };
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

export function tokenize(sourceCode: string): Array<Token> {
  const tokens: Array<Token> = [];
  const src = sourceCode.split('');

  while (src.length > 0) {
    if (src[0] === '.') {
      tokens.push(token(src.shift(), TokenType.Dot));
    }
    else if (src[0] === '(') {
      tokens.push(token(src.shift(), TokenType.OpenP));
    } else if (src[0] === ')') {
      tokens.push(token(src.shift(), TokenType.CloseP));
    } else if (src[0] === ')') {
      tokens.push(token(src.shift(), TokenType.CloseP));
    } else if (src[0] === '+' || src[0] === '-' || src[0] === '*' || src[0] === '/') {
      tokens.push(token(src.shift(), TokenType.BinaryOp));
    } else if (src[0] === '=') {
      tokens.push(token(src.shift(), TokenType.Equals));
    } else {
      if (isnumber(src[0])) {
        let num = '';

        while (src.length > 0 && isnumber(src[0])) {
          num += src.shift();
        }

        tokens.push(token(num, TokenType.Number));
      } else if (isalpha(src[0])) {
        let ident = '';

        while (src.length > 0 && isalpha(src[0])) {
          ident += src.shift();
        }

        tokens.push(token(ident, keywords[ident] ?? TokenType.Identifier));
      } else if (isskippable(src[0])) {
        src.shift();
      } else {
        throw `unrecognized character ${src[0]}`;
      }
    }
  }

  return tokens;
}