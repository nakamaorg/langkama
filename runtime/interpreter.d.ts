import { IRuntimeVal } from '../core/types/runtime-values.type';
import { IStatementNode } from '../core/types/ast.type';
import { Environment } from './environment';
import { TOnStdOutCallbackFn } from '..';
/**
 * @description
 * Evaluates an AST tree
 */
export declare class Evaluator {
    /**
   * @description
   * The stdout callback function
   */
    private onStdoutEventHandler;
    /**
     * @description
     * Evaluates a program node
     *
     * @param program The program node
     * @param env The scope of the evaluation
     */
    private evaluateProgram;
    /**
     * @description
     * Evaluates a variable declaration statement
     *
     * @param declaration The declaration statement
     * @param env The scope of the evaluation
     */
    private evaluateVariableDeclaration;
    /**
     * @description
     * Evaluates a function declaration statement
     *
     * @param declaration The declaration statement
     * @param env The scope of the evaluation
     */
    private evaluateFunctionDeclaration;
    /**
     * @description
     * Evaluates a condition statement
     *
     * @param conditionBlock The condition block statement
     * @param env The scope of the evaluation
     */
    private evaluateConditionBlock;
    /**
     * @description
     * Evaluates a loop statement
     *
     * @param loopStatement The loop statement
     * @param env The scope of the evaluation
     */
    private evaluateLoop;
    /**
     * @description
     * Evaluates a lone expression
     *
     * @param loneExpression The lone expression to evaluate
     * @param env The scope of the evaluation
     */
    private evaluateLoneExpression;
    /**
     * @description
     * Evaluates a binary expression
     *
     * @param binaryExpression The binary expression to evaluate
     * @param env The scope of the evaluation
     */
    private evaluateBinaryExpression;
    /**
     * @description
     * Evaluates a boolean expression
     *
     * @param lhs The left hand assignment
     * @param rhs The right hand assignment
     * @param operator The operator
     */
    private evaluateBooleanBinaryExpression;
    /**
     * @description
     * Evaluates a binary expression
     *
     * @param lhs The left hand assignment
     * @param rhs The right hand assignment
     * @param operator The operator
     */
    private evaluateNumericBinaryExpression;
    /**
     * @description
     * Evaluates an array
     *
     * @param array The array to evaluate
     * @param env The scope of the evaluation
     */
    private evaluateArray;
    /**
     * @description
     * Evaluates an identifier
     *
     * @param identifier The identifier to evaluate
     * @param env The scope of the evaluation
     */
    private evaluateIdentifier;
    /**
     * @description
     * Evaluates an indexable
     *
     * @param array The indexable to evaluate
     * @param env The scope of the evaluation
     */
    private evaluateIndexing;
    /**
     * @description
     * Evaluates a function
     *
     * @param call The function to evaluate
     * @param env The scope of the evaluation
     */
    private evaluateFunction;
    /**
     * @description
     * Evaluates an assignment expression
     *
     * @param node The assignment node to evaluate
     * @param env The scope of the evaluation
     */
    private evaluateAssignment;
    /**
     * @description
     * Evaluates a return statement
     *
     * @param node The return statement
     * @param env The scope of evaluation
     */
    private evaluateReturn;
    /**
     * @description
     * Creates an evaluator instance
     *
     * @param onStdoutEventHandler The stdout event handler function
     */
    constructor(onStdoutEventHandler?: TOnStdOutCallbackFn);
    /**
     * @description
     * Evaluates an AST tree
     *
     * @param node The root of the AST tree
     * @param env The scope to attach to the tree
     */
    evaluate(node: IStatementNode, env: Environment): IRuntimeVal;
}
