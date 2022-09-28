import { BLUE, GREEN, RED } from '#constants/colors.js';
import { OPERATIONS } from '#constants/operations.js';
import { InvalidInputError } from '#errors/invalidInputError.js';
import { extractByRegex } from '#lib/extractByRegex.js';
import { promptQuestion } from '#lib/promptQuestion.js';

export const bootstrap = async () => {
    try {
        const userAnswer = await promptQuestion('TYPE YOUR OPERATION: ');

        const standarizeInput = userAnswer.trim().replaceAll(',', '.');

        if (!standarizeInput) throw new InvalidInputError();

        if (standarizeInput === 'exit') return true;

        const [firstOperating, operator, secondOperating] =
            extractByRegex(standarizeInput);

        const result = OPERATIONS[operator](firstOperating, secondOperating);

        const roundedResult = Number(Math.round(result + 'e+5') + 'e-5');

        if (isNaN(roundedResult) || !isFinite(roundedResult))
            console.log(BLUE, 'INVALID OPERATION\n');
        else console.log(GREEN, `RESULT: ${roundedResult}\n`);
    } catch (error) {
        if (error instanceof InvalidInputError)
            console.log(RED, `${error.message}\n`);
        else console.log(`Error: ${error.message} - Stack: ${error.stack}`);
    }
};
