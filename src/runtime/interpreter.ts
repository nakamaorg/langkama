import { Environment } from './environment';
import { NodeType } from '../core/enums/node-type.enum';
import { IRuntimeVal, MK_NUMBER } from '../core/types/runtime-values.type';
import { evaluateProgram, evaluateVariableDeclaration } from './eval/statements';
import { evaluateAssignment, evaluateBinaryExpression, evaluateIdentifier } from './eval/expressions';
import { IAssignmentNode, IBinaryExpression, IIdentifierNode, INumberNode, IProgramNode, IStatementNode, IVariableDeclarationNode } from '../core/types/ast.type';



export function evaluate(node: IStatementNode, env: Environment): IRuntimeVal {
  switch (node.kind) {
    case NodeType.Number: {
      return MK_NUMBER((node as INumberNode).value);
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