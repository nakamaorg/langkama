const Errno = require('../dist/langkama.umd.cjs').Errno;
const LangKama = require('../dist/langkama.umd.cjs').LangKama;
const LangKamaEvent = require('../dist/langkama.umd.cjs').LangKamaEvent;



describe('Strings', () => {
  let compiler;

  beforeEach(() => {
    compiler = new LangKama();
  });

  test('String value', async () => {
    const code = `"John"`;
    compiler.on(LangKamaEvent.Success, result => expect(result.value).toBe('John')).interpret(code);
  });

  test('String with spaces', async () => {
    const code = `"John Doe"`;
    compiler.on(LangKamaEvent.Success, result => expect(result.value).toBe('John Doe')).interpret(code);
  });

  test('String concatenation', async () => {
    const code = `"John" + " " + "Doe"`;
    compiler.on(LangKamaEvent.Success, result => expect(result.value).toBe('John Doe')).interpret(code);
  });
});

describe('Strings errors', () => {
  let compiler;

  beforeEach(() => {
    compiler = new LangKama();
  });

  test('Incomplete operation', () => {
    const code = `"John" +`;
    compiler.on(LangKamaEvent.Error, error => expect(error.errno).toBe(Errno.IncompleteExpressionError)).interpret(code);
  });

  test('String concatenation with non string type', () => {
    const code = `"John" + 1`;
    compiler.on(LangKamaEvent.Error, error => expect(error).toBe('Can\'t perform binary operations on different types')).interpret(code);
  });
});