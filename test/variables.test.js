const Type = require('../dist/langkama.umd.cjs').Type;
const Errno = require('../dist/langkama.umd.cjs').Errno;
const LangKama = require('../dist/langkama.umd.cjs').LangKama;
const LangKamaEvent = require('../dist/langkama.umd.cjs').LangKamaEvent;



describe('Variables', () => {
  let compiler;

  beforeEach(() => {
    compiler = new LangKama();
  });

  test('Variable declaration without value', async () => {
    const code = `hear me out var.`;
    compiler.on(LangKamaEvent.Success, result => expect(result.type).toBe(Type.Null)).interpret(code);
  });

  test('Variable declaration with value', async () => {
    const code = `hear me out var is 123.`;
    compiler.on(LangKamaEvent.Success, result => expect(result.value).toBe(123)).interpret(code);
  });

  test('Multiple variable declarations with value', async () => {
    const code = `
      hear me out firstName is "John".
      hear me out lastName is "Doe".
      hear me out fullName is firstName + " " + lastName.
    `;

    compiler.on(LangKamaEvent.Success, result => expect(result.value).toBe('John Doe')).interpret(code);
  });

  test('Variable reassignment', async () => {
    const code = `
      hear me out name is "Lang".
      name is "Kama".
    `;

    compiler.on(LangKamaEvent.Success, result => expect(result.value).toBe('Kama')).interpret(code);
  });
});

describe('Variables errors', () => {
  let compiler;

  beforeEach(() => {
    compiler = new LangKama();
  });

  test('Variable declaration without an identifier', () => {
    const code = `hear me out`;
    compiler.on(LangKamaEvent.Error, error => expect(error.errno).toBe(Errno.MissingIdentifierError)).interpret(code);
  });

  test('Variable declaration without a dot at the end', () => {
    const code = `hear me out var`;
    compiler.on(LangKamaEvent.Error, error => expect(error.errno).toBe(Errno.MissingEqualsError)).interpret(code);
  });

  test('Variable declaration without a valid value after the equals keyword', () => {
    const code = `hear me out var is`;
    compiler.on(LangKamaEvent.Error, error => expect(error.errno).toBe(Errno.MissingEqualsError)).interpret(code);
  });

  test('Variable reassignment without a valid value after the equals keyword', () => {
    const code = `
      hear me out x is 1.
      x is
    `;
    compiler.on(LangKamaEvent.Error, error => expect(error).toBe('Cannot resolve variable "is" as it does not exist')).interpret(code);
  });

  test('Variable duplication', () => {
    const code = `
      hear me out myVar is 1.
      hear me out myVar is 2.
    `;
    compiler.on(LangKamaEvent.Error, error => expect(error).toBe('Cannot declare variable myVar as it\'s already defined')).interpret(code);
  });

  test('Undeclared variable', () => {
    const code = `myVar`;
    compiler.on(LangKamaEvent.Error, error => expect(error).toBe('Cannot resolve variable "myVar" as it does not exist')).interpret(code);
  });
});