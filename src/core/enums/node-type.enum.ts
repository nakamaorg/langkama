export enum NodeType {
  Skip = 'Skip',
  Call = 'Call',
  Loop = 'Loop',
  Number = 'Number',
  Return = 'Return',
  String = 'String',
  Program = 'Program',
  Condition = 'Condition',
  Identifier = 'Identifier',
  LoneExpression = 'LoneExpression',
  BinaryExpression = 'BinaryExpression',
  VariableDeclaration = 'VariableDeclaration',
  FunctionDeclaration = 'FunctionDeclaration',
  AssignmentExpression = 'AssignmentExpression'
}