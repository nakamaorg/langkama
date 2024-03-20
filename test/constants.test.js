const Errno = require('../dist/@nakamaorg/langkama.umd.cjs').Errno;
const LangKama = require('../dist/@nakamaorg/langkama.umd.cjs').LangKama;
const LangKamaEvent = require('../dist/@nakamaorg/langkama.umd.cjs').LangKamaEvent;



describe('Constants', () => {
  let compiler;

  beforeEach(() => {
    compiler = new LangKama();
  });

  test('Constant declaration with value', done => {
    const code = `a sa7 hear me out zero is 0;`;

    compiler.on(LangKamaEvent.Success, result => {
      expect(result.value).toBe(0);
      done();
    }).interpret(code);
  });

  test('Multiple constant declarations', done => {
    const code = `
      a sa7 hear me out firstName is "John";
      a sa7 hear me out lastName is "Doe";
      a sa7 hear me out fullName is firstName + " " + lastName;
    `;

    compiler.on(LangKamaEvent.Success, result => {
      expect(result.value).toBe('John Doe');
      done();
    }).interpret(code);
  });
});

describe('Constants errors', () => {
  let compiler;

  beforeEach(() => {
    compiler = new LangKama();
  });

  test('Constant declaration without a value', done => {
    const code = `a sa7 hear me out zero;`;
    compiler.on(LangKamaEvent.Error, error => {
      expect(error.errno).toBe(Errno.UninitializedConstantError)
      done();
    }).interpret(code);
  });

  test('Constant duplication', done => {
    const code = `
      a sa7 hear me out zero is 0;
      a sa7 hear me out zero is 0;
    `;

    compiler.on(LangKamaEvent.Error, error => {
      expect(error.errno).toBe(Errno.VariableDefinedError);
      done();
    }).interpret(code);
  });

  test('Constant reassignment', done => {
    const code = `
    a sa7 hear me out one is 1;
    one is 2;
    `;
    compiler.on(LangKamaEvent.Error, error => {
      expect(error.errno).toBe(Errno.ConstantReassignmentError);
      done();
    }).interpret(code);
  });

  test('Undeclared constant', done => {
    const code = `myVar`;
    compiler.on(LangKamaEvent.Error, error => {
      expect(error.errno).toBe(Errno.VariableNotDefinedError);
      done();
    }).interpret(code);
  });
});