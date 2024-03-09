import { fileURLToPath } from 'url';
import { createInterface } from 'node:readline';
import { extname, resolve, basename } from 'path';
import { existsSync, readFileSync, statSync } from 'fs';

import chalk from 'chalk';

import {
  InvalidFileError,
  UnknownFileError,
  Lexer,
  Parser,
  Environment,
  evaluate
} from './../dist/langkama.js';


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
    process.stderr.write(chalk.bgRed(' LangKama Error \n'));
    process.stderr.write(chalk.red(`${error.toString()}\n`));
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
        throw new UnknownFileError(fullPath);
      }

      const fileName = basename(fullPath);
      const fileStats = statSync(fullPath);

      if (extname(fullPath) !== '.nkm' || fileStats.isDirectory()) {
        throw new InvalidFileError(fileName);
      }

      this.#info(`Loading "${fileName}" script...`);
      const bytes = readFileSync(fullPath);
      const code = bytes.toString();

      this.#info(`Tokenizing "${fileName}" script...`);
      const lexer = new Lexer();
      const tokens = lexer.tokenize(code);

      this.#info(`Parsing "${fileName}" script...`);
      const parser = new Parser();
      const program = parser.parse(tokens);

      this.#info(`Interpreting "${fileName}" script...`);
      const env = new Environment();
      const result = evaluate(program, env);

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
    const lexer = new Lexer();
    const parser = new Parser();
    const env = new Environment();

    const rl = createInterface({ input: process.stdin, output: process.stdout });
    const prompt = () => {
      rl.question('> ', input => {
        if (input.toLowerCase() === 'exit') {
          rl.close();
        } else {
          try {
            const tokens = lexer.tokenize(input);
            const program = parser.parse(tokens);
            const result = evaluate(program, env);

            this.#info(chalk.green(result.value));
          } catch (err) {
            this.#error(err);
          } finally {
            prompt();
          }
        }
      });
    }

    this.#info(`--- ${chalk.bgWhite(' LangKama v0.0.1 ')} ---`);
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