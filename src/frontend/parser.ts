import { Char } from '../core/enums/char.enum';
import { NodeType } from '../core/enums/node-type.enum';
import { TokenType } from '../core/enums/token-type.enum';

import { MissingEqualsError, MissingIdentifierError, MissingDotError, UnclosedParenthesisError, UninitializedConstantError, UnrecognizedTokenError, IncompleteExpressionError, UnclosedObjectError, ExpectedKeyError, MissingColonError, ExpectedCommaError, ExpectedOpenParenError, InvalidKeyError, UnclosedBracketError, ExpectedFunctionNameError, ExpectedIdentifierError, ExpectedOpenBraceError, ExpectedCloseBraceError } from '../core';

import { TToken } from '../core/types/token.type';
import { TOnErrorCallbackFn } from '../core/types/on-error-callback.type';
import { IAssignmentNode, IBinaryExpression, ICallNode, IExpressionNode, IFunctionDeclarationNode, IIdentifierNode, IMemberNode, INumberNode, IObjectNode, IProgramNode, IPropertyNode, ISkipNode, IStatementNode, IStringNode, IVariableDeclarationNode } from '../core/types/ast.type';

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
    super([], onError, (a: TokenType, b: TToken) => (Boolean(a) && a === b.type));
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

      case TokenType.Function: {
        return this.parseFunctionDeclaration();
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
    const left = this.parseObjectExpression();

    if (this.at().type === TokenType.Equals) {
      this.eat();
      const right = this.parseAssignmentExpression();
      this.expect(TokenType.Semicolon, new MissingDotError(this.at().location));

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

  private parseObjectExpression(): IExpressionNode {
    if (this.at().type !== TokenType.OpenBrace) {
      return this.parseAdditiveExpression();
    }

    const openBToken = this.eat();
    const properties: Array<IPropertyNode> = [];

    while (this.notEof() && this.at().type !== TokenType.CloseBrace) {
      const keyToken = this.expect(TokenType.Identifier, new ExpectedKeyError(this.at().location));

      if (this.at().type === TokenType.Comma) {
        this.eat();

        properties.push({
          key: keyToken.value,
          kind: NodeType.Property,
          start: keyToken.location,
          end: { row: keyToken.location.row, col: keyToken.location.col + (keyToken.value?.length ?? 0) }
        } as IPropertyNode);

        continue;
      } else if (this.at().type === TokenType.CloseBrace) {
        properties.push({
          key: keyToken.value,
          kind: NodeType.Property,
          start: keyToken.location,
          end: { row: keyToken.location.row, col: keyToken.location.col + (keyToken.value?.length ?? 0) }
        } as IPropertyNode);

        continue;
      }

      this.expect(TokenType.Colon, new MissingColonError(this.at().location));
      const valueToken = this.parseExpression();

      properties.push({
        value: valueToken,
        key: keyToken.value,
        end: valueToken.end,
        kind: NodeType.Property,
        start: keyToken.location
      } as IPropertyNode);

      if (this.at().type !== TokenType.CloseBrace) {
        this.expect(TokenType.Comma, new ExpectedCommaError(this.at().location));
      }
    }

    const closeBToken = this.expect(TokenType.CloseBrace, new UnclosedObjectError(this.at().location));

    return {
      properties,
      kind: NodeType.Object,
      end: closeBToken.location,
      start: openBToken?.location
    } as IObjectNode;
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
    let left = this.parseCallMemberExpression();

    while ([Char.Star, Char.Slash, Char.Percentage].includes(this.at().value as Char)) {
      const operator = (this.eat() as TToken).value;
      const right = this.parseCallMemberExpression();

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

  private parseCallMemberExpression(): IExpressionNode {
    const member = this.parseMemberExpression();

    if (this.at().type === TokenType.OpenParen) {
      return this.parseCallExpression(member);
    }

    return member;
  }

  private parseCallExpression(caller: IExpressionNode): ICallNode {
    const args = this.parseArguments();
    const lastArg = args.slice(0).reverse()[0];

    let call = {
      caller,
      arguments: args,
      end: lastArg.end,
      kind: NodeType.Call,
      start: caller.start
    } as ICallNode;

    if (this.at().type === TokenType.OpenParen) {
      call = this.parseCallExpression(call);
    }

    return call;
  }

  private parseArguments(): Array<IExpressionNode> {
    this.expect(TokenType.OpenParen, new ExpectedOpenParenError(this.at().location));

    const args = this.at().type === TokenType.CloseParen
      ? []
      : this.parseArgumentsList();

    this.expect(TokenType.CloseParen, new UnclosedParenthesisError(this.at().location));
    return args;
  }

  private parseArgumentsList(): Array<IExpressionNode> {
    const args = [this.parseAssignmentExpression()];

    while (this.at().type === TokenType.Comma && this.eat()) {
      args.push(this.parseAssignmentExpression());
    }

    return args;
  }

  private parseMemberExpression(): IExpressionNode {
    let obj = this.parsePrimaryExpression();

    while (this.at().type === TokenType.Dot || this.at().type === TokenType.OpenBrack) {
      const operator = this.eat();

      let computed: boolean;
      let property: IExpressionNode;

      if (operator?.type === TokenType.Dot) {
        computed = false;
        property = this.parsePrimaryExpression();

        if (property.kind !== NodeType.Identifier) {
          this.errorManager.raise(new InvalidKeyError(this.at().location));
        }
      } else {
        computed = true;
        property = this.parseExpression();

        this.expect(TokenType.CloseBrack, new UnclosedBracketError(this.at().location));
      }

      obj = {
        object: obj,
        computed,
        property,
        end: property.end,
        start: property.start,
        kind: NodeType.Member
      } as IMemberNode;
    }
    return obj;
  }

  /**
   * @description
   * Parses a primary expression
   */
  private parsePrimaryExpression(): IExpressionNode {
    const token = this.at();

    switch (token.type) {
      case TokenType.Semicolon: {
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

      case TokenType.OpenParen: {
        this.eat();
        const value = this.parseExpression();
        this.expect(TokenType.CloseParen, new UnclosedParenthesisError(this.at().location));

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

    if (this.at().type === TokenType.Semicolon) {
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

    this.expect(TokenType.Semicolon, new MissingDotError(declaration.end));

    return declaration;
  }

  /**
   * @description
   * Parses a function declaration
   */
  private parseFunctionDeclaration(): IStatementNode {
    const fnDeclationToken = this.eat();

    const name = this.expect(TokenType.Identifier, new ExpectedFunctionNameError(this.at().location)).value;
    const args = this.parseArguments();
    const params: Array<string> = [];

    for (const arg of args) {
      if (arg.kind !== NodeType.Identifier) {
        this.errorManager.raise(new ExpectedIdentifierError(arg.start));
      } else {
        params.push((arg as IIdentifierNode).symbol);
      }
    }

    this.expect(TokenType.OpenBrace, new ExpectedOpenBraceError(this.at().location));

    const body: Array<IStatementNode> = [];

    while (this.notEof() && this.at().type !== TokenType.CloseBrace) {
      body.push(this.parseStatement());
    }

    const closeBraceToken = this.expect(TokenType.CloseBrace, new ExpectedCloseBraceError(this.at().location));

    const fn = {
      body,
      name,
      parameters: params,
      end: closeBraceToken?.location,
      start: fnDeclationToken?.location,
      kind: NodeType.FunctionDeclaration,
    } as IFunctionDeclarationNode;

    return fn;
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