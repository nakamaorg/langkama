var U = Object.defineProperty;
var N = (t, e, r) => e in t ? U(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var E = (t, e, r) => (N(t, typeof e != "symbol" ? e + "" : e, r), r);
var i = /* @__PURE__ */ ((t) => (t.Dot = ".", t.Comma = ",", t.OpenPren = "(", t.ClosePren = ")", t.OpenBrace = "{", t.OpenBrack = "[", t.CloseBrace = "}", t.CloseBrack = "]", t.DoubleQuotes = '"', t.Pipe = "|", t.Less = "<", t.Plus = "+", t.Star = "*", t.Minus = "-", t.Slash = "/", t.Equals = "=", t.Greater = ">", t.Ampersand = "&", t.Percentage = "%", t.Exclamation = "!", t.Space = " ", t.NewLine = `
`, t.Tabulation = "	", t.CarriageReturn = "\r", t))(i || {}), a = /* @__PURE__ */ ((t) => (t[t.If = 0] = "If", t[t.EOF = 1] = "EOF", t[t.Let = 2] = "Let", t[t.Else = 3] = "Else", t[t.Const = 4] = "Const", t[t.While = 5] = "While", t[t.Comma = 6] = "Comma", t[t.String = 7] = "String", t[t.Equals = 8] = "Equals", t[t.ElseIf = 9] = "ElseIf", t[t.Return = 10] = "Return", t[t.Number = 11] = "Number", t[t.LoneOp = 12] = "LoneOp", t[t.Comment = 13] = "Comment", t[t.Function = 14] = "Function", t[t.BinaryOp = 15] = "BinaryOp", t[t.OpenParen = 16] = "OpenParen", t[t.OpenBrace = 17] = "OpenBrace", t[t.OpenBrack = 18] = "OpenBrack", t[t.CloseBrack = 19] = "CloseBrack", t[t.CloseBrace = 20] = "CloseBrace", t[t.CloseParen = 21] = "CloseParen", t[t.Identifier = 22] = "Identifier", t[t.StatementEnd = 23] = "StatementEnd", t))(a || {});
const C = {
  is: a.Equals,
  jk: a.ElseIf,
  sike: a.Else,
  bs: a.Comment,
  reda: a.Return,
  "big if true": a.If,
  "hear me out": a.Let,
  "cook until": a.While,
  "let me cook": a.Function,
  "a sa7 hear me out": a.Const
};
class f {
  /**
   * @description
   * Checks if character can be skipped
   *
   * @param char The character to check
   */
  static isSkippable(e) {
    return [i.Space, i.Tabulation, i.NewLine, i.CarriageReturn].includes(e);
  }
  /**
   * @description
   * Checks if character is a number
   *
   * @param char The character to check
   */
  static isNumber(e) {
    const r = e.charCodeAt(0), s = [48, 57];
    return r >= s[0] && r <= s[1];
  }
  /**
   * @description
   * Checks if character is alphanumeric
   *
   * @param char The character to check
   */
  static isAlpha(e) {
    return e.toLowerCase() !== e.toUpperCase();
  }
}
class S {
  /**
   * @description
   * Instantiates the error manager
   *
   * @param onError The error callback function to call in case an error was raised
   * @param context The code source to manage the errors for
   */
  constructor(e, r) {
    /**
     * @description
     * The code source related to the error manager
     */
    E(this, "context");
    /**
     * @description
     * The list of errors
     */
    E(this, "errors");
    /**
     * @description
     * The error callback
     */
    E(this, "onError");
    this.init(r), this.onError = e;
  }
  /**
   * @description
   * Sets the error callback function to call
   *
   * @param onError The error callback function
   */
  setCallback(e) {
    this.onError = e;
  }
  /**
   * @description
   * Returns a list of raised errors
   */
  getErrors() {
    return this.errors;
  }
  /**
   * @description
   * Checks if any errors were raised
   */
  hasErrors() {
    return this.errors.length > 0;
  }
  /**
   * @description
   * Raises an error
   *
   * @param error The error to raise
   */
  raise(e) {
    e.setContext(this.context), this.errors.push(e), this.onError(e);
  }
  /**
   * @description
   * Initializes the manager
   *
   * @param context The code source to manage the errors for
   */
  init(e) {
    this.errors = [], e && (this.context = e);
  }
}
class M {
  /**
    * @description
    * Instntiates a base frontend instance
    *
    * @param content The content to reset to
    * @param onError The error callback function
    * @param compareFn The function to use for comparasion
    */
  constructor(e, r, s) {
    /**
     * @description
     * The error manager
     */
    E(this, "errorManager");
    /**
     * @description
     * Content to traverse 
    */
    E(this, "content");
    /**
     * @description
     * The index where the traversal is currently on 
     */
    E(this, "index");
    /**
     * @description
     * The number of the line the lexer is currently processing
     */
    E(this, "line");
    /**
     * @description
     * The index number of the start of the current line
     */
    E(this, "lineOffset");
    /**
     * @description
     * The custom compare function
     */
    E(this, "compareFn");
    this.initBase(e), this.errorManager = new S(r), this.compareFn = s ?? ((n, o) => n && n == o);
  }
  /**
   * @description
   * The location of the character the lexer is currently processing
   */
  get location() {
    return {
      row: this.line,
      col: this.index - this.lineOffset
    };
  }
  /**
   * @description
   * Instntiates a base frontend instance
   *
   * @param content The content to reset to
   */
  initBase(e) {
    this.line = 0, this.index = 0, this.lineOffset = 0, this.content = e;
  }
  /**
   * @description
   * Get the current character
   */
  at() {
    return this.content[this.index];
  }
  /**
   * @description
   * Get the current character and advance
   */
  eat() {
    return this.content[this.index++] ?? null;
  }
  /**
   * @description
   * Advances while checking if the next character matches with an input character
   *
   * @param target The target to check
   * @param error The error to throw
   */
  expect(e, r) {
    const s = this.eat();
    return this.compareFn(e, s) || this.errorManager.raise(r), s;
  }
  /**
   * @description
   * Marks the jumping point to the next line
   */
  jumpLine() {
    this.line++, this.lineOffset = this.index + 1;
  }
}
var m = /* @__PURE__ */ ((t) => (t[t.Skip = 0] = "Skip", t[t.Null = 1] = "Null", t[t.Array = 2] = "Array", t[t.Number = 3] = "Number", t[t.String = 4] = "String", t[t.Boolean = 5] = "Boolean", t[t.Function = 6] = "Function", t[t.NativeFunction = 7] = "NativeFunction", t))(m || {}), h = /* @__PURE__ */ ((t) => (t[t.LangKamaError = 0] = "LangKamaError", t[t.MissingDotError = 1] = "MissingDotError", t[t.InvalidKeyError = 2] = "InvalidKeyError", t[t.ExpectedKeyError = 3] = "ExpectedKeyError", t[t.InvalidFileError = 4] = "InvalidFileError", t[t.UnknownFileError = 5] = "UnknownFileError", t[t.MissingColonError = 6] = "MissingColonError", t[t.InvalidArrayError = 7] = "InvalidArrayError", t[t.InvalidStringError = 8] = "InvalidStringError", t[t.MissingEqualsError = 9] = "MissingEqualsError", t[t.ExpectedCommaError = 10] = "ExpectedCommaError", t[t.UnclosedStringError = 11] = "UnclosedStringError", t[t.UnclosedObjectError = 12] = "UnclosedObjectError", t[t.UnmatchingTypesError = 13] = "UnmatchingTypesError", t[t.UnclosedBracketError = 14] = "UnclosedBracketError", t[t.InvalidFunctionError = 15] = "InvalidFunctionError", t[t.VariableDefinedError = 16] = "VariableDefinedError", t[t.InvalidOperationError = 17] = "InvalidOperationError", t[t.InvalidConditionError = 18] = "InvalidConditionError", t[t.InvalidAssignmentError = 19] = "InvalidAssignmentError", t[t.ExpectedOpenParenError = 20] = "ExpectedOpenParenError", t[t.MissingIdentifierError = 21] = "MissingIdentifierError", t[t.UnrecognizedTokenError = 22] = "UnrecognizedTokenError", t[t.ExpectedOpenBraceError = 23] = "ExpectedOpenBraceError", t[t.ExpectedCloseBrackError = 24] = "ExpectedCloseBrackError", t[t.ExpectedIdentifierError = 25] = "ExpectedIdentifierError", t[t.ExpectedCloseBraceError = 26] = "ExpectedCloseBraceError", t[t.VariableNotDefinedError = 27] = "VariableNotDefinedError", t[t.UnclosedParenthesisError = 28] = "UnclosedParenthesisError", t[t.ExpectedFunctionNameError = 29] = "ExpectedFunctionNameError", t[t.ConstantReassignmentError = 30] = "ConstantReassignmentError", t[t.IncompleteExpressionError = 31] = "IncompleteExpressionError", t[t.UnrecognizedStatementError = 32] = "UnrecognizedStatementError", t[t.UninitializedConstantError = 33] = "UninitializedConstantError", t))(h || {}), b = /* @__PURE__ */ ((t) => (t[t.Error = 0] = "Error", t[t.Lexer = 1] = "Lexer", t[t.Parser = 2] = "Parser", t[t.Stdout = 3] = "Stdout", t[t.Success = 4] = "Success", t[t.Interpreter = 5] = "Interpreter", t))(b || {});
class p extends Error {
  constructor(r, s) {
    super(r);
    E(this, "errno");
    E(this, "context");
    E(this, "location");
    this.location = s, this.name = "LangKamaError", this.errno = h.LangKamaError;
  }
  get col() {
    var r;
    return ((r = this.location) == null ? void 0 : r.col) ?? 0;
  }
  get row() {
    var r;
    return ((r = this.location) == null ? void 0 : r.row) ?? 0;
  }
  get loc() {
    return [this.row + 1, this.col + 1].join(":");
  }
  canShowLine() {
    var r, s;
    return typeof ((r = this.location) == null ? void 0 : r.row) < "u" && typeof ((s = this.location) == null ? void 0 : s.col) < "u";
  }
  getMessage() {
    return `  [${this.name}] - ${this.message}.`;
  }
  getContext() {
    var r;
    if (this.canShowLine()) {
      const n = ((r = this.context) == null ? void 0 : r.split(`
`))[this.row], o = `${this.loc} - `, c = `${o}${n}`, d = [
        ...new Array(o.length).fill(" "),
        ...new Array(c.length - o.length).fill("~").map((g, x) => x === this.col ? "^" : g)
      ];
      return d.includes("^") || d.push("^"), [`  ${c}`, `  ${d.join("")}`];
    } else
      return [null];
  }
  setContext(r) {
    this.context = r;
  }
  toString() {
    return [
      this.getMessage(),
      ...this.getContext()
    ].join(`
`);
  }
}
class ae extends p {
  constructor(e) {
    super("invalid key", e), this.name = "InvalidKeyError", this.errno = h.InvalidKeyError;
  }
}
class D extends p {
  constructor(e) {
    super("statements should end with a dot", e), this.name = "MissingDotError", this.errno = h.MissingDotError;
  }
}
class ie extends p {
  constructor(e) {
    super(`file "${e}" does not exist`), this.name = "UnknownFileError", this.errno = h.UnknownFileError;
  }
}
class oe extends p {
  constructor(e) {
    super("expected key", e), this.name = "ExpectedKeyError", this.errno = h.ExpectedKeyError;
  }
}
class ce extends p {
  constructor(e) {
    super(`file "${e}" is not a valid LangKama script`), this.name = "InvalidFileError", this.errno = h.InvalidFileError;
  }
}
class I extends p {
  constructor() {
    super("identifier is not a valid array"), this.name = "InvalidArrayError", this.errno = h.InvalidArrayError;
  }
}
class le extends p {
  constructor(e) {
    super("missing colon", e), this.name = "MissingColonError", this.errno = h.MissingColonError;
  }
}
class O extends p {
  constructor() {
    super("name is not a string"), this.name = "InvalidStringError", this.errno = h.InvalidStringError;
  }
}
class ue extends p {
  constructor(e) {
    super("expected comma", e), this.name = "ExpectedCommaError", this.errno = h.ExpectedCommaError;
  }
}
class z extends p {
  constructor(e) {
    super("missing assignment operation", e), this.name = "MissingEqualsError", this.errno = h.MissingEqualsError;
  }
}
class R extends p {
  constructor(e) {
    super("unclosed string", e), this.name = "UnclosedStringError", this.errno = h.UnclosedStringError;
  }
}
class he extends p {
  constructor(e) {
    super("unclosed object", e), this.name = "UnclosedObjectError", this.errno = h.UnclosedObjectError;
  }
}
class j extends p {
  constructor(e) {
    super("types do not match", e), this.name = "UnmatchingTypesError", this.errno = h.UnmatchingTypesError;
  }
}
class de extends p {
  constructor(e) {
    super("open bracket was left unclosed", e), this.name = "UnclosedBracketError", this.errno = h.UnclosedBracketError;
  }
}
class q extends p {
  constructor(e) {
    super(`variable "${e}" already defined`), this.name = "VariableDefinedError", this.errno = h.VariableDefinedError;
  }
}
class H extends p {
  constructor(e) {
    super("invalid function", e), this.name = "InvalidFunctionError", this.errno = h.InvalidFunctionError;
  }
}
class $ extends p {
  constructor(e) {
    super("a jk or sike condition should be preluded by a big if true condition", e), this.name = "InvalidConditionError", this.errno = h.InvalidConditionError;
  }
}
class G extends p {
  constructor(e) {
    super("invalid operation", e), this.name = "InvalidOperationError", this.errno = h.InvalidOperationError;
  }
}
class K extends p {
  constructor(e) {
    super("invalid assignment", e), this.name = "InvalidAssignmentError", this.errno = h.InvalidAssignmentError;
  }
}
class W extends p {
  constructor(e) {
    super("missing identifier name", e), this.name = "MissingIdentifierError", this.errno = h.MissingIdentifierError;
  }
}
class P extends p {
  constructor(e) {
    super("unrecognized token", e), this.name = "UnrecognizedTokenError", this.errno = h.UnrecognizedTokenError;
  }
}
class w extends p {
  constructor(e) {
    super("expected open brace", e), this.name = "ExpectedOpenBraceError", this.errno = h.ExpectedOpenBraceError;
  }
}
class Q extends p {
  constructor(e) {
    super("expected open parenthesis", e), this.name = "ExpectedOpenParenError", this.errno = h.ExpectedOpenParenError;
  }
}
class _ extends p {
  constructor(e) {
    super("expected identifier", e), this.name = "ExpectedIdentifierError", this.errno = h.ExpectedIdentifierError;
  }
}
class B extends p {
  constructor(e) {
    super("expected close bracket", e), this.name = "ExpectedCloseBrackError", this.errno = h.ExpectedCloseBrackError;
  }
}
class k extends p {
  constructor(e) {
    super("expected close brace", e), this.name = "ExpectedCloseBraceError", this.errno = h.ExpectedCloseBraceError;
  }
}
class A extends p {
  constructor(e) {
    super(`variable "${e}" is not defined`), this.name = "VariableNotDefinedError", this.errno = h.VariableNotDefinedError;
  }
}
class L extends p {
  constructor(e) {
    super("open paranthesis was left unclosed", e), this.name = "UnclosedParenthesisError", this.errno = h.UnclosedParenthesisError;
  }
}
class J extends p {
  constructor(e) {
    super(`constant "${e}" can't be reassigned`), this.name = "ConstantReassignmentError", this.errno = h.ConstantReassignmentError;
  }
}
class X extends p {
  constructor(e) {
    super("incomplete expression", e), this.name = "IncompleteExpressionError", this.errno = h.IncompleteExpressionError;
  }
}
class Y extends p {
  constructor(e) {
    super("expected function name", e), this.name = "ExpectedFunctionNameError", this.errno = h.ExpectedFunctionNameError;
  }
}
class Z extends p {
  constructor(e) {
    super("unrecognized statement", e), this.name = "UnrecognizedStatementError", this.errno = h.UnrecognizedStatementError;
  }
}
class T extends p {
  constructor(e) {
    super("constants should always be initialized", e), this.name = "UninitializedConstantError", this.errno = h.UninitializedConstantError;
  }
}
var ee = { version: "0.1.6" };
const pe = ee.version;
class te extends M {
  /**
   * @description
   * Instantiates a lexer instance
   *
   * @param onError Callback for catching errors
   */
  constructor(r) {
    super([], r);
    /**
     * @description
     * The array of tokens
     */
    E(this, "tokens");
    this.init();
  }
  /**
   * @description
   * Tokenizes a number
   */
  tokenizeNumber() {
    let r = "";
    for (; this.at() && f.isNumber(this.at()); )
      r += this.eat();
    this.addToken(a.Number, r);
  }
  /**
   * @description
   * Tokenizes an identifier
   */
  tokenizeIdentifier() {
    let r = "";
    for (; this.at() && (f.isAlpha(this.at()) || f.isNumber(this.at())); )
      r += this.eat();
    const s = this.index, n = r, o = Object.keys(C);
    let c = "";
    for (; this.at() && (!f.isSkippable(this.at()) || this.at() === i.Space) && (c = o.find((d) => d.startsWith(r)), r !== c); ) {
      if (!c) {
        this.index = s, r = n;
        break;
      }
      r += this.eat(), r = r.split("").filter((d) => d === " " || f.isAlpha(d) || f.isNumber(d) || d === i.ClosePren).join("");
    }
    if (c = o.find((d) => d === r), C[c] === a.Comment)
      for (; this.at() && this.at() !== i.NewLine; )
        r += this.eat();
    this.addToken(C[c] ?? a.Identifier, r);
  }
  /**
   * @description
   * Creates a token object
   *
   * @param type The type of the token
   * @param value The value of the token
   */
  createToken(r, s) {
    return {
      type: r,
      value: s ?? null,
      location: {
        row: this.location.row,
        col: this.location.col - ((s == null ? void 0 : s.length) ?? 0)
      }
    };
  }
  /**
   * @description
   * Adds token to the collection of tokens
   *
   * @param type The type of the token
   * @param value The value of the token
   */
  addToken(r, s) {
    const n = this.createToken(r, s);
    return this.tokens.push(n), n;
  }
  /**
   * @description
   * Initializes the lexer
   *
   * @param code The source code to process next
   */
  init(r = "") {
    super.initBase(r.split("")), this.tokens = [];
  }
  /**
   * @description
   * Transform source code into an array of tokens
   *
   * @param code The source code to tokenize
   */
  tokenize(r) {
    for (this.init(r); this.at(); )
      switch (this.at()) {
        case i.Comma: {
          this.addToken(a.Comma, this.eat());
          break;
        }
        case i.Dot: {
          this.addToken(a.StatementEnd, this.eat());
          break;
        }
        case i.OpenPren: {
          this.addToken(a.OpenParen, this.eat());
          break;
        }
        case i.ClosePren: {
          this.addToken(a.CloseParen, this.eat());
          break;
        }
        case i.OpenBrace: {
          this.addToken(a.OpenBrace, this.eat());
          break;
        }
        case i.CloseBrace: {
          this.addToken(a.CloseBrace, this.eat());
          break;
        }
        case i.OpenBrack: {
          this.addToken(a.OpenBrack, this.eat());
          break;
        }
        case i.CloseBrack: {
          this.addToken(a.CloseBrack, this.eat());
          break;
        }
        case i.DoubleQuotes: {
          let s = "";
          for (this.eat(); this.at() && this.at() !== i.DoubleQuotes && this.at() !== i.NewLine; )
            s += this.eat();
          const n = this.addToken(a.String, s);
          this.expect(i.DoubleQuotes, new R(n.location));
          break;
        }
        case i.Pipe:
        case i.Less:
        case i.Plus:
        case i.Star:
        case i.Minus:
        case i.Slash:
        case i.Equals:
        case i.Greater:
        case i.Ampersand:
        case i.Percentage: {
          this.addToken(a.BinaryOp, this.eat());
          break;
        }
        case i.Exclamation: {
          this.addToken(a.LoneOp, this.eat());
          break;
        }
        default:
          f.isNumber(this.at()) ? this.tokenizeNumber() : f.isAlpha(this.at()) ? this.tokenizeIdentifier() : f.isSkippable(this.at()) ? (this.at() === i.NewLine && this.jumpLine(), this.eat()) : (this.errorManager.raise(new P(this.location)), this.eat());
      }
    return this.addToken(a.EOF), this.tokens;
  }
}
var l = /* @__PURE__ */ ((t) => (t[t.Skip = 0] = "Skip", t[t.Call = 1] = "Call", t[t.Loop = 2] = "Loop", t[t.Array = 3] = "Array", t[t.Number = 4] = "Number", t[t.Return = 5] = "Return", t[t.String = 6] = "String", t[t.Program = 7] = "Program", t[t.Indexing = 8] = "Indexing", t[t.Condition = 9] = "Condition", t[t.Identifier = 10] = "Identifier", t[t.LoneExpression = 11] = "LoneExpression", t[t.BinaryExpression = 12] = "BinaryExpression", t[t.VariableDeclaration = 13] = "VariableDeclaration", t[t.FunctionDeclaration = 14] = "FunctionDeclaration", t[t.AssignmentExpression = 15] = "AssignmentExpression", t))(l || {});
class re extends M {
  /**
   * @description
   * Instantiates a parser instance
   *
   * @param onError Callback for catching errors
   */
  constructor(e) {
    super([], e, (r, s) => !!r && r === s.type);
  }
  /**
   * @description
   * Checks if the end of the file has not been reached yet
   */
  notEof() {
    return this.at().type !== a.EOF;
  }
  /**
   * @description
   * Parses a statement
   */
  parseStatement() {
    switch (this.at().type) {
      case a.Return:
        return this.parseReturn();
      case a.If:
        return this.parseCondition();
      case a.While:
        return this.parseLoop();
      case a.Comment:
        return this.parseComment();
      case a.Let:
      case a.Const:
        return this.parseVariableDeclaration();
      case a.Function:
        return this.parseFunctionDeclaration();
      default:
        return this.parseExpression();
    }
  }
  /**
   * @description
   * Parses a comment node
   */
  parseComment() {
    const e = {
      kind: l.Skip,
      end: this.at().location,
      start: this.at().location
    };
    return this.eat(), e;
  }
  /**
   * @description
   * Parses an expression
   */
  parseExpression() {
    return this.parseAssignmentExpression();
  }
  /**
   * @description
   * parses an assignment
   */
  parseAssignmentExpression() {
    const e = this.parseAdditiveExpression();
    if (this.at().type === a.Equals) {
      this.eat();
      const r = this.parseAssignmentExpression();
      return {
        value: r,
        assigne: e,
        kind: l.AssignmentExpression,
        end: { row: r.end.row, col: r.end.col },
        start: { row: e.start.row, col: e.start.col }
      };
    }
    return e;
  }
  /**
   * @description
   * Parses lone expressions
   */
  parseLoneExpression() {
    const e = this.eat(), r = this.parseExpression();
    return {
      expression: r,
      end: r.end,
      start: e == null ? void 0 : e.location,
      operator: e == null ? void 0 : e.value,
      kind: l.LoneExpression
    };
  }
  /**
   * @description
   * Parses array expressions
   */
  parseArray() {
    const e = this.eat(), r = [];
    for (; this.at() && this.at().type !== a.CloseBrack; )
      r.push(this.parseExpression()), this.at().type === a.Comma && this.eat();
    const s = this.expect(a.CloseBrack, new B(this.at().location));
    return {
      items: r,
      kind: l.Array,
      end: s.location,
      start: e == null ? void 0 : e.location
    };
  }
  /**
   * @description
   * Parses an additive expression
   */
  parseAdditiveExpression() {
    let e = this.parseMultiplicativeExpression();
    for (; [i.Plus, i.Minus, i.Equals, i.Less, i.Greater, i.Ampersand, i.Pipe].includes(this.at().value); ) {
      const r = this.eat().value, s = this.parseMultiplicativeExpression();
      e = {
        left: e,
        right: s,
        operator: r,
        kind: l.BinaryExpression,
        end: { row: s.end.row, col: s.end.col },
        start: { row: e.start.row, col: e.start.col }
      };
    }
    return e;
  }
  /**
   * @description
   * Parses a multiplicative expression
   */
  parseMultiplicativeExpression() {
    let e = this.parseCallPrimaryExpression();
    for (; [i.Star, i.Slash, i.Percentage].includes(this.at().value); ) {
      const r = this.eat().value, s = this.parseCallPrimaryExpression();
      e = {
        left: e,
        right: s,
        operator: r,
        kind: l.BinaryExpression,
        end: { row: s.end.row, col: s.end.col },
        start: { row: e.start.row, col: e.start.col }
      };
    }
    return e;
  }
  /**
   * @description
   * Parses function call and primary expressions
   */
  parseCallPrimaryExpression() {
    const e = this.parsePrimaryExpression();
    switch (this.at().type) {
      case a.OpenParen:
        return this.parseCallExpression(e);
      case a.OpenBrack:
        return this.parseIndexingExpression(e);
      default:
        return e;
    }
  }
  /**
   * @description
   * Parses array indexing
   *
   * @param identifier The indexable identifier
   */
  parseIndexingExpression(e) {
    this.eat();
    const r = this.parseExpression(), s = this.expect(a.CloseBrack, new B(this.at().location));
    return {
      index: r,
      identifier: e,
      kind: l.Indexing,
      start: e.start,
      end: s == null ? void 0 : s.location
    };
  }
  /**
   * @description
   * Parses a function call
   *
   * @param caller The caller function
   */
  parseCallExpression(e) {
    const r = this.parseArguments(), s = r.slice(0).reverse()[0];
    let n = {
      caller: e,
      arguments: r,
      kind: l.Call,
      start: e.start,
      end: (s == null ? void 0 : s.end) ?? e.start
    };
    return this.at().type === a.OpenParen && (n = this.parseCallExpression(n)), n;
  }
  /**
   * @description
   * Parses function arguments
   */
  parseArguments() {
    this.expect(a.OpenParen, new Q(this.at().location));
    const e = this.at().type === a.CloseParen ? [] : this.parseArgumentsList();
    return this.expect(a.CloseParen, new L(this.at().location)), e;
  }
  /**
   * @description
   * Parses the list of arguments
   */
  parseArgumentsList() {
    const e = [this.parseAssignmentExpression()];
    for (; this.at().type === a.Comma && this.eat(); )
      e.push(this.parseAssignmentExpression());
    return e;
  }
  /**
   * @description
   * Parses a primary expression
   */
  parsePrimaryExpression() {
    var r, s, n;
    const e = this.at();
    switch (e.type) {
      case a.StatementEnd: {
        const o = {
          kind: l.Skip,
          end: this.at().location,
          start: this.at().location
        };
        return this.eat(), o;
      }
      case a.Identifier: {
        const o = {
          symbol: e.value,
          kind: l.Identifier,
          start: { row: e.location.row, col: e.location.col },
          end: { row: e.location.row, col: e.location.col + (((r = e.value) == null ? void 0 : r.length) ?? 0) }
        };
        return this.eat(), o;
      }
      case a.Number: {
        const o = {
          kind: l.Number,
          value: parseFloat(e.value),
          start: { row: e.location.row, col: e.location.col },
          end: { row: e.location.row, col: e.location.col + (((s = e.value) == null ? void 0 : s.length) ?? 0) }
        };
        return this.eat(), o;
      }
      case a.String: {
        const o = {
          kind: l.String,
          value: e.value,
          start: { row: e.location.row, col: e.location.col },
          end: { row: e.location.row, col: e.location.col + (((n = e.value) == null ? void 0 : n.length) ?? 0) }
        };
        return this.eat(), o;
      }
      case a.OpenBrack:
        return this.parseArray();
      case a.OpenParen: {
        this.eat();
        const o = this.parseExpression();
        return this.expect(a.CloseParen, new L(this.at().location)), o;
      }
      case a.LoneOp:
        return this.parseLoneExpression();
      case a.Else:
      case a.ElseIf:
        return this.errorManager.raise(new $(this.at().location)), this.eat(), {
          kind: l.Skip,
          end: this.at().location,
          start: this.at().location
        };
      case a.EOF:
        return this.errorManager.raise(new X(this.at().location)), this.eat(), {
          kind: l.Skip,
          end: this.at().location,
          start: this.at().location
        };
      default: {
        const o = {
          kind: l.Skip,
          end: this.at().location,
          start: this.at().location
        };
        return this.errorManager.raise(new P(this.at().location)), this.eat(), o;
      }
    }
  }
  /**
   * @description
   * Parses a variable declaration
   */
  parseVariableDeclaration() {
    let e = !1;
    const r = this.eat(), s = r.type === a.Const, n = this.expect(a.Identifier, new W(this.at().location));
    if (this.at().type === a.OpenBrack && (this.eat(), this.expect(a.CloseBrack, new B(this.at().location)), e = !0), this.at().type === a.StatementEnd) {
      const d = this.eat();
      return s ? (this.errorManager.raise(new T(this.at().location)), {
        kind: l.Skip,
        end: this.at().location,
        start: this.at().location
      }) : {
        array: e,
        constant: !1,
        end: d.location,
        identifier: n.value,
        start: r.location,
        kind: l.VariableDeclaration
      };
    }
    this.expect(a.Equals, new z(this.at().location));
    const o = this.parseExpression(), c = {
      array: e,
      constant: s,
      value: o,
      identifier: n.value,
      end: o.end,
      start: r.location,
      kind: l.VariableDeclaration
    };
    return this.expect(a.StatementEnd, new D(c.end)), c;
  }
  /**
   * @description
   * Parses a function declaration
   */
  parseFunctionDeclaration() {
    const e = this.eat(), r = this.expect(a.Identifier, new Y(this.at().location)).value, s = this.parseArguments(), n = [];
    for (const g of s)
      g.kind !== l.Identifier ? this.errorManager.raise(new _(g.start)) : n.push(g.symbol);
    this.expect(a.OpenBrace, new w(this.at().location));
    const o = [];
    for (; this.notEof() && this.at().type !== a.CloseBrace; )
      o.push(this.parseStatement());
    const c = this.expect(a.CloseBrace, new k(this.at().location));
    return {
      body: o,
      name: r,
      parameters: n,
      end: c == null ? void 0 : c.location,
      start: e == null ? void 0 : e.location,
      kind: l.FunctionDeclaration
    };
  }
  /**
   * @description
   * Parses a condition statement
   */
  parseCondition() {
    const e = [], r = () => {
      const d = this.eat(), g = this.parseExpression();
      this.expect(a.OpenBrace, new w(this.at().location));
      const x = [];
      for (; this.at() && this.at().type !== a.CloseBrace; )
        x.push(this.parseStatement());
      const v = this.expect(a.CloseBrace, new k(this.at().location));
      return { startNode: d, condition: g, body: x, endNode: v };
    };
    let { startNode: s, body: n, condition: o, endNode: c } = r();
    for (e.push({ body: n, condition: o }); [a.Else, a.ElseIf].includes(this.at().type); )
      if (this.at().type === a.ElseIf) {
        const { endNode: d, body: g, condition: x } = r();
        c = d, e.push({ body: g, condition: x });
      } else {
        this.eat(), this.expect(a.OpenBrace, new w(this.at().location));
        const d = [];
        for (; this.at() && this.at().type !== a.CloseBrace; )
          d.push(this.parseStatement());
        e.push({ body: d }), this.expect(a.CloseBrace, new k(this.at().location));
        break;
      }
    return {
      conditions: e,
      end: c == null ? void 0 : c.location,
      kind: l.Condition,
      start: s == null ? void 0 : s.location
    };
  }
  /**
   * @description
   * Parses a while loop
   */
  parseLoop() {
    const e = this.eat(), r = this.parseExpression();
    this.expect(a.OpenBrace, new w(this.at().location));
    const s = [];
    for (; this.at() && this.at().type !== a.CloseBrace; )
      s.push(this.parseStatement());
    return this.expect(a.CloseBrace, new k(this.at().location)), {
      body: s,
      condition: r,
      end: r.end,
      kind: l.Loop,
      start: e == null ? void 0 : e.location
    };
  }
  /**
   * @description
   * Parses the return statement
   */
  parseReturn() {
    const e = this.eat(), r = this.parseExpression();
    return {
      kind: l.Return,
      value: r,
      end: r.end,
      start: e == null ? void 0 : e.location
    };
  }
  /**
   * @description
   * Parses a list of tokens into an AST
   *
   * @param tokens The tokens to parse
   */
  parse(e) {
    this.content = [...e];
    const r = {
      body: [],
      kind: l.Program,
      end: { row: 0, col: 0 },
      start: { row: 0, col: 0 }
    };
    for (; this.notEof(); )
      r.body.push(this.parseStatement());
    return { ...r, end: this.at().location };
  }
}
class u {
  /**
   * @description
   * Creates a runtime value given the primitive type of the input
   *
   * @param value The value to create the runtime value for
   */
  static createValue(e) {
    let r;
    switch (typeof e) {
      case "number": {
        r = m.Number;
        break;
      }
      case "boolean": {
        r = m.Boolean;
        break;
      }
      case "string": {
        r = m.String;
        break;
      }
      default:
        r = m.Null;
    }
    return { type: r, value: e };
  }
  /**
   * @description
   * Creates a null value
   */
  static createSkip() {
    return { type: m.Skip };
  }
  /**
   * @description
   * Creates a null value
   */
  static createNull() {
    return { type: m.Null, value: null };
  }
  /**
   * @description
   * Creates a number value
   *
   * @param number The numver value
   */
  static createNumber(e) {
    return { type: m.Number, value: e };
  }
  /**
   * @description
   * Creates a string value
   *
   * @param string The string value
   */
  static createString(e) {
    return { type: m.String, value: e };
  }
  /**
   * @description
   * Creates a boolean value
   *
   * @param boolean The boolean value
   */
  static createBoolean(e) {
    return { type: m.Boolean, value: e };
  }
  /**
   * @description
   * Creates an array value
   *
   * @param items The elements of the array
   */
  static createArray(e) {
    return { type: m.Array, value: Array.from(e) };
  }
  /**
   * @description
   * Creates a function value
   *
   * @param call The function call
   */
  static createFunction(e) {
    return { type: m.NativeFunction, call: e };
  }
}
class F {
  /**
   * @description
   * Instantiates a scope instance
   *
   * @param parent the parent scope
   * @param onError The error callback function
   */
  constructor(e, r) {
    /**
     * @description
     * The error manager
     */
    E(this, "errorManager");
    /**
     * @description
     * The parent scope
     */
    E(this, "parent");
    /**
     * @description
     * The list of variables
     */
    E(this, "variables");
    /**
    * @description
    * The stdout callback function
    */
    E(this, "onStdoutEventHandler");
    this.parent = e, this.variables = /* @__PURE__ */ new Map(), r && (this.errorManager = new S(r)), e || this.setupScope();
  }
  /**
   * @description
   * Initializes the global scope
   */
  setupScope() {
    this.declareVariable("bruh", u.createNull(), !0), this.declareVariable("W", u.createBoolean(!0), !0), this.declareVariable("L", u.createBoolean(!1), !0), this.declareVariable("loncina", u.createFunction((e) => {
      const r = e.filter((s) => "value" in s).map((s) => s.type === m.Array ? JSON.stringify(s.value) : s.value);
      return this.onStdoutEventHandler(r.join(" ")), u.createNull();
    }), !0), this.declareVariable("bait", u.createFunction((e) => {
      const r = e[0].value ?? "bruh";
      return u.createString(r.toString());
    }), !0), this.declareVariable("length", u.createFunction((e) => {
      var s;
      const [r] = e;
      return r.type !== m.Array && ((s = this.errorManager) == null || s.raise(new I())), u.createNumber(r.value.length);
    }), !0), this.declareVariable("push", u.createFunction((e) => {
      var c, d;
      const [r, s] = e;
      r.type !== m.String && ((c = this.errorManager) == null || c.raise(new O()));
      const n = this.getValue(r.value).value;
      n.type !== m.Array && ((d = this.errorManager) == null || d.raise(new I()));
      const o = [...n.value];
      return o.push(s.value), this.assignVariable(r.value, u.createArray(o)), u.createNumber(o.length);
    }), !0), this.declareVariable("pop", u.createFunction((e) => {
      var c, d;
      const [r] = e;
      r.type !== m.String && ((c = this.errorManager) == null || c.raise(new O()));
      const s = this.getValue(r.value).value;
      s.type !== m.Array && ((d = this.errorManager) == null || d.raise(new I()));
      const n = [...s.value], o = n.pop();
      return this.assignVariable(r.value, u.createArray(n)), u.createNumber(o);
    }), !0);
  }
  /**
   * @description
   * Sets the callback function for the stdout stream
   *
   * @param onStdout The stdout callback function
   */
  setStdoutCallback(e) {
    this.onStdoutEventHandler = e;
  }
  /**
   * @description
   * Sets the callback function for the error manager
   *
   * @param onError The error callback function
   */
  setErrorCallback(e) {
    var r;
    this.errorManager ? (r = this.errorManager) == null || r.setCallback(e) : this.errorManager = new S(e);
  }
  /**
   * @description
   * Creates a new variable
   *
   * @param name The name of the variable
   * @param value The value of the variable
   * @param constant Whether the variable is a constant or not
   */
  declareVariable(e, r, s = !1) {
    var n;
    return this.variables.has(e) && ((n = this.errorManager) == null || n.raise(new q(e))), this.variables.set(e, { name: e, constant: s, value: r }), r;
  }
  /**
   * @description
   * Assigns a value to a variable
   *
   * @param name The name of the variable
   * @param value The value to assign
   */
  assignVariable(e, r) {
    var o, c;
    this.variables.has(e) || (o = this.errorManager) == null || o.raise(new A(e));
    const s = this.resolve(e), n = s.getValue(e);
    return n != null && n.constant && ((c = this.errorManager) == null || c.raise(new J(e))), s.variables.set(e, { ...n, value: r }), r;
  }
  /**
   * @description
   * Retrieves the value of a variable
   *
   * @param name The name of the variable
   */
  getValue(e) {
    return this.resolve(e).variables.get(e);
  }
  /**
   * @description
   * Resolves the scope of the variable
   *
   * @param name The name if the variable
   */
  resolve(e) {
    var r;
    return this.variables.has(e) ? this : this.parent ? this.parent.resolve(e) : ((r = this.errorManager) == null || r.raise(new A(e)), this);
  }
}
class Ee {
  /**
   * @description
   * Instantiates a compiler instance for LangKama
   */
  constructor() {
    /**
     * @description
     * The stdout callback function
     */
    E(this, "onOutEventHandler");
    /**
     * @description
     * The error callback function
     */
    E(this, "onErrorEventListener");
    /**
     * @description
     * The lexer callback function
     */
    E(this, "onLexerEventListener");
    /**
     * @description
     * The success callback function
     */
    E(this, "onSuccessEventListener");
    /**
     * @description
     * The parser callback function
     */
    E(this, "onParserEventListener");
    /**
     * @description
     * The interpreter callback function
     */
    E(this, "onInterpreterEventListener");
    this.onOutEventHandler = () => {
    }, this.onErrorEventListener = () => {
    }, this.onLexerEventListener = () => {
    }, this.onParserEventListener = () => {
    }, this.onSuccessEventListener = () => {
    }, this.onInterpreterEventListener = () => {
    };
  }
  /**
   * @description
   * Interprets LangKama source code
   *
   * @param code The Langkama source code to interpret
   * @param environment The envrionment to read from
   */
  interpret(e, r) {
    const s = new S(this.onErrorEventListener, e);
    try {
      const n = new se(this.onOutEventHandler), o = new te(s.raise.bind(s)), c = new re(s.raise.bind(s)), d = r ?? new F(null, s.raise.bind(s));
      this.onLexerEventListener(e);
      const g = o.tokenize(e);
      this.onParserEventListener(g);
      const x = c.parse(g);
      this.onInterpreterEventListener(x);
      const v = n.evaluate(x, d);
      s.hasErrors() || this.onSuccessEventListener(v);
    } catch (n) {
      s.raise(n);
    } finally {
      return this;
    }
  }
  /**
   * @description
   * Listens to updates regarding a specific event
   *
   * @param event The event to subscribe to
   * @param eventListener The event listener callback function
   */
  on(e, r) {
    switch (e) {
      case b.Error: {
        this.onErrorEventListener = r;
        break;
      }
      case b.Stdout: {
        this.onOutEventHandler = r;
        break;
      }
      case b.Success: {
        this.onSuccessEventListener = r;
        break;
      }
      case b.Lexer: {
        this.onLexerEventListener = r;
        break;
      }
      case b.Parser: {
        this.onParserEventListener = r;
        break;
      }
      case b.Interpreter: {
        this.onInterpreterEventListener = r;
        break;
      }
    }
    return this;
  }
}
class se {
  /**
   * @description
   * Creates an evaluator instance
   *
   * @param onStdoutEventHandler The stdout event handler function
   */
  constructor(e) {
    /**
    * @description
    * The stdout callback function
    */
    E(this, "onStdoutEventHandler");
    this.onStdoutEventHandler = e ?? (() => {
    });
  }
  /**
   * @description
   * Evaluates a program node
   *
   * @param program The program node
   * @param env The scope of the evaluation
   */
  evaluateProgram(e, r) {
    let s = u.createNull();
    for (const n of e.body) {
      const o = this.evaluate(n, r);
      o.type !== m.Skip && (s = o);
    }
    return s;
  }
  /**
   * @description
   * Evaluates a variable declaration statement
   *
   * @param declaration The declaration statement
   * @param env The scope of the evaluation
   */
  evaluateVariableDeclaration(e, r) {
    let s = e.value ? this.evaluate(e.value, r) : e.array ? u.createArray([]) : u.createNull();
    return r.declareVariable(e.identifier, s, e.constant);
  }
  /**
   * @description
   * Evaluates a function declaration statement
   *
   * @param declaration The declaration statement
   * @param env The scope of the evaluation
   */
  evaluateFunctionDeclaration(e, r) {
    const s = {
      env: r,
      type: m.Function,
      body: e.body,
      name: e.name,
      parameters: e.parameters
    };
    return r.declareVariable(e.name, s, !0);
  }
  /**
   * @description
   * Evaluates a condition statement
   *
   * @param conditionBlock The condition block statement
   * @param env The scope of the evaluation
   */
  evaluateConditionBlock(e, r) {
    for (const s of e.conditions)
      if (s.condition) {
        if (this.evaluate(s.condition, r).value) {
          s.body.forEach((o) => this.evaluate(o, r));
          break;
        }
      } else {
        s.body.forEach((n) => this.evaluate(n, r));
        break;
      }
    return u.createSkip();
  }
  /**
   * @description
   * Evaluates a loop statement
   *
   * @param loopStatement The loop statement
   * @param env The scope of the evaluation
   */
  evaluateLoop(e, r) {
    for (; !this.evaluate(e.condition, r).value; )
      e.body.forEach((s) => this.evaluate(s, r));
    return u.createSkip();
  }
  /**
   * @description
   * Evaluates a lone expression
   *
   * @param loneExpression The lone expression to evaluate
   * @param env The scope of the evaluation
   */
  evaluateLoneExpression(e, r) {
    const s = this.evaluate(e.expression, r);
    return u.createBoolean(!s.value);
  }
  /**
   * @description
   * Evaluates a binary expression
   *
   * @param binaryExpression The binary expression to evaluate
   * @param env The scope of the evaluation
   */
  evaluateBinaryExpression(e, r) {
    var o, c;
    const s = this.evaluate(e.left, r), n = this.evaluate(e.right, r);
    if (s.type !== n.type)
      return (o = r.errorManager) == null || o.raise(new j(e.start)), u.createNull();
    if ([i.Equals, i.Greater, i.Less, i.Ampersand, i.Pipe].includes(e.operator))
      return this.evaluateBooleanBinaryExpression(s, n, e.operator);
    switch (s.type) {
      case m.Number:
        return this.evaluateNumericBinaryExpression(s, n, e.operator);
      case m.String:
        return e.operator === "+" ? u.createString(s.value + n.value) : ((c = r.errorManager) == null || c.raise(new G(e.start)), u.createNull());
      default:
        return u.createNull();
    }
  }
  /**
   * @description
   * Evaluates a boolean expression
   *
   * @param lhs The left hand assignment
   * @param rhs The right hand assignment
   * @param operator The operator
   */
  evaluateBooleanBinaryExpression(e, r, s) {
    let n = !1;
    switch (s) {
      case i.Equals: {
        n = e.value === r.value;
        break;
      }
      case i.Greater: {
        n = e.value > r.value;
        break;
      }
      case i.Less: {
        n = e.value < r.value;
        break;
      }
      case i.Ampersand: {
        n = !!(e.value && r.value);
        break;
      }
      case i.Pipe: {
        n = !!(e.value || r.value);
        break;
      }
    }
    return u.createBoolean(n);
  }
  /**
   * @description
   * Evaluates a binary expression
   *
   * @param lhs The left hand assignment
   * @param rhs The right hand assignment
   * @param operator The operator
   */
  evaluateNumericBinaryExpression(e, r, s) {
    let n = 0;
    switch (s) {
      case i.Plus: {
        n = e.value + r.value;
        break;
      }
      case i.Minus: {
        n = e.value - r.value;
        break;
      }
      case i.Star: {
        n = e.value * r.value;
        break;
      }
      case i.Slash: {
        n = e.value / r.value;
        break;
      }
      case i.Percentage: {
        n = e.value % r.value;
        break;
      }
    }
    return u.createNumber(n);
  }
  /**
   * @description
   * Evaluates an array
   *
   * @param array The array to evaluate
   * @param env The scope of the evaluation
   */
  evaluateArray(e, r) {
    const s = e.items.map((n) => this.evaluate(n, r).value);
    return u.createArray(s);
  }
  /**
   * @description
   * Evaluates an identifier
   *
   * @param identifier The identifier to evaluate
   * @param env The scope of the evaluation
   */
  evaluateIdentifier(e, r) {
    return r.getValue(e.symbol).value;
  }
  /**
   * @description
   * Evaluates an indexable
   *
   * @param array The indexable to evaluate
   * @param env The scope of the evaluation
   */
  evaluateIndexing(e, r) {
    const s = this.evaluate(e.index, r), c = this.evaluate(e.identifier, r).value[s.value];
    return c != null ? u.createValue(c) : u.createNull();
  }
  /**
   * @description
   * Evaluates a function
   *
   * @param call The function to evaluate
   * @param env The scope of the evaluation
   */
  evaluateFunction(e, r) {
    var o;
    const s = e.arguments.map((c) => this.evaluate(c, r)), n = this.evaluate(e.caller, r);
    if (n.type === m.NativeFunction)
      return n.call(s, r);
    if (n.type === m.Function) {
      const c = n, d = new F(c.env);
      for (let v = 0; v < c.parameters.length; ++v) {
        const y = c.parameters[v], V = s[v];
        d.declareVariable(y, V);
      }
      let g = !1, x = u.createNull();
      for (const v of c.body)
        if (v.kind !== l.Skip && (x = this.evaluate(v, d), v.kind === l.Return)) {
          g = !0;
          break;
        }
      return g ? x : u.createNull();
    }
    return (o = r.errorManager) == null || o.raise(new H(e.start)), u.createNull();
  }
  /**
   * @description
   * Evaluates an assignment expression
   *
   * @param node The assignment node to evaluate
   * @param env The scope of the evaluation
   */
  evaluateAssignment(e, r) {
    var s;
    switch (e.assigne.kind) {
      case l.Identifier: {
        const n = e.assigne.symbol;
        return r.assignVariable(n, this.evaluate(e.value, r));
      }
      case l.Indexing: {
        const n = e.assigne, c = n.identifier.symbol, g = [...r.getValue(c).value.value], x = this.evaluate(n.index, r).value;
        g[x] = this.evaluate(e.value, r).value;
        const v = u.createArray(g);
        return r.assignVariable(c, v);
      }
      default:
        return (s = r.errorManager) == null || s.raise(new K(e.start)), u.createNull();
    }
  }
  /**
   * @description
   * Evaluates a return statement
   *
   * @param node The return statement
   * @param env The scope of evaluation
   */
  evaluateReturn(e, r) {
    return this.evaluate(e.value, r);
  }
  /**
   * @description
   * Evaluates an AST tree
   *
   * @param node The root of the AST tree
   * @param env The scope to attach to the tree
   */
  evaluate(e, r) {
    var s;
    switch (r.setStdoutCallback(this.onStdoutEventHandler), e.kind) {
      case l.Number:
        return u.createNumber(e.value);
      case l.String:
        return u.createString(e.value);
      case l.Array:
        return this.evaluateArray(e, r);
      case l.Identifier:
        return this.evaluateIdentifier(e, r);
      case l.Indexing:
        return this.evaluateIndexing(e, r);
      case l.Call:
        return this.evaluateFunction(e, r);
      case l.AssignmentExpression:
        return this.evaluateAssignment(e, r);
      case l.BinaryExpression:
        return this.evaluateBinaryExpression(e, r);
      case l.LoneExpression:
        return this.evaluateLoneExpression(e, r);
      case l.Program:
        return this.evaluateProgram(e, r);
      case l.VariableDeclaration:
        return this.evaluateVariableDeclaration(e, r);
      case l.FunctionDeclaration:
        return this.evaluateFunctionDeclaration(e, r);
      case l.Condition:
        return this.evaluateConditionBlock(e, r);
      case l.Loop:
        return this.evaluateLoop(e, r);
      case l.Skip:
        return u.createSkip();
      case l.Return:
        return this.evaluateReturn(e, r);
      default:
        return (s = r.errorManager) == null || s.raise(new Z(e.start)), u.createNull();
    }
  }
}
export {
  J as ConstantReassignmentError,
  F as Environment,
  h as Errno,
  S as ErrorManager,
  se as Evaluator,
  k as ExpectedCloseBraceError,
  B as ExpectedCloseBrackError,
  ue as ExpectedCommaError,
  Y as ExpectedFunctionNameError,
  _ as ExpectedIdentifierError,
  oe as ExpectedKeyError,
  w as ExpectedOpenBraceError,
  Q as ExpectedOpenParenError,
  X as IncompleteExpressionError,
  I as InvalidArrayError,
  K as InvalidAssignmentError,
  $ as InvalidConditionError,
  ce as InvalidFileError,
  H as InvalidFunctionError,
  ae as InvalidKeyError,
  G as InvalidOperationError,
  O as InvalidStringError,
  Ee as LangKama,
  p as LangKamaError,
  b as LangKamaEvent,
  te as Lexer,
  le as MissingColonError,
  D as MissingDotError,
  z as MissingEqualsError,
  W as MissingIdentifierError,
  re as Parser,
  m as Type,
  de as UnclosedBracketError,
  he as UnclosedObjectError,
  L as UnclosedParenthesisError,
  R as UnclosedStringError,
  T as UninitializedConstantError,
  ie as UnknownFileError,
  j as UnmatchingTypesError,
  Z as UnrecognizedStatementError,
  P as UnrecognizedTokenError,
  q as VariableDefinedError,
  A as VariableNotDefinedError,
  pe as version
};
