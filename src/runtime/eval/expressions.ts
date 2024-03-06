import { evaluate } from '../interpreter';
import { Environment } from '../environment';
import { IBinaryExpression, IIdentifierNode } from '../../core/types/ast.type';
import { INumberVal, IRuntimeVal, MK_NULL } from '../../core/types/runtime-values.type';



export function evaluateBinaryExpression(binaryExpression: IBinaryExpression, env: Environment): IRuntimeVal {
  const lhs = evaluate(binaryExpression.left, env);
  const rhs = evaluate(binaryExpression.right, env);

  if (lhs.type === 'number' && rhs.type === 'number') {
    return evaluateNumericBinaryExpression(lhs as INumberVal, rhs as INumberVal, binaryExpression.operator);
  }

  return MK_NULL();
}

export function evaluateNumericBinaryExpression(lhs: INumberVal, rhs: INumberVal, operator: string): INumberVal {
  let result = 0;

  if (operator === '+') {
  }

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

  return { value: result, type: 'number' };
}

export function evaluateIdentifier(identifier: IIdentifierNode, env: Environment): IRuntimeVal {
  const val = env.getValue(identifier.symbol);
  return val;
}