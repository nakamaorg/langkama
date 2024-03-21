import { TLocation } from './location.type';
import { NodeType } from '../enums/node-type.enum';



export interface IStatementNode {
  kind: NodeType;
  end: TLocation;
  start: TLocation;
}

export interface ISkipNode extends IStatementNode { }

export interface IProgramNode extends IStatementNode {
  kind: NodeType.Program;
  body: Array<IStatementNode>;
}

export interface IReturnNode extends IStatementNode {
  kind: NodeType.Return;
  value: IExpressionNode;
}

export interface IConditionNode {
  condition?: IExpressionNode;
  body: Array<IStatementNode>;
}

export interface IConditionBlockNode extends IStatementNode {
  kind: NodeType.Condition;
  conditions: Array<IConditionNode>;
}

export interface ILoopNode extends IStatementNode {
  kind: NodeType.Loop;
  condition: IExpressionNode;
  body: Array<IStatementNode>;
}

export interface IVariableDeclarationNode extends IStatementNode {
  array: boolean;
  constant: boolean;
  identifier: string;
  value?: IExpressionNode;
  kind: NodeType.VariableDeclaration;
}

export interface IFunctionDeclarationNode extends IStatementNode {
  kind: NodeType.FunctionDeclaration;
  parameters: Array<string>;
  body: Array<IStatementNode>;
  name: string;
}

export interface IExpressionNode extends IStatementNode { }

export interface IAssignmentNode extends IExpressionNode {
  kind: NodeType.AssignmentExpression;
  assigne: IExpressionNode;
  value: IExpressionNode;
}

export interface IBinaryExpression extends IExpressionNode {
  operator: string;
  left: IExpressionNode;
  right: IExpressionNode;
  kind: NodeType.BinaryExpression;
}

export interface ILoneExpression extends IExpressionNode {
  operator: string;
  expression: IExpressionNode;
  kind: NodeType.LoneExpression;
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

export interface IArrayNode extends IExpressionNode {
  kind: NodeType.Array;
  items: Array<IExpressionNode>;
}

export interface ICallNode extends IExpressionNode {
  kind: NodeType.Call;
  caller: IExpressionNode;
  arguments: Array<IExpressionNode>;
}