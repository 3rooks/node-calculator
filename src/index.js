import { InvalidInputError } from '#errors/invalidInputError.js';
import { getOperator } from '#lib/getOperator.js';
import { promptQuestion } from '#lib/promptQuestion.js';

(async () => {
    try {
        const userAnswer = await promptQuestion('intruduce tu operacion: ');

        const standarizeInput = userAnswer.trim();

        if (standarizeInput === '') throw new InvalidInputError();

        const operator = getOperator(standarizeInput);

        if (!operator) throw new InvalidInputError();
    } catch (error) {
        if (error instanceof InvalidInputError) console.log(error.message);
        else console.log(`Error: ${error.message} - Stack: ${error.stack}`);
    }
})();
