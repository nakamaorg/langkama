const Errno = require('../dist/langkama.umd.cjs').Errno;
const LangKama = require('../dist/langkama.umd.cjs').LangKama;



describe('Strings', () => {
  test('String value', async () => {
    const code = `"John"`;
    const result = await LangKama.interpret(code);

    expect(result.value).toBe('John');
  });

  test('String with spaces', async () => {
    const code = `"John Doe"`;
    const result = await LangKama.interpret(code);

    expect(result.value).toBe('John Doe');
  });

  test('String concatenation', async () => {
    const code = `"John" + " " + "Doe"`;
    const result = await LangKama.interpret(code);

    expect(result.value).toBe('John Doe');
  });
});

describe('Strings errors', () => {
  test('Incomplete operation', () => {
    const code = `"John" +`;
    LangKama.interpret(code).catch(err => expect(err.errno).toBe(Errno.IncompleteExpressionError));
  });
  
  test('String concatenation with non string type', () => {
    const code = `"John" + 1`;
    LangKama.interpret(code).catch(err => expect(err).toBe('Can\'t perform binary operations on different types'));
  });
});