import { Char } from '../core/enums/char.enum';
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
   * Tokenizes a number
   */
  private tokenizeNumber(): void {
    let number = '';

    while (this.at() && CherHelper.isNumber(this.at())) {
      number += this.eat();
    }

    this.addToken(TokenType.Number, number);
  }

  /**
   * @description
   * Tokenizes an identifier
   */
  private tokenizeIdentifier(): void {
    let identifier = '';

    while (this.at() && CherHelper.isAlpha(this.at())) {
      identifier += this.eat();
    }

    const keys = Object.keys(keywords);
    const key = keys.find(e => e.startsWith(identifier)) as string;
    const keyword = keywords[key];

    if (keyword) {
      while (this.at() && (!CherHelper.isSkippable(this.at()) || this.at() === Char.Space)) {
        if (identifier === key) {
          break;
        }

        identifier += this.eat();
      }
    }

    this.addToken(keyword ?? TokenType.Identifier, identifier.trim());
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
        case Char.Dot: {
          this.addToken(TokenType.Dot, this.eat());
          break;
        }

        case Char.OpenP: {
          this.addToken(TokenType.OpenP, this.eat());
          break;
        }

        case Char.CloseP: {
          this.addToken(TokenType.CloseP, this.eat());
          break;
        }

        case Char.Equals: {
          this.addToken(TokenType.Equals, this.eat());
          break;
        }

        case Char.Plus:
        case Char.Minus:
        case Char.Star:
        case Char.Slash:
        case Char.Percentage: {
          this.addToken(TokenType.BinaryOp, this.eat());
          break;
        }

        default: {
          if (CherHelper.isNumber(this.at())) {
            this.tokenizeNumber();
          } else if (CherHelper.isAlpha(this.at())) {
            this.tokenizeIdentifier();
          } else if (CherHelper.isSkippable(this.at())) {
            if (this.at() === Char.NewLine) {
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