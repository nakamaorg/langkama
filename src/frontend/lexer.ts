import { Char } from '../core/enums/char.enum';
import { TokenType } from '../core/enums/token-type.enum';

import { TToken } from '../core/types/token.type';
import { TNullable } from '../core/types/nullable.type';

import { keywords } from '../core/consts/keywords.const';
import { CharHelper } from '../core/helpers/char.helper';

import { Base } from './base';
import { UnclosedStringError, UnrecognizedTokenError } from '../core';



/**
 * @description
 * Tokenizes source code
 */
export class Lexer extends Base<string> {

  /**
   * @description
   * The array of tokens
   */
  private tokens!: Array<TToken>;

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
        row: this.location.row,
        col: this.location.col - (value?.length ?? 0)
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
    super.initBase(code.split(''));
    this.tokens = [];
  }

  /**
   * @description
   * Instantiates a lexer instance
   */
  constructor() {
    super([]);
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
              this.jumpLine();
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