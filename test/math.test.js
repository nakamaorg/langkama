const Errno = require('../dist/langkama.umd.cjs').Errno;
const LangKama = require('../dist/langkama.umd.cjs').LangKama;



describe('Maths and arithmetics', () => {
  test('Addition', async () => {
    const code = `1 + 2`;
    const result = await LangKama.interpret(code);

    expect(result.value).toBe(3);
  });

  test('Subtraction', async () => {
    const code = `1 - 2`;
    const result = await LangKama.interpret(code);

    expect(result.value).toBe(-1);
  });

  test('Multiplication', async () => {
    const code = `2 * 4`;
    const result = await LangKama.interpret(code);

    expect(result.value).toBe(8);
  });

  test('Division', async () => {
    const code = `3 / 2`;
    const result = await LangKama.interpret(code);

    expect(result.value).toBe(1.5);
  });

  test('Modulo', async () => {
    const code = `8 % 2`;
    const result = await LangKama.interpret(code);

    expect(result.value).toBe(0);
  });

  test('Multiplication precedence 1', async () => {
    const code = `1 - 2 * 3`;
    const result = await LangKama.interpret(code);

    expect(result.value).toBe(-5);
  });

  test('Multiplication precedence 2', async () => {
    const code = `(1 - 2) * 3`;
    const result = await LangKama.interpret(code);

    expect(result.value).toBe(-3);
  });

  test('Multiplication precedence 3', async () => {
    const code = `(1 - 7 * (1 - 2)) * 3`;
    const result = await LangKama.interpret(code);

    expect(result.value).toBe(24);
  });

  test('Division precedence 1', async () => {
    const code = `2 - 3 / 3`;
    const result = await LangKama.interpret(code);

    expect(result.value).toBe(1);
  });

  test('Division precedence 2', async () => {
    const code = `(9 - 3) / 4`;
    const result = await LangKama.interpret(code);

    expect(result.value).toBe(1.5);
  });

  test('Division precedence 3', async () => {
    const code = `(1 - 0 / (7 - 2)) / 4`;
    const result = await LangKama.interpret(code);

    expect(result.value).toBe(0.25);
  });

  test('Modulo precedence 1', async () => {
    const code = `5 + 3 % 2`;
    const result = await LangKama.interpret(code);

    expect(result.value).toBe(6);
  });

  test('Modulo precedence 2', async () => {
    const code = `(2 - 7) % 2`;
    const result = await LangKama.interpret(code);

    expect(result.value).toBe(-1);
  });

  test('Modulo precedence 3', async () => {
    const code = `(1 - 3 % (10 - 1)) % 2`;
    const result = await LangKama.interpret(code);

    expect(result.value).toBe(-0);
  });

  test('Complex 1', async () => {
    const code = `(8 * 3 + 9) % 7 - (4 / 2)`;
    const result = await LangKama.interpret(code);

    expect(result.value).toBe(3);
  });

  test('Complex 2', async () => {
    const code = `(15 + 6 - 3) * 2 % 5 / 4`;
    const result = await LangKama.interpret(code);

    expect(result.value).toBe(0.25);
  });

  test('Complex 3', async () => {
    const code = `(100 % 33 - 12) * 4 + 7 / (2 - 1)`;
    const result = await LangKama.interpret(code);

    expect(result.value).toBe(-37);
  });
});

describe('Maths and arithmetics errors', () => {
  test('Incomplete operation', () => {
    const code = `1 +`;
    LangKama.interpret(code).catch(err => expect(err.errno).toBe(Errno.IncompleteExpressionError));
  });
  
  test('Arithmetics on different data types', () => {
    const code = `1 + "2"`;
    LangKama.interpret(code).catch(err => expect(err).toBe('Can\'t perform binary operations on different types'));
  });
});