const Errno = require('../dist/langkama.umd.cjs').Errno;
const LangKama = require('../dist/langkama.umd.cjs').LangKama;
const LangKamaEvent = require('../dist/langkama.umd.cjs').LangKamaEvent;



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