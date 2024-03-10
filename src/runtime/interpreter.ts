import { Environment } from './environment';
import { NodeType } from '../core/enums/node-type.enum';
import { evaluateProgram, evaluateVariableDeclaration } from './eval/statements';
import { IRuntimeVal, MK_NULL, MK_NUMBER, MK_STRING } from '../core/types/runtime-values.type';
import { evaluateAssignment, evaluateBinaryExpression, evaluateIdentifier } from './eval/expressions';
import { IAssignmentNode, IBinaryExpression, IIdentifierNode, INumberNode, IProgramNode, IStatementNode, IStringNode, IVariableDeclarationNode } from '../core/types/ast.type';



export function evaluate(node: IStatementNode, env: Environment): IRuntimeVal {
  switch (node.kind) {
    case NodeType.Skip: {
      return MK_NULL();
    }

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
      throw `AST node has not been setup for interpretation\n -> ${JSON.stringify(node, null, 2)}`;
    }
  }
}