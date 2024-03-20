const Type = require('../dist/@nakamaorg/langkama.umd.cjs').Type;
const Errno = require('../dist/@nakamaorg/langkama.umd.cjs').Errno;
const LangKama = require('../dist/@nakamaorg/langkama.umd.cjs').LangKama;
const LangKamaEvent = require('../dist/@nakamaorg/langkama.umd.cjs').LangKamaEvent;



describe('Variables', () => {
  let compiler;

  beforeEach(() => {
    compiler = new LangKama();
  });

  test('Variable declaration without value', done => {
    const code = `hear me out var;`;

    compiler.on(LangKamaEvent.Success, result => {

      expect(result.type).toBe(Type.Null);
      done();
    }).interpret(code);
  });

  test('Variable declaration with value', done => {
    const code = `hear me out var is 123;`;

    compiler.on(LangKamaEvent.Success, result => {
      expect(result.value).toBe(123);
      done();
    }).interpret(code);
  });

  test('Multiple variable declarations with value', done => {
    const code = `
      hear me out firstName is "John";
      hear me out lastName is "Doe";
      hear me out fullName is firstName + " " + lastName;
    `;

    compiler.on(LangKamaEvent.Success, result => {
      expect(result.value).toBe('John Doe');
      done();
    }).interpret(code);
  });

  test('Variable reassignment', done => {
    const code = `
      hear me out name is "Lang";
      name is "Kama";
    `;

    compiler.on(LangKamaEvent.Success, result => {
      expect(result.value).toBe('Kama');
      done();
    }).interpret(code);
  });
});

describe('Variables errors', () => {
  let compiler;

  beforeEach(() => {
    compiler = new LangKama();
  });

  test('Variable declaration without an identifier', done => {
    const code = `hear me out`;

    compiler.on(LangKamaEvent.Error, error => {
      expect(error.errno).toBe(Errno.MissingIdentifierError);
      done();
    }).interpret(code);
  });

  test('Variable declaration without a dot at the end', done => {
    const code = `hear me out var`;

    compiler.on(LangKamaEvent.Error, error => {
      expect(error.errno).toBe(Errno.MissingEqualsError);
      done();
    }).interpret(code);
  });

  test('Variable declaration without a valid value after the equals keyword', done => {
    const code = `hear me out var is`;

    compiler.on(LangKamaEvent.Error, error => {
      expect(error.errno).toBe(Errno.IncompleteExpressionError);
      done();
    }).interpret(code);
  });
  
  test('Variable reassignment without a valid value after the equals keyword', done => {
    const code = `
    hear me out x is 1;
    x is
    `;
    
    compiler.on(LangKamaEvent.Error, error => {
      expect(error.errno).toBe(Errno.IncompleteExpressionError);
      done();
    }).interpret(code);
  });

  test('Variable duplication', done => {
    const code = `
      hear me out myVar is 1;
      hear me out myVar is 2;
    `;

    compiler.on(LangKamaEvent.Error, error => {
      expect(error.errno).toBe(Errno.VariableDefinedError);
      done();
    }).interpret(code);
  });

  test('Undeclared variable', done => {
    const code = `myVar`;

    compiler.on(LangKamaEvent.Error, error => {
      expect(error.errno).toBe(Errno.VariableNotDefinedError);
      done();
    }).interpret(code);
  });
});