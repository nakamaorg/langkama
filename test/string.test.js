const LangKama = require('../dist/langkama.umd.cjs');



describe('Strings', () => {
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

  test('String value', () => {
    const code = `"John"`;
    const result = compile(code);

    expect(result.value).toBe('John');
  });

  test('String with spaces', () => {
    const code = `"John Doe"`;
    const result = compile(code);

    expect(result.value).toBe('John Doe');
  });

  test('String concatenation', () => {
    const code = `"John" + " " + "Doe"`;
    const result = compile(code);

    expect(result.value).toBe('John Doe');
  });
});

describe('Strings errors', () => {
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

  test('Incomplete operation', () => {
    const code = `"John" +`;
    expect(() => compile(code)).toThrow('Parser - Unexpected token {"type":"EOF","row":1,"value":null,"col":8}}');
  });

  test('String concatenation with non string type', () => {
    const code = `"John" + 1`;
    expect(() => compile(code)).toThrow('Can\'t perform binary operations on different types');
  });
});