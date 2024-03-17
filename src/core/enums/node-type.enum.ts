export enum NodeType {
  Skip = 'Skip',
  Call = 'Call',
  Member = 'Member',
  Number = 'Number',
  String = 'String',
  Object = 'Object',
  Program = 'Program',
  Property = 'Property',
  Identifier = 'Identifier',
  BinaryExpression = 'BinaryExpression',
  VariableDeclaration = 'VariableDeclaration',
  AssignmentExpression = 'AssignmentExpression'
}