import { evaluate } from '../interpreter';
import { Environment } from '../environment';
import { Type } from '../../core/enums/type.enum';
import { NodeType } from '../../core/enums/node-type.enum';
import { IAssignmentNode, IBinaryExpression, IIdentifierNode } from '../../core/types/ast.type';
import { INumberVal, IRuntimeVal, IStringVal, MK_NULL, MK_NUMBER, MK_STRING } from '../../core/types/runtime-values.type';



export function evaluateBinaryExpression(binaryExpression: IBinaryExpression, env: Environment): IRuntimeVal {
  const lhs = evaluate(binaryExpression.left, env);
  const rhs = evaluate(binaryExpression.right, env);

  if (lhs.type !== rhs.type) {
    throw `Can't perform binary operations on different types`;
  }

  switch (lhs.type) {
    case Type.Number: {
      return evaluateNumericBinaryExpression(lhs as INumberVal, rhs as INumberVal, binaryExpression.operator);
    }

    case Type.String: {
      if (binaryExpression.operator === '+') {
        return MK_STRING((lhs as IStringVal).value + (rhs as IStringVal).value);
      } else {
        throw `Invalid operation on string "${binaryExpression.operator}"`;
      }
    }

    default: {
      return MK_NULL();
    }
  }
}

export function evaluateNumericBinaryExpression(lhs: INumberVal, rhs: INumberVal, operator: string): INumberVal {
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

export function evaluateIdentifier(identifier: IIdentifierNode, env: Environment): IRuntimeVal {
  const val = env.getValue(identifier.symbol);
  return val;
}

export function evaluateAssignment(node: IAssignmentNode, env: Environment): IRuntimeVal {
  if (node.assigne.kind !== NodeType.Identifier) {
    throw 'Invalid LHS inside assignment expression';
  }

  const name = (node.assigne as IIdentifierNode).symbol;
  return env.assignVariable(name, evaluate(node.value, env));
}