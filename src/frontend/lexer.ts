import { Char } from '../core/enums/char.enum';
import { TokenType } from '../core/enums/token-type.enum';

import { TToken } from '../core/types/token.type';
import { TNullable } from '../core/types/nullable.type';
import { TOnErrorCallbackFn } from '../core/types/on-error-callback.type';

import { keywords } from '../core/consts/keywords.const';
import { CharHelper } from '../core/helpers/char.helper';

import { Consumer } from './consumer';
import { UnclosedStringError, UnrecognizedTokenError } from '../core';



/**
 * @description
 * Tokenizes source code
 */
export class Lexer extends Consumer<string> {

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
      identifier = identifier.split('').filter(e => (e === ' ' || CharHelper.isAlpha(e) || CharHelper.isNumber(e)) || e === Char.ClosePren).join('');
    }

    key = keys.find(e => e === identifier) as string;

    if (keywords[key] === TokenType.Comment) {
      while (this.at() && this.at() !== Char.NewLine) {
        identifier += this.eat();
      }
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
   *
   * @param onError Callback for catching errors
   */
  constructor(onError: TOnErrorCallbackFn) {
    super([], onError);
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
        case Char.Comma: {
          this.addToken(TokenType.Comma, this.eat());
          break;
        }

        case Char.Dot: {
          this.addToken(TokenType.StatementEnd, this.eat());
          break;
        }

        case Char.OpenPren: {
          this.addToken(TokenType.OpenParen, this.eat());
          break;
        }

        case Char.ClosePren: {
          this.addToken(TokenType.CloseParen, this.eat());
          break;
        }

        case Char.OpenBrace: {
          this.addToken(TokenType.OpenBrace, this.eat());
          break;
        }

        case Char.CloseBrace: {
          this.addToken(TokenType.CloseBrace, this.eat());
          break;
        }
       
        case Char.OpenBrack: {
          this.addToken(TokenType.OpenBrack, this.eat());
          break;
        }

        case Char.CloseBrack: {
          this.addToken(TokenType.CloseBrack, this.eat());
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

        case Char.Pipe:
        case Char.Less:
        case Char.Plus:
        case Char.Star:
        case Char.Minus:
        case Char.Slash:
        case Char.Equals:
        case Char.Greater:
        case Char.Ampersand:
        case Char.Percentage: {
          this.addToken(TokenType.BinaryOp, this.eat());
          break;
        }

        case Char.Exclamation: {
          this.addToken(TokenType.LoneOp, this.eat());
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
            this.errorManager.raise(new UnrecognizedTokenError(this.location));
            this.eat();
          }
        }
      }
    }

    this.addToken(TokenType.EOF);
    return this.tokens;
  }
}