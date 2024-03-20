import { Char } from '../core/enums/char.enum';
import { NodeType } from '../core/enums/node-type.enum';

import { IBooleanVal, IFunctionVal, INativeFunctionVal, INumberVal, IRuntimeVal, IStringVal } from '../core/types/runtime-values.type';
import { IAssignmentNode, IBinaryExpression, ICallNode, IConditionNode, IFunctionDeclarationNode, IIdentifierNode, ILoneExpression, INumberNode, IProgramNode, IReturnNode, IStatementNode, IStringNode, IVariableDeclarationNode } from '../core/types/ast.type';

import { Environment } from './environment';
import { RuntimeHelper } from '../core/helpers/runtime.helper';
import { InvalidAssignmentError, InvalidFunctionError, InvalidOperationError, Type, UnmatchingTypesError, UnrecognizedStatementError } from '..';



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
    let lastEvaluated: IRuntimeVal = RuntimeHelper.createNull();

    for (const statement of program.body) {
      const currVal = this.evaluate(statement, env);

      if (currVal.type !== Type.Skip) {
        lastEvaluated = currVal;
      }
    }

    return lastEvaluated;
  }

  /**
   * @description
   * Evaluates a variable declaration statement
   *
   * @param declaration The declaration statement
   * @param env The scope of the evaluation
   */
  private evaluateVariableDeclaration(declaration: IVariableDeclarationNode, env: Environment): IRuntimeVal {
    const value = declaration.value
      ? this.evaluate(declaration.value, env)
      : RuntimeHelper.createNull();

    return env.declareVariable(declaration.identifier, value, declaration.constant);
  }

  /**
   * @description
   * Evaluates a function declaration statement
   *
   * @param declaration The declaration statement
   * @param env The scope of the evaluation
   */
  private evaluateFunctionDeclaration(declaration: IFunctionDeclarationNode, env: Environment): IRuntimeVal {
    const fn = {
      env,
      type: Type.Function,
      body: declaration.body,
      name: declaration.name,
      parameters: declaration.parameters
    } as IFunctionVal;

    return env.declareVariable(declaration.name, fn, true);
  }

  /**
   * @description
   * Evaluates a condition statement
   *
   * @param ifStatement The condition statement
   * @param env The scope of the evaluation
   */
  private evaluateCondition(ifStatement: IConditionNode, env: Environment): IRuntimeVal {
    const val = this.evaluate(ifStatement.condition, env) as IBooleanVal;

    if (val.value) {
      ifStatement.true.forEach(e => this.evaluate(e, env));
    } else {
      ifStatement.false.forEach(e => this.evaluate(e, env));
    }

    return RuntimeHelper.createSkip();
  }

  /**
   * @description
   * Evaluates a lone expression
   *
   * @param loneExpression The lone expression to evaluate
   * @param env The scope of the evaluation
   */
  private evaluateLoneExpression(loneExpression: ILoneExpression, env: Environment): IRuntimeVal {
    const val = this.evaluate(loneExpression.expression, env) as IBooleanVal;
    return RuntimeHelper.createBoolean(!Boolean(val.value));
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
      return RuntimeHelper.createNull();
    }

    if ([Char.Equals, Char.Greater, Char.Less, Char.Ampersand, Char.Pipe].includes(binaryExpression.operator as Char)) {
      return this.evaluateBooleanBinaryExpression(lhs as INumberVal, rhs as INumberVal, binaryExpression.operator);
    } else {
      switch (lhs.type) {
        case Type.Number: {
          return this.evaluateNumericBinaryExpression(lhs as INumberVal, rhs as INumberVal, binaryExpression.operator);
        }

        case Type.String: {
          if (binaryExpression.operator === '+') {
            return RuntimeHelper.createString((lhs as IStringVal).value + (rhs as IStringVal).value);
          } else {
            env.errorManager?.raise(new InvalidOperationError(binaryExpression.start));
            return RuntimeHelper.createNull();
          }
        }

        default: {
          return RuntimeHelper.createNull();
        }
      }
    }
  }

  /**
   * @description
   * Evaluates a boolean expression
   *
   * @param lhs The left hand assignment
   * @param rhs The right hand assignment
   * @param operator The operator
   */
  private evaluateBooleanBinaryExpression(lhs: INumberVal, rhs: INumberVal, operator: string): IBooleanVal {
    let result = false;

    switch (operator) {
      case Char.Equals: {
        result = lhs.value === rhs.value;
        break;
      }

      case Char.Greater: {
        result = lhs.value > rhs.value;
        break;
      }

      case Char.Less: {
        result = lhs.value < rhs.value;
        break;
      }

      case Char.Ampersand: {
        result = Boolean(lhs.value && rhs.value);
        break;
      }

      case Char.Pipe: {
        result = Boolean(lhs.value || rhs.value);
        break;
      }
    }

    return RuntimeHelper.createBoolean(result);
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
      case Char.Plus: {
        result = lhs.value + rhs.value;
        break;
      }

      case Char.Minus: {
        result = lhs.value - rhs.value;
        break;
      }

      case Char.Star: {
        result = lhs.value * rhs.value;
        break;
      }

      case Char.Slash: {
        result = lhs.value / rhs.value;
        break;
      }

      case Char.Percentage: {
        result = lhs.value % rhs.value;
        break;
      }
    }

    return RuntimeHelper.createNumber(result);
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
   * Evaluates a function
   *
   * @param call The function to evaluate
   * @param env The scope of the evaluation
   */
  private evaluateFunction(call: ICallNode, env: Environment): IRuntimeVal {
    const args = call.arguments.map(e => this.evaluate(e, env));
    const fn = this.evaluate(call.caller, env);

    if (fn.type === Type.NativeFunction) {
      const result = (fn as INativeFunctionVal).call(args, env);
      return result;
    } else if (fn.type === Type.Function) {
      const func = fn as IFunctionVal;
      const scope = new Environment(func.env);

      for (let i = 0; i < func.parameters.length; ++i) {
        const varName = func.parameters[i];
        const varValue = args[i];

        scope.declareVariable(varName, varValue);
      }

      let hasReturn: boolean = false;
      let result: IRuntimeVal = RuntimeHelper.createNull();

      for (const statement of func.body) {
        if (statement.kind !== NodeType.Skip) {
          result = this.evaluate(statement, scope);

          if (statement.kind === NodeType.Return) {
            hasReturn = true;
            break;
          }
        }
      }

      return hasReturn ? result : RuntimeHelper.createNull();
    }

    env.errorManager?.raise(new InvalidFunctionError(call.start));
    return RuntimeHelper.createNull();
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
      return RuntimeHelper.createNull();
    }

    const name = (node.assigne as IIdentifierNode).symbol;
    return env.assignVariable(name, this.evaluate(node.value, env));
  }

  /**
   * @description
   * Evaluates a return statement
   *
   * @param node The return statement
   * @param env The scope of evaluation
   */
  private evaluateReturn(node: IReturnNode, env: Environment): IRuntimeVal {
    const val = this.evaluate(node.value, env) as IStringVal;
    return RuntimeHelper.createValue(val.value);
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
        return RuntimeHelper.createNumber((node as INumberNode).value);
      }

      case NodeType.String: {
        return RuntimeHelper.createString((node as IStringNode).value);
      }

      case NodeType.Identifier: {
        return this.evaluateIdentifier(node as IIdentifierNode, env);
      }

      case NodeType.Call: {
        return this.evaluateFunction(node as ICallNode, env);
      }

      case NodeType.AssignmentExpression: {
        return this.evaluateAssignment(node as IAssignmentNode, env);
      }

      case NodeType.BinaryExpression: {
        return this.evaluateBinaryExpression(node as IBinaryExpression, env);
      }

      case NodeType.LoneExpression: {
        return this.evaluateLoneExpression(node as ILoneExpression, env);
      }

      case NodeType.Program: {
        return this.evaluateProgram(node as IProgramNode, env);
      }

      case NodeType.VariableDeclaration: {
        return this.evaluateVariableDeclaration(node as IVariableDeclarationNode, env);
      }

      case NodeType.FunctionDeclaration: {
        return this.evaluateFunctionDeclaration(node as IFunctionDeclarationNode, env);
      }

      case NodeType.Condition: {
        return this.evaluateCondition(node as IConditionNode, env);
      }

      case NodeType.Skip: {
        return RuntimeHelper.createSkip();
      }

      case NodeType.Return: {
        return this.evaluateReturn(node as IReturnNode, env);
      }

      default: {
        env.errorManager?.raise(new UnrecognizedStatementError(node.start));
        return RuntimeHelper.createNull();
      }
    }
  }
}