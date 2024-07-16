import chalk from "chalk";
import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer";
console.log(chalk.yellow.bold.underline("\n\t\t\tCountDown Timer\n"));
const res = await inquirer.prompt({
    type: "number",
    name: "userInput",
    message: chalk.green.italic.bold("please enter amount of second"),
    validate: (input) => {
        if (isNaN(input)) {
            return chalk.magenta.italic.bold("please enter valid number");
        }
        else if (input > 60) {
            return chalk.red.italic.bold("seconds must be in 60");
        }
        else {
            return true;
        }
    }
});
let input = res.userInput;
function startTime(val) {
    const intTime = new Date().setSeconds(new Date().getSeconds() + val);
    const IntervalTime = new Date(intTime);
    setInterval(() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(IntervalTime, currentTime);
        if (timeDiff <= 0) {
            console.log(chalk.bold.italic.bgRedBright("Timer has Expired"));
            process.exit();
        }
        const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDiff % 60);
        console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
    }, 1000);
}
startTime(input);
