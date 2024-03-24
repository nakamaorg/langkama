const Errno = require('../dist/@nakamaorg/langkama.umd.cjs').Errno;
const LangKama = require('../dist/@nakamaorg/langkama.umd.cjs').LangKama;
const LangKamaEvent = require('../dist/@nakamaorg/langkama.umd.cjs').LangKamaEvent;



describe('Arrays', () => {
  let compiler;

  beforeEach(() => {
    compiler = new LangKama();
  });

  test('Array declaration with value 1', done => {
    const code = `
      a sa7 hear me out arr[] is [].
      reda arr.
    `;

    compiler
      .on(LangKamaEvent.Success, result => {
        expect(result.value).toEqual([]);
        done();
      })
      .interpret(code);
  });

  test('Array declaration with value 2', done => {
    const code = `
      a sa7 hear me out arr[] is [1, 2, 3].
      reda arr.
    `;

    compiler
      .on(LangKamaEvent.Success, result => {
        expect(result.value).toEqual([1, 2, 3]);
        done();
      })
      .interpret(code);
  });

  test('Array declaration without value', done => {
    const code = `
      hear me out arr[].
      reda arr.
    `;

    compiler
      .on(LangKamaEvent.Success, result => {
        expect(result.value).toEqual([]);
        done();
      })
      .interpret(code);
  });

  test('Array indexing inbound', done => {
    const code = `
      a sa7 hear me out arr[] is [1, 2, 3].
      reda arr[1].
    `;

    compiler
      .on(LangKamaEvent.Success, result => {
        expect(result.value).toBe(2);
        done();
      })
      .interpret(code);
  });

  test('Array indexing out of bound', done => {
    const code = `
      a sa7 hear me out arr[] is [1, 2, 3].
      reda arr[3].
    `;

    compiler
      .on(LangKamaEvent.Success, result => {
        expect(result.value).toBe(null);
        done();
      })
      .interpret(code);
  });

  test('Array index assignment', done => {
    const code = `
      hear me out arr[] is [1, 2, 3].
      arr[0] is 100.

      reda arr.
    `;

    compiler
      .on(LangKamaEvent.Success, result => {
        expect(result.value).toEqual([100, 2, 3]);
        done();
      })
      .interpret(code);
  });

  test('Array length', done => {
    const code = `
      hear me out arr[] is [1, 2, 3].
      reda length(arr).
    `;

    compiler
      .on(LangKamaEvent.Success, result => {
        expect(result.value).toBe(3);
        done();
      })
      .interpret(code);
  });

  test('Array push 1', done => {
    const code = `
      hear me out arr[].

      push("arr", 0).
      push("arr", 1).
      push("arr", 2).

      reda arr.
    `;

    compiler
      .on(LangKamaEvent.Success, result => {
        expect(result.value).toEqual([0, 1, 2]);
        done();
      })
      .interpret(code);
  });

  test('Array push 2', done => {
    const code = `
      hear me out arr[].
      hear me out i is 0.

      cook until (i = 100) {
        big if true ((i % 2) = 0) {
          push("arr", i).
        }

        i is i + 1.
      }

      reda push("arr", 100).
    `;

    compiler
      .on(LangKamaEvent.Success, result => {
        expect(result.value).toBe(51);
        done();
      })
      .interpret(code);
  });

  test('Array pop 1', done => {
    const code = `
      hear me out arr[] is [1, 2, 3].

      pop("arr").
      pop("arr").

      reda arr.
    `;

    compiler
      .on(LangKamaEvent.Success, result => {
        expect(result.value).toEqual([1]);
        done();
      })
      .interpret(code);
  });

  test('Array pop 2', done => {
    const code = `
      hear me out arr[].
      hear me out i is 0.

      cook until (i = 100) {
        push("arr", i).
        i is i + 1.
      }
      
      i is 0.
      cook until (i = 100) {
        big if true ((i % 2) = 0) {
          pop("arr").
        }

        i is i + 1.
      }

      reda pop("arr").
    `;

    compiler
      .on(LangKamaEvent.Success, result => {
        expect(result.value).toBe(49);
        done();
      })
      .interpret(code);
  });
});

describe('Arrays errors', () => {
  let compiler;

  beforeEach(() => {
    compiler = new LangKama();
  });

  test('Missing close bracket', done => {
    const code = `
      hear me out arr[ is [].
    `;

    compiler
      .on(LangKamaEvent.Error, result => {
        expect(result.errno).toBe(Errno.ExpectedCloseBrackError);
        done();
      })
      .interpret(code);
  });
});