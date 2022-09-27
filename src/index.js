import { OPERATIONS } from '#constants/operations.js';
import { BINARY_OPERATORS } from '#constants/operators.js';
import { InvalidInputError } from '#errors/invalidInputError.js';
import { getBinaryOperatings, getSingleOperating } from '#lib/getOperatings.js';
import { getOperator } from '#lib/getOperator.js';
import { promptQuestion } from '#lib/promptQuestion.js';

(async () => {
    try {
        const userAnswer = await promptQuestion('intruduce tu operacion: ');

        const standarizeInput = userAnswer.trim();

        if (!standarizeInput) throw new InvalidInputError();

        const operator = getOperator(standarizeInput);

        if (!operator) throw new InvalidInputError();

        const splittedInput = standarizeInput.split(operator);

        let firstOperating, secondOperating;

        if (BINARY_OPERATORS.includes(operator))
            [firstOperating, secondOperating] =
                getBinaryOperatings(splittedInput);
        else [firstOperating] = getSingleOperating(splittedInput);

        const result = OPERATIONS[operator](firstOperating, secondOperating);

        const roundedResult = Number(Math.round(result + 'e+5') + 'e-5');

        if (isNaN(roundedResult) || !isFinite(roundedResult))
            console.log('OPERACION NO VALIDA');
        else console.log(`El resultado es: ${roundedResult}`);
    } catch (error) {
        if (error instanceof InvalidInputError) console.log(error.message);
        else console.log(`Error: ${error.message} - Stack: ${error.stack}`);
    }
})();
