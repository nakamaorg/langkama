const LangKama = require('../dist/langkama.umd.cjs').LangKama;



describe('Constants', () => {
  test('Constant declaration with value', () => {
    const code = `a sa7 hear me out zero is 0.`;
    const result = LangKama.interpret(code);

    expect(result.value).toBe(0);
  });

  test('Multiple constant declarations', () => {
    const code = `
      a sa7 hear me out firstName is "John".
      a sa7 hear me out lastName is "Doe".
      a sa7 hear me out fullName is firstName + " " + lastName.
    `;

    const result = LangKama.interpret(code);
    expect(result.value).toBe('John Doe');
  });
});

describe('Constants errors', () => {
  test('Constant declaration without a value', () => {
    const code = `a sa7 hear me out zero.`;
    expect(() => LangKama.interpret(code)).toThrow(LangKama.UninitializedConstantError);
  });

  test('Constant duplication', () => {
    const code = `
      a sa7 hear me out zero is 0.
      a sa7 hear me out zero is 0.
    `;
    expect(() => LangKama.interpret(code)).toThrow('Cannot declare variable zero as it\'s already defined');
  });

  test('Constant reassignment', () => {
    const code = `
      a sa7 hear me out one is 1.
      one is 2.
    `;
    expect(() => LangKama.interpret(code)).toThrow('Constant can\'t be reassigned');
  });

  test('Undeclared constant', () => {
    const code = `myVar`;
    expect(() => LangKama.interpret(code)).toThrow('Cannot resolve variable "myVar" as it does not exist');
  });
});