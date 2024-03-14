const Errno = require('../dist/langkama.umd.cjs').Errno;
const LangKama = require('../dist/langkama.umd.cjs').LangKama;
const LangKamaEvent = require('../dist/langkama.umd.cjs').LangKamaEvent;



describe('Maths and arithmetics', () => {
  let compiler;

  beforeEach(() => {
    compiler = new LangKama();
  });

  test('Addition', async () => {
    const code = `1 + 2`;
    compiler.on(LangKamaEvent.Success, result => expect(result.value).toBe(3)).interpret(code);
  });

  test('Subtraction', async () => {
    const code = `1 - 2`;
    compiler.on(LangKamaEvent.Success, result => expect(result.value).toBe(-1)).interpret(code);
  });

  test('Multiplication', async () => {
    const code = `2 * 4`;
    compiler.on(LangKamaEvent.Success, result => expect(result.value).toBe(8)).interpret(code);
  });

  test('Division', async () => {
    const code = `3 / 2`;
    compiler.on(LangKamaEvent.Success, result => expect(result.value).toBe(1.5)).interpret(code);
  });

  test('Modulo', async () => {
    const code = `8 % 2`;
    compiler.on(LangKamaEvent.Success, result => expect(result.value).toBe(0)).interpret(code);
  });

  test('Multiplication precedence 1', async () => {
    const code = `1 - 2 * 3`;
    compiler.on(LangKamaEvent.Success, result => expect(result.value).toBe(-5)).interpret(code);
  });

  test('Multiplication precedence 2', async () => {
    const code = `(1 - 2) * 3`;
    compiler.on(LangKamaEvent.Success, result => expect(result.value).toBe(-3)).interpret(code);
  });

  test('Multiplication precedence 3', async () => {
    const code = `(1 - 7 * (1 - 2)) * 3`;
    compiler.on(LangKamaEvent.Success, result => expect(result.value).toBe(24)).interpret(code);
  });

  test('Division precedence 1', async () => {
    const code = `2 - 3 / 3`;
    compiler.on(LangKamaEvent.Success, result => expect(result.value).toBe(1)).interpret(code);
  });

  test('Division precedence 2', async () => {
    const code = `(9 - 3) / 4`;
    compiler.on(LangKamaEvent.Success, result => expect(result.value).toBe(1.5)).interpret(code);
  });

  test('Division precedence 3', async () => {
    const code = `(1 - 0 / (7 - 2)) / 4`;
    compiler.on(LangKamaEvent.Success, result => expect(result.value).toBe(0.25)).interpret(code);
  });

  test('Modulo precedence 1', async () => {
    const code = `5 + 3 % 2`;
    compiler.on(LangKamaEvent.Success, result => expect(result.value).toBe(6)).interpret(code);
  });

  test('Modulo precedence 2', async () => {
    const code = `(2 - 7) % 2`;
    compiler.on(LangKamaEvent.Success, result => expect(result.value).toBe(-1)).interpret(code);
  });

  test('Modulo precedence 3', async () => {
    const code = `(1 - 3 % (10 - 1)) % 2`;
    compiler.on(LangKamaEvent.Success, result => expect(result.value).toBe(-0)).interpret(code);
  });

  test('Complex 1', async () => {
    const code = `(8 * 3 + 9) % 7 - (4 / 2)`;
    compiler.on(LangKamaEvent.Success, result => expect(result.value).toBe(3)).interpret(code);
  });

  test('Complex 2', async () => {
    const code = `(15 + 6 - 3) * 2 % 5 / 4`;
    compiler.on(LangKamaEvent.Success, result => expect(result.value).toBe(0.25)).interpret(code);
  });

  test('Complex 3', async () => {
    const code = `(100 % 33 - 12) * 4 + 7 / (2 - 1)`;
    compiler.on(LangKamaEvent.Success, result => expect(result.value).toBe(-37)).interpret(code);
  });
});

describe('Maths and arithmetics errors', () => {
  let compiler;

  beforeEach(() => {
    compiler = new LangKama();
  });

  test('Incomplete operation', () => {
    const code = `1 +`;
    compiler.on(LangKamaEvent.Error, error => expect(error.errno).toBe(Errno.IncompleteExpressionError)).interpret(code);
  });

  test('Arithmetics on different data types', () => {
    const code = `1 + "2"`;
    compiler.on(LangKamaEvent.Error, error => expect(error).toBe('Can\'t perform binary operations on different types')).interpret(code);
  });
});