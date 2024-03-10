const LangKama = require('../dist/langkama.umd.cjs').LangKama;



describe('Strings', () => {
  test('String value', () => {
    const code = `"John"`;
    const result = LangKama.interpret(code);

    expect(result.value).toBe('John');
  });

  test('String with spaces', () => {
    const code = `"John Doe"`;
    const result = LangKama.interpret(code);

    expect(result.value).toBe('John Doe');
  });

  test('String concatenation', () => {
    const code = `"John" + " " + "Doe"`;
    const result = LangKama.interpret(code);

    expect(result.value).toBe('John Doe');
  });
});

describe('Strings errors', () => {
  test('Incomplete operation', () => {
    const code = `"John" +`;
    expect(() => LangKama.interpret(code)).toThrow(LangKama.IncompleteOperationError);
  });

  test('String concatenation with non string type', () => {
    const code = `"John" + 1`;
    expect(() => LangKama.interpret(code)).toThrow('Can\'t perform binary operations on different types');
  });
});