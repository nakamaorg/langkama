import { LangKamaError, TLocation } from '..';
import { TNullable } from '../core/types/nullable.type';
import { ErrorManager } from '../core/managers/error.manager';
import { TCompareFn } from '../core/types/compare-function.type';
import { TOnErrorCallbackFn } from '../core/types/on-error-callback.type';
/**
 * @description
 * Helps with token/character traversal
 */
export declare class Consumer<T> {
    /**
     * @description
     * The error manager
     */
    protected errorManager: ErrorManager;
    /**
     * @description
     * Content to traverse
    */
    protected content: Array<T>;
    /**
     * @description
     * The index where the traversal is currently on
     */
    protected index: number;
    /**
     * @description
     * The number of the line the lexer is currently processing
     */
    private line;
    /**
     * @description
     * The index number of the start of the current line
     */
    private lineOffset;
    /**
     * @description
     * The custom compare function
     */
    private compareFn;
    /**
     * @description
     * The location of the character the lexer is currently processing
     */
    protected get location(): TLocation;
    /**
      * @description
      * Instntiates a base frontend instance
      *
      * @param content The content to reset to
      * @param onError The error callback function
      * @param compareFn The function to use for comparasion
      */
    constructor(content: Array<T>, onError: TOnErrorCallbackFn, compareFn?: TCompareFn);
    /**
     * @description
     * Instntiates a base frontend instance
     *
     * @param content The content to reset to
     */
    protected initBase(content: Array<T>): void;
    /**
     * @description
     * Get the current character
     */
    protected at(): T;
    /**
     * @description
     * Get the current character and advance
     */
    protected eat(): TNullable<T>;
    /**
     * @description
     * Advances while checking if the next character matches with an input character
     *
     * @param target The target to check
     * @param error The error to throw
     */
    protected expect<U = any>(target: U, error: LangKamaError): T;
    /**
     * @description
     * Marks the jumping point to the next line
     */
    protected jumpLine(): void;
}
