import { Char } from '../core/enums/char.enum';
import { NodeType } from '../core/enums/node-type.enum';
import { TokenType } from '../core/enums/token-type.enum';

import { LangKamaError, MissingEqualsError, MissingIdentifierError, MissingDotError, UnclosedParenthesisError, UninitializedConstantError, UnrecognizedTokenError, IncompleteExpressionError } from '../core';

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

  /**
   * @description
   * Parses a statement
   */
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

  /**
   * @description
   * Parses an expression
   */
  private parseExpression(): IExpressionNode {
    return this.parseAssignmentExpression();
  }

  /**
   * @description
   * parses an assignment
   */
  private parseAssignmentExpression(): IExpressionNode {
    const left = this.parseAdditiveExpression();

    if (this.at().type === TokenType.Equals) {
      this.eat();
      const right = this.parseAssignmentExpression();
      this.expect(TokenType.Dot, new MissingDotError(this.at().location));

      return {
        value: right,
        assigne: left,
        kind: NodeType.AssignmentExpression,
        end: { row: right.end.row, col: right.end.col },
        start: { row: left.start.row, col: left.start.col }
      } as IAssignmentNode;
    }

    return left;
  }

  /**
   * @description
   * Parses an additive expression
   */
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
        end: { row: right.end.row, col: right.end.col },
        start: { row: left.start.row, col: left.start.col }
      } as IBinaryExpression;
    }

    return left;
  }

  /**
   * @description
   * Parses a multiplicative expression
   */
  private parseMultiplicativeExpression(): IExpressionNode {
    let left = this.parsePrimaryExpression();

    while ([Char.Star, Char.Slash, Char.Percentage].includes(this.at().value as Char)) {
      const operator = this.eat().value;
      const right = this.parsePrimaryExpression();

      left = {
        left,
        right,
        operator,
        kind: NodeType.BinaryExpression,
        end: { row: right.end.row, col: right.end.col },
        start: { row: left.start.row, col: left.start.col }
      } as IBinaryExpression;
    }

    return left;
  }

  /**
   * @description
   * Parses a primary expression
   */
  private parsePrimaryExpression(): IExpressionNode {
    const token = this.at();

    switch (token.type) {
      case TokenType.Identifier: {
        const node = {
          symbol: token.value,
          kind: NodeType.Identifier,
          start: { row: token.location.row, col: token.location.col },
          end: { row: token.location.row, col: token.location.col + (token.value?.length ?? 0) }
        } as IIdentifierNode;

        this.eat();
        return node;
      }

      case TokenType.Number: {
        const node = {
          kind: NodeType.Number,
          value: parseFloat(token.value as string),
          start: { row: token.location.row, col: token.location.col },
          end: { row: token.location.row, col: token.location.col + (token.value?.length ?? 0) }
        } as INumberNode;

        this.eat();
        return node;
      }

      case TokenType.String: {
        const node = {
          kind: NodeType.String,
          value: token.value,
          start: { row: token.location.row, col: token.location.col },
          end: { row: token.location.row, col: token.location.col + (token.value?.length ?? 0) }
        } as IStringNode;

        this.eat();
        return node;
      }

      case TokenType.OpenP: {
        this.eat();
        const value = this.parseExpression();
        this.expect(TokenType.CloseP, new UnclosedParenthesisError(this.at().location));

        return value;
      }

      case TokenType.EOF: {
        throw new IncompleteExpressionError(this.at().location);
      }

      default: {
        throw new UnrecognizedTokenError(this.at().location);
      }
    }
  }

  /**
   * @description
   * Parses a variable declaration
   */
  private parseVariableDeclaration(): IExpressionNode {
    const isConstant = this.eat().type === TokenType.Const;
    const token = this.expect(TokenType.Identifier, new MissingIdentifierError(this.at().location));

    if (this.at().type === TokenType.Dot) {
      this.eat();

      if (isConstant) {
        throw new UninitializedConstantError(this.at().location);
      }

      return {
        constant: false,
        identifier: token.value,
        kind: NodeType.VariableDeclaration,
        start: { row: token.location.row, col: token.location.col },
        end: { row: token.location.row, col: token.location.col + (token.value?.length ?? 0) }
      } as IVariableDeclarationNode;
    }

    this.expect(TokenType.Equals, new MissingEqualsError(this.at().location));

    const valueExpression = this.parseExpression();
    const declaration = {
      constant: isConstant,
      value: valueExpression,
      identifier: token.value,
      kind: NodeType.VariableDeclaration,
      start: { row: token.location.row, col: token.location.col },
      end: { row: token.location.row, col: token.location.col + (token.value?.length ?? 0) + (valueExpression?.end?.col ?? 0) }
    } as IVariableDeclarationNode;

    this.expect(TokenType.Dot, new MissingDotError(this.at().location));

    return declaration;
  }

  /**
   * @description
   * Parses a list of tokens into an AST
   *
   * @param tokens The tokens to parse
   */
  public parse(tokens: Array<TToken>): IProgramNode {
    this.tokens = [...tokens];

    const program: IProgramNode = {
      body: [],
      kind: NodeType.Program,
      end: { row: 0, col: 0 },
      start: { row: 0, col: 0 }
    }

    while (this.notEof()) {
      program.body.push(this.parseStatement());
    }

    return { ...program, end: this.at().location };
  }
}