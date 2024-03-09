const LangKama = require('../dist/langkama.cjs');



describe('Maths and arithmetics', () => {
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

  test('Addition', () => {
    const code = `1 + 2`;
    const result = compile(code);

    expect(result.value).toBe(3);
  });

  test('Subtraction', () => {
    const code = `1 - 2`;
    const result = compile(code);

    expect(result.value).toBe(-1);
  });

  test('Multiplication', () => {
    const code = `2 * 4`;
    const result = compile(code);

    expect(result.value).toBe(8);
  });

  test('Division', () => {
    const code = `3 / 2`;
    const result = compile(code);

    expect(result.value).toBe(1.5);
  });

  test('Modulo', () => {
    const code = `8 % 2`;
    const result = compile(code);

    expect(result.value).toBe(0);
  });

  test('Multiplication precedence 1', () => {
    const code = `1 - 2 * 3`;
    const result = compile(code);

    expect(result.value).toBe(-5);
  });

  test('Multiplication precedence 2', () => {
    const code = `(1 - 2) * 3`;
    const result = compile(code);

    expect(result.value).toBe(-3);
  });

  test('Multiplication precedence 3', () => {
    const code = `(1 - 7 * (1 - 2)) * 3`;
    const result = compile(code);

    expect(result.value).toBe(24);
  });

  test('Division precedence 1', () => {
    const code = `2 - 3 / 3`;
    const result = compile(code);

    expect(result.value).toBe(1);
  });

  test('Division precedence 2', () => {
    const code = `(9 - 3) / 4`;
    const result = compile(code);

    expect(result.value).toBe(1.5);
  });

  test('Division precedence 3', () => {
    const code = `(1 - 0 / (7 - 2)) / 4`;
    const result = compile(code);

    expect(result.value).toBe(0.25);
  });

  test('Modulo precedence 1', () => {
    const code = `5 + 3 % 2`;
    const result = compile(code);

    expect(result.value).toBe(6);
  });

  test('Modulo precedence 2', () => {
    const code = `(2 - 7) % 2`;
    const result = compile(code);

    expect(result.value).toBe(-1);
  });

  test('Modulo precedence 3', () => {
    const code = `(1 - 3 % (10 - 1)) % 2`;
    const result = compile(code);

    expect(result.value).toBe(-0);
  });

  test('Complex 1', () => {
    const code = `(8 * 3 + 9) % 7 - (4 / 2)`;
    const result = compile(code);

    expect(result.value).toBe(3);
  });

  test('Complex 2', () => {
    const code = `(15 + 6 - 3) * 2 % 5 / 4`;
    const result = compile(code);

    expect(result.value).toBe(0.25);
  });

  test('Complex 3', () => {
    const code = `(100 % 33 - 12) * 4 + 7 / (2 - 1)`;
    const result = compile(code);

    expect(result.value).toBe(-37);
  });
});

describe('Maths and arithmetics errors', () => {
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
    const code = `1 +`;
    expect(() => compile(code)).toThrow('Parser - Unexpected token {"type":"EOF","row":1,"value":null,"col":3}}');
  });

  test('Arithmetics on different data types', () => {
    const code = `1 + "2"`;
    expect(() => compile(code)).toThrow('Can\'t perform binary operations on different types');
  });
});