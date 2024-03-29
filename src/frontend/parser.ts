import { Char } from '../core/enums/char.enum';
import { NodeType } from '../core/enums/node-type.enum';
import { TokenType } from '../core/enums/token-type.enum';

import { MissingEqualsError, MissingIdentifierError, MissingDotError, UnclosedParenthesisError, UninitializedConstantError, UnrecognizedTokenError, IncompleteExpressionError, ExpectedOpenParenError, ExpectedFunctionNameError, ExpectedIdentifierError, ExpectedOpenBraceError, ExpectedCloseBraceError, InvalidConditionError, ExpectedCloseBrackError } from '../core';

import { TToken } from '../core/types/token.type';
import { TOnErrorCallbackFn } from '../core/types/on-error-callback.type';
import { IArrayNode, IAssignmentNode, IBinaryExpression, ICallNode, IConditionBlockNode, IConditionNode, IExpressionNode, IFunctionDeclarationNode, IIdentifierNode, IIndexingNode, ILoneExpression, ILoopNode, INumberNode, IProgramNode, IReturnNode, ISkipNode, IStatementNode, IStringNode, IVariableDeclarationNode } from '../core/types/ast.type';

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
      case TokenType.Return: {
        return this.parseReturn();
      }

      case TokenType.If: {
        return this.parseCondition();
      }

      case TokenType.While: {
        return this.parseLoop();
      }

      case TokenType.Comment: {
        return this.parseComment();
      }

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
   * Parses a comment node
   */
  private parseComment(): IExpressionNode {
    const node = {
      kind: NodeType.Skip,
      end: this.at().location,
      start: this.at().location
    } as ISkipNode;

    this.eat();
    return node;
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
   * Parses lone expressions
   */
  private parseLoneExpression(): IExpressionNode {
    const operator = this.eat();
    const expression = this.parseExpression();

    const node = {
      expression,
      end: expression.end,
      start: operator?.location,
      operator: operator?.value,
      kind: NodeType.LoneExpression
    } as ILoneExpression;
    return node;
  }

  /**
   * @description
   * Parses array expressions
   */
  private parseArray(): IExpressionNode {
    const openBracket = this.eat();
    const items: Array<IExpressionNode> = [];

    while (this.at() && this.at().type !== TokenType.CloseBrack) {
      items.push(this.parseExpression());

      if (this.at().type === TokenType.Comma) {
        this.eat();
      }
    }

    const closeBracket = this.expect(TokenType.CloseBrack, new ExpectedCloseBrackError(this.at().location));

    const node = {
      items,
      kind: NodeType.Array,
      end: closeBracket.location,
      start: openBracket?.location,
    } as IArrayNode;
    return node;
  }

  /**
   * @description
   * Parses an additive expression
   */
  private parseAdditiveExpression(): IExpressionNode {
    let left = this.parseMultiplicativeExpression();

    while ([Char.Plus, Char.Minus, Char.Equals, Char.Less, Char.Greater, Char.Ampersand, Char.Pipe].includes(this.at().value as Char)) {
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
    let left = this.parseCallPrimaryExpression();

    while ([Char.Star, Char.Slash, Char.Percentage].includes(this.at().value as Char)) {
      const operator = (this.eat() as TToken).value;
      const right = this.parseCallPrimaryExpression();

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
   * Parses function call and primary expressions
   */
  private parseCallPrimaryExpression(): IExpressionNode {
    const member = this.parsePrimaryExpression();

    switch (this.at().type) {
      case TokenType.OpenParen: {
        return this.parseCallExpression(member);
      }

      case TokenType.OpenBrack: {
        return this.parseIndexingExpression(member);
      }

      default: {
        return member;
      }
    }
  }

  /**
   * @description
   * Parses array indexing
   *
   * @param identifier The indexable identifier
   */
  private parseIndexingExpression(identifier: IExpressionNode): IExpressionNode {
    this.eat();

    const index = this.parseExpression();
    const closeBracket = this.expect(TokenType.CloseBrack, new ExpectedCloseBrackError(this.at().location));

    return {
      index: index,
      identifier: identifier,
      kind: NodeType.Indexing,
      start: identifier.start,
      end: closeBracket?.location
    } as IIndexingNode;
  }

  /**
   * @description
   * Parses a function call
   *
   * @param caller The caller function
   */
  private parseCallExpression(caller: IExpressionNode): ICallNode {
    const args = this.parseArguments();
    const lastArg = args.slice(0).reverse()[0];

    let call = {
      caller,
      arguments: args,
      kind: NodeType.Call,
      start: caller.start,
      end: lastArg?.end ?? caller.start
    } as ICallNode;

    if (this.at().type === TokenType.OpenParen) {
      call = this.parseCallExpression(call);
    }

    return call;
  }

  /**
   * @description
   * Parses function arguments
   */
  private parseArguments(): Array<IExpressionNode> {
    this.expect(TokenType.OpenParen, new ExpectedOpenParenError(this.at().location));

    const args = this.at().type === TokenType.CloseParen
      ? []
      : this.parseArgumentsList();

    this.expect(TokenType.CloseParen, new UnclosedParenthesisError(this.at().location));
    return args;
  }

  /**
   * @description
   * Parses the list of arguments
   */
  private parseArgumentsList(): Array<IExpressionNode> {
    const args = [this.parseAssignmentExpression()];

    while (this.at().type === TokenType.Comma && this.eat()) {
      args.push(this.parseAssignmentExpression());
    }

    return args;
  }

  /**
   * @description
   * Parses a primary expression
   */
  private parsePrimaryExpression(): IExpressionNode {
    const token = this.at();

    switch (token.type) {
      case TokenType.StatementEnd: {
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

      case TokenType.OpenBrack: {
        return this.parseArray();
      }

      case TokenType.OpenParen: {
        this.eat();
        const value = this.parseExpression();
        this.expect(TokenType.CloseParen, new UnclosedParenthesisError(this.at().location));

        return value;
      }

      case TokenType.LoneOp: {
        return this.parseLoneExpression();
      }

      case TokenType.Else:
      case TokenType.ElseIf: {
        this.errorManager.raise(new InvalidConditionError(this.at().location));
        this.eat();

        return {
          kind: NodeType.Skip,
          end: this.at().location,
          start: this.at().location
        } as ISkipNode;
      }

      case TokenType.EOF: {
        this.errorManager.raise(new IncompleteExpressionError(this.at().location));
        this.eat();

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
    let isArray = false;
    const constToken = this.eat() as TToken;
    const isConstant = constToken.type === TokenType.Const;
    const token = this.expect<TokenType>(TokenType.Identifier, new MissingIdentifierError(this.at().location));

    if (this.at().type === TokenType.OpenBrack) {
      this.eat();
      this.expect<TokenType>(TokenType.CloseBrack, new ExpectedCloseBrackError(this.at().location));

      isArray = true;
    }

    if (this.at().type === TokenType.StatementEnd) {
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
        array: isArray,
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
      array: isArray,
      constant: isConstant,
      value: valueExpression,
      identifier: token.value,
      end: valueExpression.end,
      start: constToken.location,
      kind: NodeType.VariableDeclaration
    } as IVariableDeclarationNode;

    this.expect(TokenType.StatementEnd, new MissingDotError(declaration.end));

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
   * Parses a condition statement
   */
  private parseCondition(): IStatementNode {
    const bodies: Array<IConditionNode> = [];

    const parse = () => {
      const conditionKeyword = this.eat();
      const condition = this.parseExpression();

      this.expect(TokenType.OpenBrace, new ExpectedOpenBraceError(this.at().location));
      const body: Array<IStatementNode> = [];

      while (this.at() && this.at().type !== TokenType.CloseBrace) {
        body.push(this.parseStatement());
      }

      const closeBrace = this.expect(TokenType.CloseBrace, new ExpectedCloseBraceError(this.at().location));
      return { startNode: conditionKeyword, condition, body, endNode: closeBrace };
    }

    let { startNode, body, condition, endNode } = parse();
    bodies.push({ body, condition });

    while ([TokenType.Else, TokenType.ElseIf].includes(this.at().type)) {
      if (this.at().type === TokenType.ElseIf) {
        const { endNode: closeBrace, body, condition } = parse();

        endNode = closeBrace;
        bodies.push({ body, condition });
      } else {
        this.eat();
        this.expect(TokenType.OpenBrace, new ExpectedOpenBraceError(this.at().location));

        const body: Array<IStatementNode> = [];
        while (this.at() && this.at().type !== TokenType.CloseBrace) {
          body.push(this.parseStatement());
        }

        bodies.push({ body });
        this.expect(TokenType.CloseBrace, new ExpectedCloseBraceError(this.at().location));

        break;
      }
    }
    return {
      conditions: bodies,
      end: endNode?.location,
      kind: NodeType.Condition,
      start: startNode?.location
    } as IConditionBlockNode;
  }

  /**
   * @description
   * Parses a while loop
   */
  private parseLoop(): IStatementNode {
    const whileKeyword = this.eat();
    const condition = this.parseExpression();

    this.expect(TokenType.OpenBrace, new ExpectedOpenBraceError(this.at().location));
    const body: Array<IStatementNode> = [];

    while (this.at() && this.at().type !== TokenType.CloseBrace) {
      body.push(this.parseStatement());
    }

    this.expect(TokenType.CloseBrace, new ExpectedCloseBraceError(this.at().location));

    return {
      body,
      condition,
      end: condition.end,
      kind: NodeType.Loop,
      start: whileKeyword?.location
    } as ILoopNode;
  }

  /**
   * @description
   * Parses the return statement
   */
  private parseReturn(): IStatementNode {
    const returnToken = this.eat();
    const valueExpression = this.parseExpression();

    return {
      kind: NodeType.Return,
      value: valueExpression,
      end: valueExpression.end,
      start: returnToken?.location
    } as IReturnNode;
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