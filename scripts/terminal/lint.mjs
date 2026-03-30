import { exec } from "child_process";
import chalk from "chalk";
import ora from "ora";

const spinner = ora(chalk.magenta("Linting code...")).start();
spinner.color = "magenta";

exec(
  'npx eslint "src/**/*.{ts,tsx}" --fix',
  (error, stdout, stderr) => {
    process.stdout.write("\r\x1b[K");

    if (error) {
      spinner.fail(chalk.bgRed(`ESLint error:\n${stderr || stdout}`));
      process.exit(1);
    } else {
      if (stdout) process.stdout.write(stdout);
      spinner.succeed(chalk.magentaBright("Code linted successfully!"));
    }
  },
);
