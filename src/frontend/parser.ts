import { Char } from '../core/enums/char.enum';
import { NodeType } from '../core/enums/node-type.enum';
import { TokenType } from '../core/enums/token-type.enum';

import { MissingEqualsError, MissingIdentifierError, MissingDotError, UnclosedParenthesisError, UninitializedConstantError, UnrecognizedTokenError, IncompleteExpressionError } from '../core';

import { TToken } from '../core/types/token.type';
import { TOnErrorCallbackFn } from '../core/types/on-error-callback.type';
import { IAssignmentNode, IBinaryExpression, IExpressionNode, IIdentifierNode, INumberNode, IProgramNode, ISkipNode, IStatementNode, IStringNode, IVariableDeclarationNode } from '../core/types/ast.type';

import { Consumer } from './consumer';



/**
 * @description
 * Helps with parsing the tokens into an AST
 */
export class Parser extends Consumer<TToken> {

  /**
   * @description
   * Instantiates a parser instance
   *
   * @param onError Callback for catching errors
   */
  constructor(onError: TOnErrorCallbackFn) {
    super([], onError, (a: TokenType, b: TToken) => (a && a === b.type));
  }

  /**
   * @description
   * Checks if the end of the file has not been reached yet
   */
  private notEof(): boolean {
    return this.at().type !== TokenType.EOF;
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
      const operator = (this.eat() as TToken).value;
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
      const operator = (this.eat() as TToken).value;
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
      case TokenType.Dot: {
        const node = {
          kind: NodeType.Skip,
          end: this.at().location,
          start: this.at().location
        } as ISkipNode;

        this.eat();
        return node;
      }

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
        this.errorManager.raise(new IncompleteExpressionError(this.at().location));

        return {
          kind: NodeType.Skip,
          end: this.at().location,
          start: this.at().location
        } as ISkipNode;
      }

      default: {
        const node = {
          kind: NodeType.Skip,
          end: this.at().location,
          start: this.at().location
        } as ISkipNode;

        this.errorManager.raise(new UnrecognizedTokenError(this.at().location));
        this.eat();

        return node;
      }
    }
  }

  /**
   * @description
   * Parses a variable declaration
   */
  private parseVariableDeclaration(): IExpressionNode {
    const constToken = this.eat() as TToken;
    const isConstant = constToken.type === TokenType.Const;
    const token = this.expect<TokenType>(TokenType.Identifier, new MissingIdentifierError(this.at().location));

    if (this.at().type === TokenType.Dot) {
      const dotToken = this.eat() as TToken;

      if (isConstant) {
        this.errorManager.raise(new UninitializedConstantError(this.at().location));

        return {
          kind: NodeType.Skip,
          end: this.at().location,
          start: this.at().location
        } as ISkipNode;
      }

      return {
        constant: false,
        end: dotToken.location,
        identifier: token.value,
        start: constToken.location,
        kind: NodeType.VariableDeclaration
      } as IVariableDeclarationNode;
    }

    this.expect(TokenType.Equals, new MissingEqualsError(this.at().location));

    const valueExpression = this.parseExpression();
    const declaration = {
      constant: isConstant,
      value: valueExpression,
      identifier: token.value,
      end: valueExpression.end,
      start: constToken.location,
      kind: NodeType.VariableDeclaration
    } as IVariableDeclarationNode;

    this.expect(TokenType.Dot, new MissingDotError(declaration.end));

    return declaration;
  }

  /**
   * @description
   * Parses a list of tokens into an AST
   *
   * @param tokens The tokens to parse
   */
  public parse(tokens: Array<TToken>): IProgramNode {
    this.content = [...tokens];

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