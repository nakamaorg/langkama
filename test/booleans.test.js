const Errno = require('../dist/langkama.umd.cjs').Errno;
const LangKama = require('../dist/langkama.umd.cjs').LangKama;
const LangKamaEvent = require('../dist/langkama.umd.cjs').LangKamaEvent;



describe('Booleans', () => {
  let compiler;

  beforeEach(() => {
    compiler = new LangKama();
  });

  test('Truthy value', done => {
    const code = `
      reda W;
    `;

    compiler
      .on(LangKamaEvent.Success, result => {
        expect(result.value).toBe(true);
        done();
      })
      .interpret(code);
  });

  test('Falsy value', done => {
    const code = `
      reda L;
    `;

    compiler
      .on(LangKamaEvent.Success, result => {
        expect(result.value).toBe(false);
        done();
      })
      .interpret(code);
  });

  test('Equality operator 1', done => {
    const code = `
      a sa7 hear me out a is 1;
      a sa7 hear me out b is 2;
      
      reda a = b;
    `;

    compiler
      .on(LangKamaEvent.Success, result => {
        expect(result.value).toBe(false);
        done();
      })
      .interpret(code);
  });

  test('Equality operator 2', done => {
    const code = `
      a sa7 hear me out a is 1;
      a sa7 hear me out b is 1;
      
      reda a = b;
    `;

    compiler
      .on(LangKamaEvent.Success, result => {
        expect(result.value).toBe(true);
        done();
      })
      .interpret(code);
  });

  test('Not operator 1', done => {
    const code = `
      reda !W;
    `;

    compiler
      .on(LangKamaEvent.Success, result => {
        expect(result.value).toBe(false);
        done();
      })
      .interpret(code);
  });

  test('Not operator 2', done => {
    const code = `
      reda !L;
    `;

    compiler
      .on(LangKamaEvent.Success, result => {
        expect(result.value).toBe(true);
        done();
      })
      .interpret(code);
  });

  test('Not operator 2', done => {
    const code = `
      a sa7 hear me out a is 1;
      a sa7 hear me out b is 2;
      
      reda !(b = a);
    `;

    compiler
      .on(LangKamaEvent.Error, err => {
        console.log(err.toString());
      })
      .on(LangKamaEvent.Success, result => {
        console.log({ result });
        expect(result.value).toBe(true);
        done();
      })
      .interpret(code);
  });

  test('And operator 1', done => {
    const code = `
      reda L & W;
    `;

    compiler
      .on(LangKamaEvent.Success, result => {
        expect(result.value).toBe(false);
        done();
      })
      .interpret(code);
  });
  
  test('And operator 2', done => {
    const code = `
      reda W & W;
    `;

    compiler
      .on(LangKamaEvent.Success, result => {
        expect(result.value).toBe(true);
        done();
      })
      .interpret(code);
  });
  
  test('And operator 3', done => {
    const code = `
      reda L & L;
    `;

    compiler
      .on(LangKamaEvent.Success, result => {
        expect(result.value).toBe(false);
        done();
      })
      .interpret(code);
  });

  test('Or operator 1', done => {
    const code = `
      reda L | W;
    `;

    compiler
      .on(LangKamaEvent.Success, result => {
        expect(result.value).toBe(true);
        done();
      })
      .interpret(code);
  });
  
  test('Or operator 2', done => {
    const code = `
      reda W | W;
    `;

    compiler
      .on(LangKamaEvent.Success, result => {
        expect(result.value).toBe(true);
        done();
      })
      .interpret(code);
  });
  
  test('Or operator 3', done => {
    const code = `
      reda L | L;
    `;

    compiler
      .on(LangKamaEvent.Success, result => {
        expect(result.value).toBe(false);
        done();
      })
      .interpret(code);
  });
});