#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { createInterface } from 'node:readline';
import { extname, resolve, basename } from 'path';
import { existsSync, readFileSync, statSync } from 'fs';

import chalk from 'chalk';

import {
  version,
  LangKama,
  Environment,
  ErrorManager,
  LangKamaEvent,
  InvalidFileError,
  UnknownFileError
} from './../dist/@nakamaorg/langkama.js';


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
      const compiler = new LangKama();

      compiler
        .on(LangKamaEvent.Success, result => {
          this.#info('LangKama script interpreted!\n');
          this.#info(chalk.green(JSON.stringify(result.value, null, 2)));

          process.exit(0);
        })
        .on(LangKamaEvent.Error, error => { this.#error(error) })
        .on(LangKamaEvent.Stdout, stdout => { this.#info(stdout) })
        .on(LangKamaEvent.Lexer, () => this.#info(`Tokenizing "${fileName}" script...`))
        .on(LangKamaEvent.Parser, tokens => this.#info(`Parsing "${tokens.length}" tokens...`))
        .on(LangKamaEvent.Interpreter, ast => this.#info(`Interpreting "${fileName}" script...`))
        .interpret(code);
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

    const onSuccessCallback = result => {
      this.#info(chalk.green(result.value));
      prompt();
    };

    const onStdoutCallback = stdout => {
      this.#info(stdout);
    };

    const onErrorCallback = error => {
      this.#error(error, false);
      prompt();
    };

    const prompt = () => {
      rl.question('> ', async input => {
        this.startTime = process.hrtime();

        if (input.toLowerCase() === 'exit') {
          rl.close();
        } else {
          const compiler = new LangKama();
          const errorManager = new ErrorManager(onErrorCallback, input);
          env.setErrorCallback(errorManager.raise.bind(errorManager));

          compiler
            .on(LangKamaEvent.Error, onErrorCallback)
            .on(LangKamaEvent.Stdout, onStdoutCallback)
            .on(LangKamaEvent.Success, onSuccessCallback)
            .interpret(input, env);
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