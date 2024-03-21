const Errno = require('../dist/@nakamaorg/langkama.umd.cjs').Errno;
const LangKama = require('../dist/@nakamaorg/langkama.umd.cjs').LangKama;
const LangKamaEvent = require('../dist/@nakamaorg/langkama.umd.cjs').LangKamaEvent;



describe('Conditions', () => {
  let compiler;

  beforeEach(() => {
    compiler = new LangKama();
  });

  test('If statement 1', done => {
    const code = `
      a sa7 hear me out a is 10;
      hear me out value is L;

      big if true (a > 20) {
        value is W;
      }
      
      reda value;
    `;

    compiler
      .on(LangKamaEvent.Success, result => {
        expect(result.value).toBe(false);
        done();
      })
      .interpret(code);
  });

  test('If statement 2', done => {
    const code = `
        a sa7 hear me out a is 10;
        hear me out value is L;
  
        big if true (a < 20) {
          value is W;
        }
        
        reda value;
      `;

    compiler
      .on(LangKamaEvent.Success, result => {
        expect(result.value).toBe(true);
        done();
      })
      .interpret(code);
  });

  test('If else statement 1', done => {
    const code = `
        a sa7 hear me out age is 21;
        a sa7 hear me out entryAge is 18;
        hear me out value is L;
  
        big if true (age > entryAge) {
          value is W;
        } sike {
          value is L;
        }
        
        reda value;
      `;

    compiler
      .on(LangKamaEvent.Success, result => {
        expect(result.value).toBe(true);
        done();
      })
      .interpret(code);
  });
 
  test('If else statement 2', done => {
    const code = `
        a sa7 hear me out age is 21;
        a sa7 hear me out entryAge is 18;
        hear me out value is L;
  
        big if true (age < entryAge) {
          value is W;
        } sike {
          value is L;
        }
        
        reda value;
      `;

    compiler
      .on(LangKamaEvent.Success, result => {
        expect(result.value).toBe(false);
        done();
      })
      .interpret(code);
  });
 
  test('If else statement 3', done => {
    const code = `
        a sa7 hear me out age is 21;
        a sa7 hear me out entryAge is 18;
        hear me out value is L;
  
        big if true (age = entryAge) {
          value is 50;
        } jk (age > entryAge) {
          value is 100;
        } sike {
          value is 0;
        }
        
        reda value;
      `;

    compiler
      .on(LangKamaEvent.Success, result => {
        expect(result.value).toBe(100);
        done();
      })
      .interpret(code);
  });
});

describe('Condition errors', () => {
  let compiler;

  beforeEach(() => {
    compiler = new LangKama();
  });

  test('Missing open brace', done => {
    const code = `
      big if true(W)
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