const Errno = require('../dist/langkama.umd.cjs').Errno;
const LangKama = require('../dist/langkama.umd.cjs').LangKama;
const LangKamaEvent = require('../dist/langkama.umd.cjs').LangKamaEvent;



describe('Constants', () => {
  let compiler;

  beforeEach(() => {
    compiler = new LangKama();
  });

  test('Constant declaration with value', async () => {
    const code = `a sa7 hear me out zero is 0.`;
    compiler.on(LangKamaEvent.Success, result => expect(result.value).toBe(0)).interpret(code);
  });

  test('Multiple constant declarations', async () => {
    const code = `
      a sa7 hear me out firstName is "John".
      a sa7 hear me out lastName is "Doe".
      a sa7 hear me out fullName is firstName + " " + lastName.
    `;

    compiler.on(LangKamaEvent.Success, result => expect(result.value).toBe('John Doe')).interpret(code);
  });
});

describe('Constants errors', () => {
  let compiler;

  beforeEach(() => {
    compiler = new LangKama();
  });

  test('Constant declaration without a value', () => {
    const code = `a sa7 hear me out zero.`;
    compiler.on(LangKamaEvent.Error, error => expect(error.errno).toBe(Errno.UninitializedConstantError)).interpret(code);
  });

  test('Constant duplication', () => {
    const code = `
      a sa7 hear me out zero is 0.
      a sa7 hear me out zero is 0.
    `;
    compiler.on(LangKamaEvent.Error, error => expect(error).toBe('Cannot declare variable zero as it\'s already defined')).interpret(code);
  });

  test('Constant reassignment', () => {
    const code = `
    a sa7 hear me out one is 1.
    one is 2.
    `;
    compiler.on(LangKamaEvent.Error, error => expect(error).toBe('Constant can\'t be reassigned')).interpret(code);
  });

  test('Undeclared constant', () => {
    const code = `myVar`;
    compiler.on(LangKamaEvent.Error, error => expect(error).toBe('Cannot resolve variable "myVar" as it does not exist')).interpret(code);
  });
});