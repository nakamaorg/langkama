import { TToken } from '../core/types/token.type';
import { TOnErrorCallbackFn } from '../core/types/on-error-callback.type';
import { IProgramNode } from '../core/types/ast.type';
import { Consumer } from './consumer';
/**
 * @description
 * Helps with parsing the tokens into an AST
 */
export declare class Parser extends Consumer<TToken> {
    /**
     * @description
     * Instantiates a parser instance
     *
     * @param onError Callback for catching errors
     */
    constructor(onError: TOnErrorCallbackFn);
    /**
     * @description
     * Checks if the end of the file has not been reached yet
     */
    private notEof;
    /**
     * @description
     * Parses a statement
     */
    private parseStatement;
    /**
     * @description
     * Parses a comment node
     */
    private parseComment;
    /**
     * @description
     * Parses an expression
     */
    private parseExpression;
    /**
     * @description
     * parses an assignment
     */
    private parseAssignmentExpression;
    /**
     * @description
     * Parses lone expressions
     */
    private parseLoneExpression;
    /**
     * @description
     * Parses array expressions
     */
    private parseArray;
    /**
     * @description
     * Parses an additive expression
     */
    private parseAdditiveExpression;
    /**
     * @description
     * Parses a multiplicative expression
     */
    private parseMultiplicativeExpression;
    /**
     * @description
     * Parses function call and primary expressions
     */
    private parseCallPrimaryExpression;
    /**
     * @description
     * Parses array indexing
     *
     * @param identifier The indexable identifier
     */
    private parseIndexingExpression;
    /**
     * @description
     * Parses a function call
     *
     * @param caller The caller function
     */
    private parseCallExpression;
    /**
     * @description
     * Parses function arguments
     */
    private parseArguments;
    /**
     * @description
     * Parses the list of arguments
     */
    private parseArgumentsList;
    /**
     * @description
     * Parses a primary expression
     */
    private parsePrimaryExpression;
    /**
     * @description
     * Parses a variable declaration
     */
    private parseVariableDeclaration;
    /**
     * @description
     * Parses a function declaration
     */
    private parseFunctionDeclaration;
    /**
     * @description
     * Parses a condition statement
     */
    private parseCondition;
    /**
     * @description
     * Parses a while loop
     */
    private parseLoop;
    /**
     * @description
     * Parses the return statement
     */
    private parseReturn;
    /**
     * @description
     * Parses a list of tokens into an AST
     *
     * @param tokens The tokens to parse
     */
    parse(tokens: Array<TToken>): IProgramNode;
}
