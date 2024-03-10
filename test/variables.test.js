const Type = require('../dist/langkama.umd.cjs').Type;
const LangKama = require('../dist/langkama.umd.cjs').LangKama;



describe('Variables', () => {
  test('Variable declaration without value', () => {
    const code = `hear me out var.`;
    const result = LangKama.interpret(code);

    expect(result.type).toBe(Type.Null);
  });

  test('Variable declaration with value', () => {
    const code = `hear me out var is 123.`;
    const result = LangKama.interpret(code);

    expect(result.value).toBe(123);
  });

  test('Multiple variable declarations with value', () => {
    const code = `
      hear me out firstName is "John".
      hear me out lastName is "Doe".
      hear me out fullName is firstName + " " + lastName.
    `;

    const result = LangKama.interpret(code);
    expect(result.value).toBe('John Doe');
  });

  test('Variable reassignment', () => {
    const code = `
      hear me out name is "Lang".
      name is "Kama".
    `;

    const result = LangKama.interpret(code);
    expect(result.value).toBe('Kama');
  });
});

describe('Variables errors', () => {
  test('Variable declaration without an identifier', () => {
    const code = `hear me out`;
    expect(() => LangKama.interpret(code)).toThrow(LangKama.MissingIdentifierError);
  });

  test('Variable declaration without a dot at the end', () => {
    const code = `hear me out var`;
    expect(() => LangKama.interpret(code)).toThrow(LangKama.MissingEqualsError);
  });

  test('Variable declaration without a valid value after the equals keyword', () => {
    const code = `hear me out var is`;
    expect(() => LangKama.interpret(code)).toThrow(LangKama.MissingEqualsError);
  });

  test('Variable reassignment without a valid value after the equals keyword', () => {
    const code = `
      hear me out x is 1.
      x is
    `;
    expect(() => LangKama.interpret(code)).toThrow('Cannot resolve variable "is" as it does not exist');
  });

  test('Variable duplication', () => {
    const code = `
      hear me out myVar is 1.
      hear me out myVar is 2.
    `;
    expect(() => LangKama.interpret(code)).toThrow('Cannot declare variable myVar as it\'s already defined');
  });

  test('Undeclared variable', () => {
    const code = `myVar`;
    expect(() => LangKama.interpret(code)).toThrow('Cannot resolve variable "myVar" as it does not exist');
  });
});