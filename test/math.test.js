const Errno = require('../dist/@nakamaorg/langkama.umd.cjs').Errno;
const LangKama = require('../dist/@nakamaorg/langkama.umd.cjs').LangKama;
const LangKamaEvent = require('../dist/@nakamaorg/langkama.umd.cjs').LangKamaEvent;



describe('Maths and arithmetics', () => {
  let compiler;

  beforeEach(() => {
    compiler = new LangKama();
  });

  test('Addition', done => {
    const code = `1 + 2`;

    compiler.on(LangKamaEvent.Success, result => {
      expect(result.value).toBe(3);
      done();
    }).interpret(code);
  });

  test('Subtraction', done => {
    const code = `1 - 2`;

    compiler.on(LangKamaEvent.Success, result => {
      expect(result.value).toBe(-1);
      done();
    }).interpret(code);
  });

  test('Multiplication', done => {
    const code = `2 * 4`;

    compiler.on(LangKamaEvent.Success, result => {
      expect(result.value).toBe(8);
      done();
    }).interpret(code);
  });

  test('Division', done => {
    const code = `3 / 2`;

    compiler.on(LangKamaEvent.Success, result => {
      expect(result.value).toBe(1.5);
      done();
    }).interpret(code);
  });

  test('Modulo', done => {
    const code = `8 % 2`;

    compiler.on(LangKamaEvent.Success, result => {
      expect(result.value).toBe(0);
      done();
    }).interpret(code);
  });

  test('Multiplication precedence 1', done => {
    const code = `1 - 2 * 3`;

    compiler.on(LangKamaEvent.Success, result => {
      expect(result.value).toBe(-5);
      done();
    }).interpret(code);
  });

  test('Multiplication precedence 2', done => {
    const code = `(1 - 2) * 3`;

    compiler.on(LangKamaEvent.Success, result => {
      expect(result.value).toBe(-3);
      done();
    }).interpret(code);
  });

  test('Multiplication precedence 3', done => {
    const code = `(1 - 7 * (1 - 2)) * 3`;

    compiler.on(LangKamaEvent.Success, result => {
      expect(result.value).toBe(24);
      done();
    }).interpret(code);
  });

  test('Division precedence 1', done => {
    const code = `2 - 3 / 3`;

    compiler.on(LangKamaEvent.Success, result => {
      expect(result.value).toBe(1);
      done();
    }).interpret(code);
  });

  test('Division precedence 2', done => {
    const code = `(9 - 3) / 4`;

    compiler.on(LangKamaEvent.Success, result => {
      expect(result.value).toBe(1.5);
      done();
    }).interpret(code);
  });

  test('Division precedence 3', done => {
    const code = `(1 - 0 / (7 - 2)) / 4`;

    compiler.on(LangKamaEvent.Success, result => {
      expect(result.value).toBe(0.25);
      done();
    }).interpret(code);
  });

  test('Modulo precedence 1', done => {
    const code = `5 + 3 % 2`;

    compiler.on(LangKamaEvent.Success, result => {
      expect(result.value).toBe(6);
      done();
    }).interpret(code);
  });

  test('Modulo precedence 2', done => {
    const code = `(2 - 7) % 2`;

    compiler.on(LangKamaEvent.Success, result => {
      expect(result.value).toBe(-1);
      done();
    }).interpret(code);
  });

  test('Modulo precedence 3', done => {
    const code = `(1 - 3 % (10 - 1)) % 2`;

    compiler.on(LangKamaEvent.Success, result => {
      expect(result.value).toBe(-0);
      done();
    }).interpret(code);
  });

  test('Complex 1', done => {
    const code = `(8 * 3 + 9) % 7 - (4 / 2)`;

    compiler.on(LangKamaEvent.Success, result => {
      expect(result.value).toBe(3);
      done();
    }).interpret(code);
  });

  test('Complex 2', done => {
    const code = `(15 + 6 - 3) * 2 % 5 / 4`;

    compiler.on(LangKamaEvent.Success, result => {
      expect(result.value).toBe(0.25);
      done();
    }).interpret(code);
  });

  test('Complex 3', done => {
    const code = `(100 % 33 - 12) * 4 + 7 / (2 - 1)`;

    compiler.on(LangKamaEvent.Success, result => {
      expect(result.value).toBe(-37);
      done();
    }).interpret(code);
  });
});

describe('Maths and arithmetics errors', () => {
  let compiler;

  beforeEach(() => {
    compiler = new LangKama();
  });

  test('Incomplete operation', done => {
    const code = `1 +`;

    compiler.on(LangKamaEvent.Error, error => {
      expect(error.errno).toBe(Errno.IncompleteExpressionError);
      done();
    }).interpret(code);
  });

  test('Arithmetics on different data types', done => {
    const code = `1 + "2"`;

    compiler.on(LangKamaEvent.Error, error => {
      expect(error.errno).toBe(Errno.UnmatchingTypesError);
      done();
    }).interpret(code);
  });
});