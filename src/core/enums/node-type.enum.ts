export enum NodeType {
  Skip = 'Skip',
  Call = 'Call',
  Loop = 'Loop',
  Array = 'Array',
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