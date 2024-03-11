import { fileURLToPath } from 'url';
import { createInterface } from 'node:readline';
import { extname, resolve, basename } from 'path';
import { existsSync, readFileSync, statSync } from 'fs';

import chalk from 'chalk';

import {
  version,
  LangKama,
  Lifecycle,
  Environment,
  InvalidFileError,
  UnknownFileError
} from './../dist/langkama.js';


/**
 * @description
 * LangKama command line tool
 */
class Cmd {

  /**
   * @description
   * Execution time
   */
  static startTime = process.hrtime();

  /**
   * @description
   * Logs text to stdout stream
   *
   * @param {string} text The text to log
   * @param {boolean} time Whether to include the execution time or not
   */
  static #info(text, time = true) {
    if (time) {
      const elapsed = process.hrtime(this.startTime);
      const elapsedSeconds = elapsed[0] + elapsed[1] / 1e9;
      const elapsedSecondslabel = chalk.yellow(`[${elapsedSeconds.toFixed(5)}s]`);

      process.stdout.write(`${elapsedSecondslabel} ${text}\n`);
    } else {
      process.stdout.write(`${text}\n`);
    }
  }

  /**
   * @description
   * Logs error to stderr stream
   *
   * @param {LangKamaError} error The error to log
   * @param {boolean} exit Whether to exit the process or not
   */
  static #error(error, exit = true) {
    const elapsed = process.hrtime(this.startTime);
    const elapsedSeconds = elapsed[0] + elapsed[1] / 1e9;

    process.stderr.write(chalk.bgRed(`[${chalk.yellow(elapsedSeconds.toFixed(5))}s] LangKama Error \n`));
    process.stderr.write(chalk.red(`${error.toString()}\n`));

    if (exit) {
      process.exit(error.errno);
    }
  }

  /**
   * @description
   * Kick starts LangKama compilation for a file
   *
   * @param {string} filePath  The path to the LangKama source file
   */
  static async interpret(filePath) {
    try {
      this.startTime = process.hrtime();
      this.#info(`--- ${chalk.bgWhite(` LangKama v${version} Interpreter `)} ---`, false);

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

      const onLifecycle = lifecycle => {
        switch (lifecycle) {
          case Lifecycle.Lexing: {
            this.#info(`Tokenizing "${fileName}" script...`);
            break;
          }

          case Lifecycle.Parsing: {
            this.#info(`Parsing "${fileName}" script...`);
            break;
          }

          case Lifecycle.Interpreting: {
            this.#info(`Interpreting "${fileName}" script...`);
            break;
          }
        }
      }

      const result = await LangKama.interpret(code, null, onLifecycle);

      this.#info('LangKama script compiled!\n');
      this.#info(chalk.green(result.value));

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
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    const env = new Environment();

    const prompt = () => {
      rl.question('> ', async input => {
        this.startTime = process.hrtime();

        if (input.toLowerCase() === 'exit') {
          rl.close();
        } else {
          try {
            const result = await LangKama.interpret(input, env);
            this.#info(chalk.green(result.value));
          } catch (err) {
            this.#error(err, false);
          } finally {
            prompt();
          }
        }
      });
    }

    this.#info(`--- ${chalk.bgWhite(` LangKama v${version} REPL `)} ---`, false);
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