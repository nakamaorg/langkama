import { Char } from '../core/enums/char.enum';
import { TokenType } from '../core/enums/token-type.enum';

import { TToken } from '../core/types/token.type';
import { TNullable } from '../core/types/nullable.type';
import { TLocation } from '../core/types/location.type';

import { keywords } from '../core/consts/keywords.const';
import { CharHelper } from '../core/helpers/char.helper';

import { LangKamaError, UnclosedStringError, UnrecognizedTokenError } from '../core';



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
   * The number of the line the lexer is currently processing
   */
  private line!: number;

  /**
   * @description
   * The index number of the start of the current line
   */
  private lineOffset!: number;

  /**
   * @description
   * The array of tokens
   */
  private tokens!: Array<TToken>;

  /**
   * @description
   * The location of the character the lexer is currently processing
   */
  private get location(): TLocation {
    return {
      row: this.line,
      col: this.index - this.lineOffset
    };
  }

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
    return this.code[this.index++] ?? null;
  }

  /**
   * @description
   * Advances while checking if the next character matches with an input character
   *
   * @param char The character to check
   * @param error The error to throw
   */
  private expect(char: Char, error: LangKamaError): Char {
    const currentChar = this.eat();

    if (!currentChar || currentChar !== char) {
      throw error;
    }

    return currentChar;
  }

  /**
   * @description
   * Tokenizes a number
   */
  private tokenizeNumber(): void {
    let number = '';

    while (this.at() && CharHelper.isNumber(this.at())) {
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

    while (this.at() && (CharHelper.isAlpha(this.at()) || CharHelper.isNumber(this.at()))) {
      identifier += this.eat();
    }

    const baseIndex = this.index;
    const baseIdentifier = identifier;
    const keys = Object.keys(keywords);

    let key: string = '';

    while (this.at() && (!CharHelper.isSkippable(this.at()) || this.at() === Char.Space)) {
      key = keys.find(e => e.startsWith(identifier)) as string;

      if (identifier === key) {
        break;
      }

      if (!key) {
        this.index = baseIndex;
        identifier = baseIdentifier;

        break;
      }

      identifier += this.eat();
    }

    this.addToken(keywords[key] ?? TokenType.Identifier, identifier);
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
      value: value ?? null,
      location: {
        row: this.line,
        col: this.index - this.lineOffset - (value?.length ?? 0)
      }
    };
  }

  /**
   * @description
   * Adds token to the collection of tokens
   *
   * @param type The type of the token
   * @param value The value of the token
   */
  private addToken(type: TokenType, value?: TNullable<string>): TToken {
    const token = this.createToken(type, value);
    this.tokens.push(token);

    return token;
  }

  /**
   * @description
   * Initializes the lexer
   *
   * @param code The source code to process next
   */
  private init(code: string = ''): void {
    this.line = 0;
    this.index = 0;
    this.code = code;
    this.tokens = [];
    this.lineOffset = 0;
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

        case Char.DoubleQuotes: {
          let string: string = '';
          this.eat();

          while (this.at() && this.at() !== Char.DoubleQuotes && this.at() !== Char.NewLine) {
            string += this.eat();
          }

          const token = this.addToken(TokenType.String, string);
          this.expect(Char.DoubleQuotes, new UnclosedStringError(token.location));

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
          if (CharHelper.isNumber(this.at())) {
            this.tokenizeNumber();
          } else if (CharHelper.isAlpha(this.at())) {
            this.tokenizeIdentifier();
          } else if (CharHelper.isSkippable(this.at())) {
            if (this.at() === Char.NewLine) {
              this.line++;
              this.lineOffset = this.index + 1;
            }

            this.eat();
          } else {
            throw new UnrecognizedTokenError(this.location);
          }
        }
      }
    }

    this.addToken(TokenType.EOF);
    return this.tokens;
  }
}