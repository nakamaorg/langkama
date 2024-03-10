const Errno = require('../dist/langkama.umd.cjs').Errno;
const LangKama = require('../dist/langkama.umd.cjs').LangKama;



describe('Constants', () => {
  test('Constant declaration with value', async () => {
    const code = `a sa7 hear me out zero is 0.`;
    const result = await LangKama.interpret(code);

    expect(result.value).toBe(0);
  });

  test('Multiple constant declarations', async () => {
    const code = `
      a sa7 hear me out firstName is "John".
      a sa7 hear me out lastName is "Doe".
      a sa7 hear me out fullName is firstName + " " + lastName.
    `;

    const result = await LangKama.interpret(code);
    expect(result.value).toBe('John Doe');
  });
});

describe('Constants errors', () => {
  test('Constant declaration without a value', () => {
    const code = `a sa7 hear me out zero.`;
    LangKama.interpret(code).catch(err => expect(err.errno).toBe(Errno.UninitializedConstantError));
  });

  test('Constant duplication', () => {
    const code = `
      a sa7 hear me out zero is 0.
      a sa7 hear me out zero is 0.
    `;
    LangKama.interpret(code).catch(err => expect(err).toBe('Cannot declare variable zero as it\'s already defined'));
  });

  test('Constant reassignment', () => {
    const code = `
      a sa7 hear me out one is 1.
      one is 2.
    `;
    LangKama.interpret(code).catch(err => expect(err).toBe('Constant can\'t be reassigned'));
  });

  test('Undeclared constant', () => {
    const code = `myVar`;
    LangKama.interpret(code).catch(err => expect(err).toBe('Cannot resolve variable "myVar" as it does not exist'));
  });
});