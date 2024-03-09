import { NodeType } from '../core/enums/node-type.enum';
import { TokenType } from '../core/enums/token-type.enum';

import { LangKamaError, MissingEqualsError, MissingIdentifierError, MissingDotError, UnclosedParenthesisError, UninitializedConstantError, UnrecognizedTokenError } from '../core';

import { TToken } from '../core/types/token.type';
import { IAssignmentNode, IBinaryExpression, IExpressionNode, IIdentifierNode, INumberNode, IProgramNode, IStatementNode, IStringNode, IVariableDeclarationNode } from '../core/types/ast.type';



/**
 * @description
 * Helps with parsing the tokens into an AST
 */
export class Parser {

  /**
   * @description
   * The collection of tokens
   */
  private tokens: Array<TToken>;

  /**
   * @description
   * Instantiates a parser instance
   */
  constructor() {
    this.tokens = [];
  }

  /**
   * @description
   * Get the current token
   */
  private at(): TToken {
    return this.tokens[0];
  }

  /**
   * @description
   * Get the current token and advance
   */
  private eat(): TToken {
    return this.tokens.shift() as TToken;
  }

  /**
   * @description
   * Advances while checking if the next token matches with the input token
   *
   * @param char The character to check
   */
  private expect(type: TokenType, error: LangKamaError): TToken {
    const token = this.eat();

    if (!token || token.type !== type) {
      throw error;
    }

    return token;
  }

  /**
   * @description
   * Checks if the end of the file has not been reached yet
   */
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
      this.expect(TokenType.Dot, new MissingDotError(this.at().row, this.at().col));

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

      case TokenType.String: {
        return {
          kind: NodeType.String,
          value: this.eat().value
        } as IStringNode;
      }

      case TokenType.OpenP: {
        this.eat();
        const value = this.parseExpression();
        this.expect(TokenType.CloseP, new UnclosedParenthesisError(this.at().row, this.at().col));

        return value;
      }

      default: {
        throw new UnrecognizedTokenError(this.at().row, this.at().col);
      }
    }
  }

  private parseVariableDeclaration(): IExpressionNode {
    const isConstant = this.eat().type === TokenType.Const;
    const identifier = this.expect(TokenType.Identifier, new MissingIdentifierError(this.at().row, this.at().col)).value;

    if (this.at().type === TokenType.Dot) {
      this.eat();

      if (isConstant) {
        throw new UninitializedConstantError(this.at().row, this.at().col);
      }

      return { kind: NodeType.VariableDeclaration, identifier, constant: false } as IVariableDeclarationNode;
    }

    this.expect(TokenType.Equals, new MissingEqualsError(this.at().row, this.at().col));

    const declaration = {
      identifier,
      constant: isConstant,
      value: this.parseExpression(),
      kind: NodeType.VariableDeclaration
    } as IVariableDeclarationNode;

    this.expect(TokenType.Dot, new MissingDotError(this.at().row, this.at().col));

    return declaration;
  }

  public parse(tokens: Array<TToken>): IProgramNode {
    this.tokens = [...tokens];

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