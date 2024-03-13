import { LangKamaError, TLocation } from '..';
import { TNullable } from '../core/types/nullable.type';



/**
 * @description
 * Helps with token/character traversal
 */
export class Base<T> {

  /**
   * @description
   * Content to traverse 
  */
  // @ts-ignore
  private content!: Array<T>;

  /**
   * @description
   * The index where the traversal is currently on 
   */
  // @ts-ignore
  protected index!: number;

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
   * The location of the character the lexer is currently processing
   */
  protected get location(): TLocation {
    return {
      row: this.line,
      col: this.index - this.lineOffset
    };
  }

  /**
    * @description
    * Instntiates a base frontend instance
    *
    * @param content The content to reset to
    */
  constructor(content: Array<T>) {
    this.initBase(content);
  }

  /**
   * @description
   * Instntiates a base frontend instance
   *
   * @param content The content to reset to
   */
  protected initBase(content: Array<T>): void {
    this.line = 0;
    this.index = 0;
    this.lineOffset = 0;
    this.content = content;
  }

  /**
   * @description
   * Get the current character
   */
  protected at(): T {
    return this.content[this.index];
  }

  /**
   * @description
   * Get the current character and advance
   */
  protected eat(): TNullable<T> {
    return this.content[this.index++] ?? null;
  }

  /**
   * @description
   * Advances while checking if the next character matches with an input character
   *
   * @param char The character to check
   * @param error The error to throw
   */
  protected expect<U = any>(char: U, error: LangKamaError): U {
    const currentChar = this.eat();

    if (!currentChar || currentChar !== char) {
      throw error;
    }

    return currentChar as U;
  }

  /**
   * @description
   * Marks the jumping point to the next line
   */
  protected jumpLine(): void {
    this.line++;
    this.lineOffset = this.index + 1;
  }
}