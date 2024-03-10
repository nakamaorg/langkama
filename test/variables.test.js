const Type = require('../dist/langkama.umd.cjs').Type;
const Errno = require('../dist/langkama.umd.cjs').Errno;
const LangKama = require('../dist/langkama.umd.cjs').LangKama;



describe('Variables', () => {
  test('Variable declaration without value', async () => {
    const code = `hear me out var.`;
    const result = await LangKama.interpret(code);

    expect(result.type).toBe(Type.Null);
  });

  test('Variable declaration with value', async () => {
    const code = `hear me out var is 123.`;
    const result = await LangKama.interpret(code);

    expect(result.value).toBe(123);
  });

  test('Multiple variable declarations with value', async () => {
    const code = `
      hear me out firstName is "John".
      hear me out lastName is "Doe".
      hear me out fullName is firstName + " " + lastName.
    `;

    const result = await LangKama.interpret(code);
    expect(result.value).toBe('John Doe');
  });

  test('Variable reassignment', async () => {
    const code = `
      hear me out name is "Lang".
      name is "Kama".
    `;

    const result = await LangKama.interpret(code);
    expect(result.value).toBe('Kama');
  });
});

describe('Variables errors', () => {
  test('Variable declaration without an identifier', () => {
    const code = `hear me out`;
    LangKama.interpret(code).catch(err => expect(err.errno).toBe(Errno.MissingIdentifierError));
  });

  test('Variable declaration without a dot at the end', () => {
    const code = `hear me out var`;
    LangKama.interpret(code).catch(err => expect(err.errno).toBe(Errno.MissingEqualsError));
  });

  test('Variable declaration without a valid value after the equals keyword', () => {
    const code = `hear me out var is`;
    LangKama.interpret(code).catch(err => expect(err.errno).toBe(Errno.MissingEqualsError));
  });

  test('Variable reassignment without a valid value after the equals keyword', () => {
    const code = `
      hear me out x is 1.
      x is
    `;
    LangKama.interpret(code).catch(err => expect(err).toBe('Cannot resolve variable "is" as it does not exist'));
  });

  test('Variable duplication', () => {
    const code = `
      hear me out myVar is 1.
      hear me out myVar is 2.
    `;
    LangKama.interpret(code).catch(err => expect(err).toBe('Cannot declare variable myVar as it\'s already defined'));
  });

  test('Undeclared variable', () => {
    const code = `myVar`;
    LangKama.interpret(code).catch(err => expect(err).toBe('Cannot resolve variable "myVar" as it does not exist'));
  });
});