import { exec } from "child_process";
import chalk from "chalk";
import ora from "ora";

const spinner = ora(chalk.cyan("Formatting code...")).start();
spinner.color = "cyan";

exec(
  'npx prettier --write "src/**/*.{ts,tsx}"',
  (error, stdout, stderr) => {
    process.stdout.write("\r\x1b[K");

    if (error) {
      spinner.fail(chalk.bgRed(`Prettier error:\n${stderr}`));
      process.exit(1);
    } else {
      if (stdout) process.stdout.write(stdout);
      spinner.succeed(chalk.cyanBright("Code formatted successfully!"));
    }
  },
);
