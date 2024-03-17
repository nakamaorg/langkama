export enum NodeType {
  Skip = 'Skip',
  Call = 'Call',
  Number = 'Number',
  Return = 'Return',
  String = 'String',
  Object = 'Object',
  Program = 'Program',
  Property = 'Property',
  Identifier = 'Identifier',
  BinaryExpression = 'BinaryExpression',
  VariableDeclaration = 'VariableDeclaration',
  FunctionDeclaration = 'FunctionDeclaration',
  AssignmentExpression = 'AssignmentExpression'
}