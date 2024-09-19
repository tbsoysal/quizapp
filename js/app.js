import Questions from "./questions.js";

const questionCounterEl = document.querySelector(".question-counter");
const questionTextEl = document.querySelector(".question");
const answersTextEl = document.querySelectorAll(".answer .text");

const answersEl = document.querySelectorAll(".answer");
const nextBtn = document.querySelector(".next-button");
const previousBtnEl = document.querySelector("header button");

class Quiz {
  constructor(Questions) {
    this.questions = Questions;
    this.questionIndex = 0;
    this.currentQuestion = this.questions[this.questionIndex];
    this.correctAnswers = 0;
    this.startQuiz();
  }

  startQuiz() {
    this.displayCurrentQuestion();
    this.addListenersToQuestionButtons();
  }

  addListenersToQuestionButtons() {
    answersEl.forEach((el) => {
      el.addEventListener("click", (e) => {
        const result = this.checkAnswer(e.currentTarget.innerText);
        if (result) {
          e.currentTarget.classList.add("checked");
        } else {
          e.currentTarget.classList.add("falsechecked");
          setTimeout(() => {
            this.showCorrectAnswer();
          }, 500);
        }
      });
    });

    nextBtn.addEventListener("click", () => this.nextQuestion());
    previousBtnEl.addEventListener("click", () => this.previousQuestion());
  }

  showCorrectAnswer() {
    answersEl.forEach((el) => {
      if (el.innerText === this.currentQuestion.answer)
        el.classList.add("checked");
    });
  }

  clearAnswerSelections() {
    answersEl.forEach((el) => {
      el.classList.remove("checked");
      el.classList.remove("falsechecked");
    });
  }

  nextQuestion() {
    if (this.questionIndex + 1 > 0 && this.questionIndex + 1 <= 9) {
      this.questionIndex++;
      this.currentQuestion = this.questions[this.questionIndex];
    } else {
      return "end";
    }
    this.clearAnswerSelections();
    this.displayCurrentQuestion();
  }

  previousQuestion() {
    if (this.questionIndex - 1 >= 0 && this.questionIndex - 1 <= 8) {
      this.questionIndex--;
      this.currentQuestion = this.questions[this.questionIndex];
    } else {
      return "end";
    }
    this.clearAnswerSelections();
    this.displayCurrentQuestion();
  }

  displayCurrentQuestion() {
    // if the current question is not the first question show the previous button
    if (this.questionIndex > 0) previousBtnEl.style.display = "block";
    else previousBtnEl.style.display = "none";

    // Show the current question index
    questionCounterEl.innerText = `${this.questionIndex + 1}/${this.questions.length}`;

    // Show the current question
    questionTextEl.innerText = `${this.currentQuestion.question}`;

    // Show the answers of the current question
    answersTextEl.forEach((span, index) => {
      span.innerText = this.currentQuestion.answers[index];
    });

    if (this.questionIndex === 9) {
      nextBtn.innerText = "Finish";
      nextBtn.addEventListener("click", () => this.showScore());
    }
  }

  showScore() {
    document.body.innerHTML = `<h1 style="text-align: center;margin-top: 50%;">Your Score: ${this.correctAnswers * 10} / 100</h1>`;
    const restartBtn = document.createElement("button");
    restartBtn.innerText = "Restart";
    restartBtn.classList.add("next-button");
    document.body.append(restartBtn);
    restartBtn.addEventListener("click", () => location.reload());
  }

  checkAnswer(answer) {
    if (answer === this.currentQuestion.answer) {
      this.correctAnswers++;
      return true;
    } else return false;
  }
}

const quiz = new Quiz(Questions);
