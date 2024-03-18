const Errno = require('../dist/langkama.umd.cjs').Errno;
const LangKama = require('../dist/langkama.umd.cjs').LangKama;
const LangKamaEvent = require('../dist/langkama.umd.cjs').LangKamaEvent;



describe('Functions', () => {
  let compiler;

  beforeEach(() => {
    compiler = new LangKama();
  });

  test('Function definition', done => {
    const code = `
      bs printing 'Hello, World!' statement
      loncina("Hello, World!");
    `;

    compiler.on(LangKamaEvent.Success, result => {
        expect(result.value).toBe(null);
        done();
      })
      .interpret(code);
  });
});