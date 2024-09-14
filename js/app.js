import Questions from './questions.js';

const questionCounterEl = document.querySelector('.question-counter');
const questionTextEl = document.querySelector('.question');
const answersTextEl = document.querySelectorAll('.answer .text');

const answersEl = document.querySelectorAll('.answer');
const nextBtn = document.querySelector('.next-button');
const previousBtnEl = document.querySelector('header button');



class Quizz {
  constructor(Questions) {
    this.questions = Questions;
    this.questionIndex = 0;
    this.currentQuestion = this.questions[this.questionIndex];
    this.correctAnswers = 0;
    this.displayCurrentQuestion();
  }

  nextQuestion() {
    if ((this.questionIndex + 1) > 0 && (this.questionIndex + 1) <= 9) {
      this.questionIndex++;
      this.currentQuestion = this.questions[this.questionIndex];
    } else {
      return "end";
    }
    clearAnswerSelections();
    this.displayCurrentQuestion();
  }

  previousQuestion() {
    if ((this.questionIndex - 1) >= 0 && (this.questionIndex - 1) <= 8) {
      this.questionIndex--;
      this.currentQuestion = this.questions[this.questionIndex];
    } else {
      return "end";
    }
    clearAnswerSelections();
    this.displayCurrentQuestion();
  }

  displayCurrentQuestion() {
    // if the current question is not the first question show the previous button
    if (this.questionIndex > 0)
      previousBtnEl.style.display = "block";
    else
      previousBtnEl.style.display = "none";

    // Show the current question index
    questionCounterEl.innerText = `${this.questionIndex + 1}/${this.questions.length}`

    // Show the current question
    questionTextEl.innerText = `${this.currentQuestion.question}`;

    // Show the answers of the current question
    answersTextEl.forEach((span, index) => {
      span.innerText = this.currentQuestion.answers[index];
    })
  }

  checkAnswer(answer) {
    if (answer === this.currentQuestion.answer) {
      this.correctAnswers++;
      return true;
    }
    else
      return false;
  }

}

const quiz = new Quizz(Questions);

answersEl.forEach((el) => {
  el.addEventListener('click', (e) => {
    const result = quiz.checkAnswer(e.target.innerText);
    if (result) {
      e.target.classList.add("checked");
    } else {
      e.target.classList.add("falsechecked");
      setTimeout(() => {
        showCorrectAnswer();
      }, 500);
    }
  });
})

nextBtn.addEventListener('click', () => quiz.nextQuestion());
previousBtnEl.addEventListener('click', () => quiz.previousQuestion());

function showCorrectAnswer() {
  answersEl.forEach(el => {
    const result = quiz.checkAnswer(el.innerText);
    if (result)
      el.classList.add("checked");
  })
}

function clearAnswerSelections() {
  answersEl.forEach(el => {
    el.classList.remove("checked");
    el.classList.remove("falsechecked");
  })
}
