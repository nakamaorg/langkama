import { NodeType } from '../enums/node-type.enum';



export interface IStatementNode {
  kind: NodeType;
}

export interface IProgramNode extends IStatementNode {
  kind: NodeType.Program;
  body: Array<IStatementNode>;
}

export interface IVariableDeclarationNode extends IStatementNode {
  kind: NodeType.VariableDeclaration;
  constant: boolean;
  identifier: string;
  value?: IExpressionNode;
}

export interface IExpressionNode extends IStatementNode { }

export interface IAssignmentNode extends IExpressionNode {
  kind: NodeType.AssignmentExpression;
  assigne: IExpressionNode;
  value: IExpressionNode;
}

export interface IBinaryExpression extends IExpressionNode {
  kind: NodeType.BinaryExpression;
  left: IExpressionNode;
  right: IExpressionNode;
  operator: string;
}

export interface IIdentifierNode extends IExpressionNode {
  kind: NodeType.Identifier;
  symbol: string;
}

export interface INumberNode extends IExpressionNode {
  kind: NodeType.Number;
  value: number;
}

export interface IStringNode extends IExpressionNode {
  kind: NodeType.String;
  value: string;
}