import { NodeType } from '../core/enums/node-type.enum';

import { IRuntimeVal, MK_NULL, MK_NUMBER, MK_STRING } from '../core/types/runtime-values.type';
import { IAssignmentNode, IBinaryExpression, IIdentifierNode, INumberNode, IProgramNode, IStatementNode, IStringNode, IVariableDeclarationNode } from '../core/types/ast.type';

import { Environment } from './environment';
import { UnrecognizedStatementError } from '..';
import { evaluateProgram, evaluateVariableDeclaration } from './eval/statements';
import { evaluateAssignment, evaluateBinaryExpression, evaluateIdentifier } from './eval/expressions';




export function evaluate(node: IStatementNode, env: Environment): IRuntimeVal {
  switch (node.kind) {
    case NodeType.Number: {
      return MK_NUMBER((node as INumberNode).value);
    }

    case NodeType.String: {
      return MK_STRING((node as IStringNode).value);
    }

    case NodeType.Identifier: {
      return evaluateIdentifier(node as IIdentifierNode, env);
    }

    case NodeType.AssignmentExpression: {
      return evaluateAssignment(node as IAssignmentNode, env);
    }

    case NodeType.BinaryExpression: {
      return evaluateBinaryExpression(node as IBinaryExpression, env);
    }

    case NodeType.Program: {
      return evaluateProgram(node as IProgramNode, env);
    }

    case NodeType.VariableDeclaration: {
      return evaluateVariableDeclaration(node as IVariableDeclarationNode, env);
    }

    default: {
      env.errorManager?.raise(new UnrecognizedStatementError(node.start));
      return MK_NULL();
    }
  }
}