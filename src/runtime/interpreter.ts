import { NodeType } from '../core/enums/node-type.enum';
import { INullVal, INumberVal, IRuntimeVal } from './values';
import { IBinaryExpression, INumberNode, IProgramNode, IStatementNode } from '../core/types/ast.type';



function evaluateProgram(program: IProgramNode): IRuntimeVal {
  let lastEvaluated: IRuntimeVal = { type: 'null', value: 'null' } as INullVal;

  for (const statement of program.body) {
    lastEvaluated = evaluate(statement);
  }

  return lastEvaluated;
}

function evaluateBinaryExpression(binaryExpression: IBinaryExpression): IRuntimeVal {
  const lhs = evaluate(binaryExpression.left);
  const rhs = evaluate(binaryExpression.right);

  if (lhs.type === 'number' && rhs.type === 'number') {
    return evaluateNumericBinaryExpression(lhs as INumberVal, rhs as INumberVal, binaryExpression.operator);
  }

  return { type: 'null', value: 'null' } as INullVal;
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

export function evaluate(node: IStatementNode): IRuntimeVal {
  switch (node.kind) {
    case NodeType.Number: {
      return { type: 'number', value: (node as INumberNode).value } as INumberVal;
    }

    case NodeType.Null: {
      return { value: 'null', type: 'null' } as INullVal;
    }

    case NodeType.BinaryExpression: {
      return evaluateBinaryExpression(node as IBinaryExpression);
    }

    case NodeType.Program: {
      return evaluateProgram(node as IProgramNode);
    }

    default: {
      throw 'AST node has not been setup for interpretation - ' + JSON.stringify(node);
    }
  }
}