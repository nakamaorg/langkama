import { TToken, tokenize } from './lexer';
import { NodeType } from '../core/enums/node-type.enum';
import { TokenType } from '../core/enums/token-type.enum';
import { IBinaryExpression, IExpressionNode, IIdentifierNode, INumberNode, IProgramNode, IStatementNode } from '../core/types/ast.type';



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
    return this.parseExpression();
  }

  private parseExpression(): IExpressionNode {
    return this.parseAdditiveExpression();
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
        throw `Upexpected token ${this.at()}}`;
      }
    }
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