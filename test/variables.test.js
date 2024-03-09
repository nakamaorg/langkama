const LangKama = require('../dist/langkama.umd.cjs');



describe('Variables', () => {
  const compile = (() => {
    const lexer = new LangKama.Lexer();
    const parser = new LangKama.Parser();

    return (code) => {
      const tokens = lexer.tokenize(code);
      const program = parser.parse(tokens);
      const env = new LangKama.Environment();
      const result = LangKama.evaluate(program, env);

      return result;
    }
  })();

  test('Variable declaration without value', () => {
    const code = `hear me out var.`;
    const result = compile(code);

    expect(result.type).toBe(LangKama.Type.Null);
  });

  test('Variable declaration with value', () => {
    const code = `hear me out var is 123.`;
    const result = compile(code);

    expect(result.value).toBe(123);
  });

  test('Multiple variable declarations with value', () => {
    const code = `
      hear me out firstName is "John".
      hear me out lastName is "Doe".
      hear me out fullName is firstName + " " + lastName.
    `;

    const result = compile(code);
    expect(result.value).toBe('John Doe');
  });

  test('Variable reassignment', () => {
    const code = `
      hear me out name is "Lang".
      name is "Kama".
    `;

    const result = compile(code);
    expect(result.value).toBe('Kama');
  });
});

describe('Variables errors', () => {
  const compile = (() => {
    const lexer = new LangKama.Lexer();
    const parser = new LangKama.Parser();

    return (code) => {
      const tokens = lexer.tokenize(code);
      const program = parser.parse(tokens);
      const env = new LangKama.Environment();
      const result = LangKama.evaluate(program, env);

      return result;
    }
  })();

  test('Variable declaration without an identifier', () => {
    const code = `hear me out`;
    expect(() => compile(code)).toThrow('Parser - Expected identifier name, Expected Identifier');
  });

  test('Variable declaration without a dot at the end', () => {
    const code = `hear me out var`;
    expect(() => compile(code)).toThrow('Parser - Expected equals token following the identifier in variable declaration, Expected Equals');
  });

  test('Variable declaration without a valid value after the equals keyword', () => {
    const code = `hear me out var is`;
    expect(() => compile(code)).toThrow('Parser - Expected equals token following the identifier in variable declaration, Expected Equals');
  });

  test('Variable reassignment without a valid value after the equals keyword', () => {
    const code = `
      hear me out x is 1.
      x is
    `;
    expect(() => compile(code)).toThrow('Cannot resolve variable "is" as it does not exist');
  });

  test('Variable duplication', () => {
    const code = `
      hear me out myVar is 1.
      hear me out myVar is 2.
    `;
    expect(() => compile(code)).toThrow('Cannot declare variable myVar as it\'s already defined');
  });

  test('Undeclared variable', () => {
    const code = `myVar`;
    expect(() => compile(code)).toThrow('Cannot resolve variable "myVar" as it does not exist');
  });
});