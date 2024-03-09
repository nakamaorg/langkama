const LangKama = require('../dist/langkama.cjs');



describe('Constants', () => {
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

  test('Constant declaration with value', () => {
    const code = `a sa7 hear me out zero is 0.`;
    const result = compile(code);

    expect(result.value).toBe(0);
  });

  test('Multiple constant declarations', () => {
    const code = `
      a sa7 hear me out firstName is "John".
      a sa7 hear me out lastName is "Doe".
      a sa7 hear me out fullName is firstName + " " + lastName.
    `;

    const result = compile(code);
    expect(result.value).toBe('John Doe');
  });
});



describe('Constants errors', () => {
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

  test('Constant declaration without a value', () => {
    const code = `a sa7 hear me out zero.`;
    expect(() => compile(code)).toThrow('No value provided');
  });

  test('Constant duplication', () => {
    const code = `
      a sa7 hear me out zero is 0.
      a sa7 hear me out zero is 0.
    `;
    expect(() => compile(code)).toThrow('Cannot declare variable zero as it\'s already defined');
  });

  test('Constant reassignment', () => {
    const code = `
      a sa7 hear me out one is 1.
      one is 2.
    `;
    expect(() => compile(code)).toThrow('Constant can\'t be reassigned');
  });

  test('Undeclared constant', () => {
    const code = `myVar`;
    expect(() => compile(code)).toThrow('Cannot resolve variable "myVar" as it does not exist');
  });
});