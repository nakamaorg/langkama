import { TToken, tokenize } from './lexer';
import { NodeType } from '../core/enums/node-type.enum';
import { TokenType } from '../core/enums/token-type.enum';
import { IAssignmentNode, IBinaryExpression, IExpressionNode, IIdentifierNode, INumberNode, IProgramNode, IStatementNode, IVariableDeclarationNode } from '../core/types/ast.type';



export class Parser {
  private tokens: Array<TToken>;

  constructor() {
    this.tokens = [];
  }

  private at(): TToken {
    return this.tokens[0];
  }

  private eat(): TToken {
    return this.tokens.shift() as TToken;
  }

  private expect(tokenType: TokenType, error: string): TToken {
    const token = this.eat();

    if (!token || token.type !== tokenType) {
      throw `Parser - ${error}, Expected ${tokenType}`;
    }

    return token;
  }

  private notEof(): boolean {
    return this.tokens[0].type !== TokenType.EOF;
  }

  private parseStatement(): IStatementNode {
    switch (this.at().type) {
      case TokenType.Let:
      case TokenType.Const: {
        return this.parseVariableDeclaration();
      }

      default: {
        return this.parseExpression();
      }
    }
  }

  private parseExpression(): IExpressionNode {
    return this.parseAssignmentExpression();
  }

  private parseAssignmentExpression(): IExpressionNode {
    const left = this.parseAdditiveExpression();

    if (this.at().type === TokenType.Equals) {
      this.eat();
      const right = this.parseAssignmentExpression();
      this.expect(TokenType.Dot, 'Assignment must end with a dot');

      return { kind: NodeType.AssignmentExpression, assigne: left, value: right } as IAssignmentNode;
    }

    return left;
  }

  private parseAdditiveExpression(): IExpressionNode {
    let left = this.parseMultiplicativeExpression();

    while (this.at().value === '+' || this.at().value === '-') {
      const operator = this.eat().value;
      const right = this.parseMultiplicativeExpression();

      left = {
        left,
        right,
        operator,
        kind: NodeType.BinaryExpression,
      } as IBinaryExpression
    }

    return left;
  }

  private parseMultiplicativeExpression(): IExpressionNode {
    let left = this.parsePrimaryExpression();

    while (this.at().value === '*' || this.at().value === '/' || this.at().value === '%') {
      const operator = this.eat().value;
      const right = this.parsePrimaryExpression();

      left = {
        left,
        right,
        operator,
        kind: NodeType.BinaryExpression,
      } as IBinaryExpression
    }

    return left;
  }

  private parsePrimaryExpression(): IExpressionNode {
    const tk = this.at().type;

    switch (tk) {
      case TokenType.Identifier: {
        return {
          kind: NodeType.Identifier,
          symbol: this.eat().value
        } as IIdentifierNode;
      }

      case TokenType.Number: {
        return {
          kind: NodeType.Number,
          value: parseFloat(this.eat().value as string)
        } as INumberNode;
      }

      case TokenType.OpenP: {
        this.eat();
        const value = this.parseExpression();
        this.expect(TokenType.CloseP, 'Unclosed parenthesis');

        return value;
      }

      default: {
        throw `Parser - Unexpected token ${JSON.stringify(this.at())}}`;
      }
    }
  }

  private parseVariableDeclaration(): IExpressionNode {
    const isConstant = this.eat().type === TokenType.Const;
    const identifier = this.expect(TokenType.Identifier, 'Expected identifier name').value;

    if (this.at().type === TokenType.Dot) {
      this.eat();

      if (isConstant) {
        throw 'No value provided';
      }

      return { kind: NodeType.VariableDeclaration, identifier, constant: false } as IVariableDeclarationNode;
    }

    this.expect(TokenType.Equals, 'Expected equals token following the identifier in variable declaration');

    const declaration = {
      identifier,
      constant: isConstant,
      value: this.parseExpression(),
      kind: NodeType.VariableDeclaration
    } as IVariableDeclarationNode;

    this.expect(TokenType.Dot, 'Variable declaration must end with a dot');

    return declaration;
  }

  public parse(sourceCode: string): IProgramNode {
    this.tokens = tokenize(sourceCode);

    const program: IProgramNode = {
      kind: NodeType.Program,
      body: []
    }

    while (this.notEof()) {
      program.body.push(this.parseStatement());
    }

    return program;
  }
}