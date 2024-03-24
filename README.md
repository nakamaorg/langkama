<h1 align="center">LangKama</h1>

<p align="center">
  <img src="https://github.com/nakamaorg/langkama/actions/workflows/test.yml/badge.svg" />
  <img src="https://img.shields.io/github/v/tag/nakamaorg/langkama" />
  <img src="https://img.shields.io/github/license/nakamaorg/langkama" />
</p>

LangKama is a ~~turing~~retard-complete programming language designed for shits and giggles. Below you'll find detailed instructions on how to set up, build, and use LangKama, as well as run tests to ensure everything is working as expected.

## Example

The following is a typical LangKama script:

```php
let me cook factorial(n) {
  hear me out val is 0;

  big if true (n = 0) {
    val is 1;
  } sike {
    val is n * factorial(n - 1);
  }

  reda val;
}

loncina(factorial(5)); bs Outputs: 120
```

More examples can be found inside of the [scripts](./scripts/) directory.

LangKama has an [online interpreter](https://nakamaorg.github.io/langkama-online/) to play with.


## Build

Before diving into LangKama, you need to prepare your environment by installing necessary dependencies.

1. **Install Dependencies**: Open your terminal and navigate to the root directory of your LangKama project. Then, run one of the following commands to install all required dependencies:

    ```bash
      npm i
      # or, if you prefer using pnpm (which you should)
      pnpm i
    ```

2. **Build the Project**: After the installation of dependencies, the project should automatically build. If, for any reason, the build process does not complete successfully, you can manually initiate the build by running:

    ```bash
      npm run build
      # or, using pnpm
      pnpm build
    ```

## Use

LangKama can be utilized in two primary ways: through its _CLI_ for immediate tasks, or via its _API_ for integration with other projects or embedding within applications.

### LangKama CLI

The _CLI_ provides a straightforward method to execute LangKama scripts directly from your terminal. To use it, simply run the `bin/langkama.js` or use the npm pre-configured npm script.

```bash
npm start
# or, using pnpm
pnpm start
```

LangKama _CLI_ offers flexible execution modes to cater to different development needs. You can either execute a LangKama script from a file by passing the file path as an argument or enter an interactive mode with a Read-Eval-Print Loop (_REPL_) by not providing any arguments. Below are the details on how to use both modes.

#### Interpreting a Script File
To run a LangKama script stored in a file, simply pass the path to the file as an argument when launching your application. The syntax for running a script is as follows:

```bash
npm start scripts/math.nkm
# or, using pnpm
pnpm start scripts/math.nkm
```

Replace `scripts/math.nkm` with the actual path to your LangKama script file. Upon execution, the application will interpret the script within the file..

#### Launching the REPL

If you prefer to work interactively or wish to test LangKama expressions on the fly, you can launch the application without any arguments to enter the _REPL_ mode. In this mode, you can input LangKama commands directly and see the results immediately. To enter _REPL_ mode.

```bash
npm start
# or, using pnpm
pnpm start
```

### LangKama API

For those looking to incorporate LangKama's functionality into their projects, the _API_ is accessible after a successful project build. You can find it at `dist/langkama.cjs`.

```ts
import { LangKama } from './main';



const code = `(1 + 2) * 3`;
const compiler = new LangKama();

compiler
  .on(LangKamaEvent.Success, result => {
    console.info('LangKama script interpreted!');
    console.log({ result });
  })
  .on(LangKamaEvent.Error, error => { console.error(error) })
  .on(LangKamaEvent.Stdout, stdout => { console.info(stdout) })
  .on(LangKamaEvent.Lexer, () => console.info(`Tokenizing...`))
  .on(LangKamaEvent.Parser, tokens => console.info(`Parsing...`))
  .on(LangKamaEvent.Interpreter, () => console.info(`Interpreting...`))
  .interpret(code);
```

## Test

To ensure your LangKama setup is functioning correctly, you can run unit tests via:

```bash
npm test
# or, using pnpm
pnpm test
```

## Takeaway

Use [pnpm](https://pnpm.io/). You're missing out.