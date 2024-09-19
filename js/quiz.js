import Questions from "./questions.js";
import Question from "./question.js";

class Quiz {
  constructor() {
    this.Questions = [];
    this.questionIndex = -1;
    this.score = 0;
    this.createQuestions();
    this.displayNextQuestion();
  }

  createQuestions() {
    Questions.forEach((question, index) => {
      this.Questions.push(
        new Question(
          index + 1,
          question.question,
          question.answers,
          question.answer,
        ),
      );
    });
  }

  displayNextQuestion() {
    if (this.questionIndex + 1 <= this.Questions.length - 1) {
      this.questionIndex++;
      const newQuestion = this.Questions[this.questionIndex];
      newQuestion.display();
    } else {
      this.displayScore();
    }
  }

  displayPrevQuestion() {
    if (this.questionIndex - 1 >= 0) {
      this.questionIndex--;
      const prevQuestion = this.Questions[this.questionIndex];
      prevQuestion.display();
    }
  }

  displayScore() {
    const scoreTemplate = `
        <h1 style="text-align:center;margin-top: 50%;">Score: ${this.score} / 100</h1>
        <button class="next-button" onClick="location.reload()">Restart</button>
      `;
    document.body.innerHTML = scoreTemplate;
  }
}

const quiz = new Quiz();
export default quiz;
