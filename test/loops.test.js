const Errno = require('../dist/@nakamaorg/langkama.umd.cjs').Errno;
const LangKama = require('../dist/@nakamaorg/langkama.umd.cjs').LangKama;
const LangKamaEvent = require('../dist/@nakamaorg/langkama.umd.cjs').LangKamaEvent;



describe('Loops', () => {
  let compiler;

  beforeEach(() => {
    compiler = new LangKama();
  });

  test('Loop statement', done => {
    const code = `
      hear me out index is 0;
      hear me out sum is 0;

      cook until (index = 10) {
        sum is sum + index;
        index is index + 1;
      }
      
      reda sum;
    `;

    compiler
      .on(LangKamaEvent.Success, result => {
        expect(result.value).toBe(45);
        done();
      })
      .interpret(code);
  });
});

describe('Loops errors', () => {
  let compiler;

  beforeEach(() => {
    compiler = new LangKama();
  });

  test('Missing open brace', done => {
    const code = `
      cook until (W)
        loncina("this should not be reached");
      }
    `;

    compiler
      .on(LangKamaEvent.Error, result => {
        expect(result.errno).toBe(Errno.ExpectedOpenBraceError);
        done();
      })
      .interpret(code);
  });
});