import { NodeType } from '../enums/node-type.enum';



export interface IStatementNode {
  kind: NodeType
}

export interface IProgramNode extends IStatementNode {
  kind: NodeType.Program
  body: Array<IStatementNode>
}

export interface IExpressionNode extends IStatementNode { }

export interface IBinaryExpression extends IExpressionNode {
  kind: NodeType.BinaryExpression
  left: IExpressionNode
  right: IExpressionNode
  operator: string
}

export interface IIdentifierNode extends IExpressionNode {
  kind: NodeType.Identifier
  symbole: string
}

export interface INumberNode extends IExpressionNode {
  kind: NodeType.Number
  value: number
}

export interface INullNode extends IExpressionNode {
  kind: NodeType.Null
  value: 'null'
}