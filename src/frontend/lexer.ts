import { TToken } from '../core/types/token.type';
import { TNullable } from '../core/types/nullable.type';
import { keywords } from '../core/consts/keywords.const';
import { CherHelper } from '../core/helpers/char.helper';
import { TokenType } from '../core/enums/token-type.enum';
import { UnrecognizedTokenError } from '../core/errors/unrecognized-token.error';



/**
 * @description
 * Tokenizes source code
 */
export class Lexer {

  /**
   * @description
   * Source code to tokenize
  */
  private code!: string;

  /**
   * @description
   * The index where the lexer is currently looking
   */
  private index!: number;

  /**
   * @description
   * The number of the current line
   */
  private row!: number;

  /**
   * @description
   * The number of the current character on the current line
   */
  private col!: number;

  /**
   * @description
   * The array of tokens
   */
  private tokens!: Array<TToken>;

  /**
   * @description
   * Get the current character
   */
  private at(): string {
    return this.code[this.index];
  }

  /**
   * @description
   * Get the current character and advance
   */
  private eat(): TNullable<string> {
    this.col++;
    return this.code[this.index++] ?? null;
  }

  /**
   * @description
   * Creates a token object
   *
   * @param type The type of the token
   * @param value The value of the token
   */
  private createToken(type: TokenType, value?: TNullable<string>): TToken {
    return {
      type,
      row: this.row,
      value: value ?? null,
      col: Math.abs((value?.length ?? 0) - this.col)
    };
  }

  /**
   * @description
   * Adds token to the collection of tokens
   *
   * @param type The type of the token
   * @param value The value of the token
   */
  private addToken(type: TokenType, value?: TNullable<string>): void {
    this.tokens.push(this.createToken(type, value));
  }

  /**
   * @description
   * Initializes the lexer
   *
   * @param code The source code to process next
   */
  private init(code: string = ''): void {
    this.row = 1;
    this.col = 0;
    this.index = 0;
    this.code = code;
    this.tokens = [];
  }

  /**
   * @description
   * Instantiates a lexer instance
   */
  constructor() {
    this.init();
  }

  /**
   * @description
   * Transform source code into an array of tokens
   *
   * @param code The source code to tokenize
   */
  public tokenize(code: string): Array<TToken> {
    this.init(code);

    while (this.at()) {
      switch (this.at()) {
        case '.': {
          this.addToken(TokenType.Dot, this.eat());
          break;
        }

        case '(': {
          this.addToken(TokenType.OpenP, this.eat());
          break;
        }

        case ')': {
          this.addToken(TokenType.CloseP, this.eat());
          break;
        }

        case '=': {
          this.addToken(TokenType.Equals, this.eat());
          break;
        }

        case '+':
        case '-':
        case '*':
        case '/':
        case '%': {
          this.addToken(TokenType.BinaryOp, this.eat());
          break;
        }

        default: {
          if (CherHelper.isNumber(this.at())) {
            let num = '';

            while (this.code.length > 0 && CherHelper.isNumber(this.at())) {
              num += this.eat();
            }

            this.addToken(TokenType.Number, num);
          } else if (CherHelper.isAlpha(this.at())) {
            let ident = '';

            while (this.code.length > 0 && CherHelper.isAlpha(this.at())) {
              ident += this.eat();
            }

            const keys = Object.keys(keywords);
            const key = keys.find(e => e.startsWith(ident)) as string;
            const keyword = keywords[key];

            if (keyword) {
              while (this.code.length > 0 && (CherHelper.isAlpha(this.at()) || CherHelper.isNumber(this.at()) || this.at() === ' ')) {
                if (ident === key) {
                  break;
                }

                ident += this.eat();
              }
            }

            this.addToken(keyword ?? TokenType.Identifier, ident.trim());
          } else if (CherHelper.isSkippable(this.at())) {
            if (this.at() === '\n') {
              this.row++;
              this.col = 0;
            }

            this.eat();
          } else {
            throw new UnrecognizedTokenError(this.row, this.col, this.at());
          }
        }
      }
    }

    this.addToken(TokenType.EOF);

    return this.tokens;
  }
}