import { NodeType } from '../core/enums/node-type.enum';

import { INumberVal, IRuntimeVal, IStringVal, MK_NULL, MK_NUMBER, MK_STRING } from '../core/types/runtime-values.type';
import { IAssignmentNode, IBinaryExpression, IIdentifierNode, INumberNode, IProgramNode, IStatementNode, IStringNode, IVariableDeclarationNode } from '../core/types/ast.type';

import { Environment } from './environment';
import { InvalidAssignmentError, InvalidOperationError, Type, UnmatchingTypesError, UnrecognizedStatementError } from '..';



/**
 * @description
 * Evaluates an AST tree
 */
export class Evaluator {

  /**
   * @description
   * Evaluates a program node
   *
   * @param program The program node
   * @param env The scope of the evaluation
   */
  private evaluateProgram(program: IProgramNode, env: Environment): IRuntimeVal {
    let lastEvaluated: IRuntimeVal = MK_NULL();

    for (const statement of program.body) {
      lastEvaluated = this.evaluate(statement, env);
    }

    return lastEvaluated;
  }

  /**
   * @description
   * Evaluates a declaration statement
   *
   * @param declaration The declaration statement
   * @param env The scope of the evaluation
   */
  private evaluateVariableDeclaration(declaration: IVariableDeclarationNode, env: Environment): IRuntimeVal {
    const value = declaration.value
      ? this.evaluate(declaration.value, env)
      : MK_NULL();

    return env.declareVariable(declaration.identifier, value, declaration.constant);
  }

  /**
   * @description
   * Evaluates a binary expression
   *
   * @param binaryExpression The binary expression to evaluate
   * @param env The scope of the evaluation
   */
  private evaluateBinaryExpression(binaryExpression: IBinaryExpression, env: Environment): IRuntimeVal {
    const lhs = this.evaluate(binaryExpression.left, env);
    const rhs = this.evaluate(binaryExpression.right, env);

    if (lhs.type !== rhs.type) {
      env.errorManager?.raise(new UnmatchingTypesError(binaryExpression.start));
      return MK_NULL();
    }

    switch (lhs.type) {
      case Type.Number: {
        return this.evaluateNumericBinaryExpression(lhs as INumberVal, rhs as INumberVal, binaryExpression.operator);
      }

      case Type.String: {
        if (binaryExpression.operator === '+') {
          return MK_STRING((lhs as IStringVal).value + (rhs as IStringVal).value);
        } else {
          env.errorManager?.raise(new InvalidOperationError(binaryExpression.start));
          return MK_NULL();
        }
      }

      default: {
        return MK_NULL();
      }
    }
  }

  /**
   * @description
   * Evaluates a binary expression
   *
   * @param lhs The left hand assignment
   * @param rhs The right hand assignment
   * @param operator The operator
   */
  private evaluateNumericBinaryExpression(lhs: INumberVal, rhs: INumberVal, operator: string): INumberVal {
    let result = 0;

    switch (operator) {
      case '+': {
        result = lhs.value + rhs.value;
        break;
      }

      case '-': {
        result = lhs.value - rhs.value;
        break;
      }

      case '*': {
        result = lhs.value * rhs.value;
        break;
      }

      case '/': {
        result = lhs.value / rhs.value;
        break;
      }

      case '%': {
        result = lhs.value % rhs.value;
        break;
      }
    }

    return MK_NUMBER(result);
  }

  /**
   * @description
   * Evaluates an identifier
   *
   * @param identifier The identifier to evaluate
   * @param env The scope of the evaluation
   */
  private evaluateIdentifier(identifier: IIdentifierNode, env: Environment): IRuntimeVal {
    const val = env.getValue(identifier.symbol);
    return val.value;
  }

  /**
   * @description
   * Evaluates an assignment expression
   *
   * @param node The assignment node to evaluate
   * @param env The scope of the evaluation
   */
  private evaluateAssignment(node: IAssignmentNode, env: Environment): IRuntimeVal {
    if (node.assigne.kind !== NodeType.Identifier) {
      env.errorManager?.raise(new InvalidAssignmentError(node.start));
      return MK_NULL();
    }

    const name = (node.assigne as IIdentifierNode).symbol;
    return env.assignVariable(name, this.evaluate(node.value, env));
  }

  /**
   * @description
   * Evaluates an AST tree
   *
   * @param node The root of the AST tree
   * @param env The scope to attach to the tree
   */
  public evaluate(node: IStatementNode, env: Environment): IRuntimeVal {
    switch (node.kind) {
      case NodeType.Number: {
        return MK_NUMBER((node as INumberNode).value);
      }

      case NodeType.String: {
        return MK_STRING((node as IStringNode).value);
      }

      case NodeType.Identifier: {
        return this.evaluateIdentifier(node as IIdentifierNode, env);
      }

      case NodeType.AssignmentExpression: {
        return this.evaluateAssignment(node as IAssignmentNode, env);
      }

      case NodeType.BinaryExpression: {
        return this.evaluateBinaryExpression(node as IBinaryExpression, env);
      }

      case NodeType.Program: {
        return this.evaluateProgram(node as IProgramNode, env);
      }

      case NodeType.VariableDeclaration: {
        return this.evaluateVariableDeclaration(node as IVariableDeclarationNode, env);
      }

      default: {
        env.errorManager?.raise(new UnrecognizedStatementError(node.start));
        return MK_NULL();
      }
    }
  }
}