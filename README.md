# LangKama

LangKama is a ~~turing~~retard-complete programming language designed for shits and giggles. Below you'll find detailed instructions on how to set up, build, and use LangKama, as well as run tests to ensure everything is working as expected.


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

### LangKama API

For those looking to incorporate LangKama's functionality into their projects, the _API_ is accessible after a successful project build. You can find it at `dist/langkama.cjs`.

```ts
import { Parser } from './frontend/parser';
import { evaluate } from './runtime/interpreter';
import { Environment } from './runtime/environment';


const code = `(1 + 2) * 3`;

try {
  const lexer = new Lexer();
  const parser = new Parser();
  const env = new Environment();

  console.log('Compiling LangKama script...');

  const tokens = lexer.tokenize(code);
  const program = parser.parse(tokens);
  const result = evaluate(program, env);

  console.log('LangKama script compiled!\n');
  console.log({ result });
} catch (err) {
  console.error('LangKama Error');
  console.error(`\t${err}`);
}
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