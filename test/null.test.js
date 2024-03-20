const Errno = require('../dist/@nakamaorg/langkama.umd.cjs').Errno;
const LangKama = require('../dist/@nakamaorg/langkama.umd.cjs').LangKama;
const LangKamaEvent = require('../dist/@nakamaorg/langkama.umd.cjs').LangKamaEvent;



describe('Null', () => {
  let compiler;

  beforeEach(() => {
    compiler = new LangKama();
  });

  test('Nullish value', done => {
    const code = `
      reda bruh;
    `;

    compiler
    .on(LangKamaEvent.Success, result => {
      expect(result.value).toBe(null);
      done();
    })
      .interpret(code);
  });
});