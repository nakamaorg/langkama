import { Environment } from './environment';
import { NodeType } from '../core/enums/node-type.enum';
import { INumberVal, IRuntimeVal, MK_NULL } from '../core/types/runtime-values.type';
import { IBinaryExpression, IIdentifierNode, INumberNode, IProgramNode, IStatementNode } from '../core/types/ast.type';



function evaluateProgram(program: IProgramNode, env: Environment): IRuntimeVal {
  let lastEvaluated: IRuntimeVal = MK_NULL();

  for (const statement of program.body) {
    lastEvaluated = evaluate(statement, env);
  }

  return lastEvaluated;
}

function evaluateBinaryExpression(binaryExpression: IBinaryExpression, env: Environment): IRuntimeVal {
  const lhs = evaluate(binaryExpression.left, env);
  const rhs = evaluate(binaryExpression.right, env);

  if (lhs.type === 'number' && rhs.type === 'number') {
    return evaluateNumericBinaryExpression(lhs as INumberVal, rhs as INumberVal, binaryExpression.operator);
  }

  return MK_NULL();
}

function evaluateNumericBinaryExpression(lhs: INumberVal, rhs: INumberVal, operator: string): INumberVal {
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

function evaluateIdentifier(identifier: IIdentifierNode, env: Environment): IRuntimeVal {
  const val = env.getValue(identifier.symbol);
  return val;
}

export function evaluate(node: IStatementNode, env: Environment): IRuntimeVal {
  switch (node.kind) {
    case NodeType.Number: {
      return { type: 'number', value: (node as INumberNode).value } as INumberVal;
    }

    case NodeType.Identifier: {
      return evaluateIdentifier(node as IIdentifierNode, env);
    }

    case NodeType.BinaryExpression: {
      return evaluateBinaryExpression(node as IBinaryExpression, env);
    }

    case NodeType.Program: {
      return evaluateProgram(node as IProgramNode, env);
    }

    default: {
      throw 'AST node has not been setup for interpretation - ' + JSON.stringify(node);
    }
  }
}