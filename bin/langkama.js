import { fileURLToPath } from 'url';
import { createInterface } from 'node:readline';
import { extname, resolve, basename } from 'path';
import { existsSync, readFileSync, statSync } from 'fs';

import LangKama from './../dist/langkama.cjs';



/**
 * @description
 * LangKama command line tool
 */
class Cmd {

  /**
   * @description
   * Logs text to stdout stream
   *
   * @param {string} text The text to log
   */
  static #info(text) {
    process.stdout.write(`${text}\n`);
  }

  /**
   * @description
   * Logs error to stderr stream
   *
   * @param {LangKamaError} error The error to log
   */
  static #error(error) {
    process.stderr.write(`${error.toString()}\n`);
    process.exit(error.errno);
  }

  /**
   * @description
   * Kick starts LangKama compilation for a file
   *
   * @param {string} filePath  The path to the LangKama source file
   */
  static interpret(filePath) {
    try {
      const fullPath = resolve(filePath);

      if (!existsSync(fullPath)) {
        throw new LangKama.UnknownFileError(fullPath);
      }

      const fileName = basename(fullPath);
      const fileStats = statSync(fullPath);

      if (extname(fullPath) !== '.nkm' || fileStats.isDirectory()) {
        throw new LangKama.InvalidFileError(fileName);
      }

      this.#info(`Loading "${fileName}" script...`);
      const bytes = readFileSync(fullPath);
      const code = bytes.toString();

      this.#info(`Tokenizing "${fileName}" script...`);
      const lexer = new LangKama.Lexer();
      const tokens = lexer.tokenize(code);

      this.#info(`Parsing "${fileName}" script...`);
      const parser = new LangKama.Parser();
      const program = parser.parse(tokens);

      this.#info(`Interpreting "${fileName}" script...`);
      const env = new LangKama.Environment();
      const result = LangKama.evaluate(program, env);

      this.#info('LangKama script compiled!\n');
      this.#info(result.value);

      process.exit(0);
    } catch (err) {
      this.#error(err);
    }
  }

  /**
   * @description
   * LangKama REPL
  */
  static #repl() {
    const lexer = new LangKama.Lexer();
    const parser = new LangKama.Parser();
    const env = new LangKama.Environment();

    const rl = createInterface({ input: process.stdin, output: process.stdout });
    const prompt = () => {
      rl.question('> ', input => {
        if (input.toLowerCase() === 'exit') {
          rl.close();
        } else {
          const tokens = lexer.tokenize(input);
          const program = parser.parse(tokens);
          const result = LangKama.evaluate(program, env);

          this.#info(result.value);
          prompt();
        }
      });
    }

    this.#info('--- LangKama v0.0.1 ---');
    prompt();
  }

  static main() {
    if (process.argv.length > 2) {
      this.interpret(process.argv[2]);
    } else {
      this.#repl();
    }
  }
}

const mainModuleFilePath = process.argv[1];
const currentFileUrl = fileURLToPath(import.meta.url);

if (currentFileUrl === mainModuleFilePath) {
  Cmd.main();
}