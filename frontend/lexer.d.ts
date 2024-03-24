import { TToken } from '../core/types/token.type';
import { TOnErrorCallbackFn } from '../core/types/on-error-callback.type';
import { Consumer } from './consumer';
/**
 * @description
 * Tokenizes source code
 */
export declare class Lexer extends Consumer<string> {
    /**
     * @description
     * The array of tokens
     */
    private tokens;
    /**
     * @description
     * Tokenizes a number
     */
    private tokenizeNumber;
    /**
     * @description
     * Tokenizes an identifier
     */
    private tokenizeIdentifier;
    /**
     * @description
     * Creates a token object
     *
     * @param type The type of the token
     * @param value The value of the token
     */
    private createToken;
    /**
     * @description
     * Adds token to the collection of tokens
     *
     * @param type The type of the token
     * @param value The value of the token
     */
    private addToken;
    /**
     * @description
     * Initializes the lexer
     *
     * @param code The source code to process next
     */
    private init;
    /**
     * @description
     * Instantiates a lexer instance
     *
     * @param onError Callback for catching errors
     */
    constructor(onError: TOnErrorCallbackFn);
    /**
     * @description
     * Transform source code into an array of tokens
     *
     * @param code The source code to tokenize
     */
    tokenize(code: string): Array<TToken>;
}
