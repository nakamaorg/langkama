export enum NodeType {
  Skip = 'Skip',
  Call = 'Call',
  Number = 'Number',
  Return = 'Return',
  String = 'String',
  Program = 'Program',
  Identifier = 'Identifier',
  LoneExpression = 'LoneExpression',
  BinaryExpression = 'BinaryExpression',
  VariableDeclaration = 'VariableDeclaration',
  FunctionDeclaration = 'FunctionDeclaration',
  AssignmentExpression = 'AssignmentExpression'
}