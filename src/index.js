import { promptQuestion } from '#lib/promptQuestion.js';

(async () => {
    const userAnswer = await promptQuestion('intruduce tu operacion: ');
    console.log(userAnswer);
})();
