const Errno = require('../dist/@nakamaorg/langkama.umd.cjs').Errno;
const LangKama = require('../dist/@nakamaorg/langkama.umd.cjs').LangKama;
const LangKamaEvent = require('../dist/@nakamaorg/langkama.umd.cjs').LangKamaEvent;



describe('Functions', () => {
  let compiler;

  beforeEach(() => {
    compiler = new LangKama();
  });

  test('Function definition', done => {
    const code = `
      let me cook add(a, b) {
        reda a + b;
      }

      add(1, 2);
    `;

    compiler
      .on(LangKamaEvent.Success, result => {
        expect(result.value).toBe(3);
        done();
      })
      .interpret(code);
  });
});