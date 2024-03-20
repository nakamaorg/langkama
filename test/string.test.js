const Errno = require('../dist/@nakamaorg/langkama.umd.cjs').Errno;
const LangKama = require('../dist/@nakamaorg/langkama.umd.cjs').LangKama;
const LangKamaEvent = require('../dist/@nakamaorg/langkama.umd.cjs').LangKamaEvent;



describe('Strings', () => {
  let compiler;

  beforeEach(() => {
    compiler = new LangKama();
  });

  test('String value', done => {
    const code = `"John"`;

    compiler.on(LangKamaEvent.Success, result => {
      expect(result.value).toBe('John');
      done();
    }).interpret(code);
  });

  test('String with spaces', done => {
    const code = `"John Doe"`;

    compiler.on(LangKamaEvent.Success, result => {
      expect(result.value).toBe('John Doe');
      done();
    }).interpret(code);
  });

  test('String concatenation', done => {
    const code = `"John" + " " + "Doe"`;

    compiler.on(LangKamaEvent.Success, result => {
      expect(result.value).toBe('John Doe');
      done();
    }).interpret(code);
  });
});

describe('Strings errors', () => {
  let compiler;

  beforeEach(() => {
    compiler = new LangKama();
  });

  test('Incomplete operation', done => {
    const code = `"John" +`;

    compiler.on(LangKamaEvent.Error, error => {
      expect(error.errno).toBe(Errno.IncompleteExpressionError);
      done();
    }).interpret(code);
  });

  test('String concatenation with non string type', done => {
    const code = `"John" + 1`;

    compiler.on(LangKamaEvent.Error, error => {
      expect(error.errno).toBe(Errno.UnmatchingTypesError);
      done();
    }).interpret(code);
  });
});