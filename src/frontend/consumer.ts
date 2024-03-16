import { LangKamaError, TLocation } from '..';

import { TNullable } from '../core/types/nullable.type';
import { ErrorManager } from '../core/managers/error.manager';
import { TCompareFn } from '../core/types/compare-function.type';
import { TOnErrorCallbackFn } from '../core/types/on-error-callback.type';



/**
 * @description
 * Helps with token/character traversal
 */
export class Consumer<T> {

  /**
   * @description
   * The error manager
   */
  protected errorManager!: ErrorManager;

  /**
   * @description
   * Content to traverse 
  */
  // @ts-ignore
  protected content!: Array<T>;

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
   * The custom compare function
   */
  private compareFn!: <U = any>(a: U, b: T) => boolean;

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
    * @param onError The error callback function
    * @param compareFn The function to use for comparasion
    */
  constructor(content: Array<T>, onError: TOnErrorCallbackFn, compareFn?: TCompareFn) {
    this.initBase(content);
    this.errorManager = new ErrorManager(onError);
    this.compareFn = compareFn ?? ((a, b) => a && a == b);
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
   * @param target The target to check
   * @param error The error to throw
   */
  protected expect<U = any>(target: U, error: LangKamaError): T {
    const currentCTarget = this.eat();

    if (!this.compareFn<U>(target, currentCTarget as T)) {
      this.errorManager.raise(error);
    }

    return currentCTarget as T;
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