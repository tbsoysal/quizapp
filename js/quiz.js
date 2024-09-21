import Questions from "./questions.js";

class Quiz {
  constructor(Questions) {
    this.questions = Questions;
    this.questionIndex = 0;
    this.currentQuestion = this.questions[this.questionIndex];
    this.score = 0;
    this.userAnswersTemplates = [];
  }

  displayQuestion() {
    const currentQuestion = this.questions[this.questionIndex];
    // create question
    const questionTemplate = this.userAnswersTemplates[this.questionIndex] ? this.userAnswersTemplates[this.questionIndex] : `
    <header>
        ${this.questionIndex > 0 ? `<button type="button" class="prev-button"><i class="fa-solid fa-angle-left"></i>Previous</button>` : ""}
        <p class="question-counter">${this.questionIndex + 1}/10</p>
      </header>
      <main class="question-container">
        <p class="question">${currentQuestion.question}</p>
      </main>
      <ul class="answers-container">
        <li class="answer"><span class="text">${currentQuestion.answers[0]}</span><span class="checkbox"></span></li>
        <li class="answer"><span class="text">${currentQuestion.answers[1]}</span><span class="checkbox"></span></li>
        <li class="answer"><span class="text">${currentQuestion.answers[2]}</span><span class="checkbox"></span></li>
        <li class="answer"><span class="text">${currentQuestion.answers[3]}</span><span class="checkbox"></span></li>
      </ul>
      <button class="next-button" type="button">${this.questionIndex < 9 ? `Next` : `Finish`}</button>
    `;

    // show the question on DOM
    document.body.innerHTML = questionTemplate;

    // add event listener for next and prev buttons
    const nextBtn = document.querySelector('.next-button');
    const prevBtn = document.querySelector('.prev-button');
    nextBtn.addEventListener("click", () => this.displayNext());
    // if previous button exsists
    if (prevBtn)
      prevBtn.addEventListener("click", () => this.displayPrev());

    // add event listeners for answer clicks
    const answerElements = document.querySelectorAll(".answer");
    answerElements.forEach((answerEl) => {
      answerEl.addEventListener("click", (e) => {
        // check if clicked element already clicked
        if (
          !(
            answerEl.classList.contains("checked") ||
            answerEl.classList.contains("falsechecked")
          )
        ) {
          if (this.checkAnswer(e.currentTarget.innerText)) {
            answerEl.classList.add("checked"); // highlight the selected answer with green
            this.score += 10;
          } else {
            answerEl.classList.add("falsechecked"); // highlight the selected answer with red
          }
        }

        // show the answer after 500 ms
        setTimeout(() => {
          this.showAnswer();
          this.userAnswersTemplates.push(document.body.innerHTML);
        }, 500);

      });
    });
  }

  displayNext() {
    if (this.questionIndex < this.questions.length - 1) {
      this.questionIndex++;
      this.currentQuestion = this.questions[this.questionIndex];
      this.displayQuestion();
    } else this.displayScore();
  }

  displayPrev() {
    if (this.questionIndex > 0) {
      this.questionIndex--;
      this.currentQuestion = this.questions[this.questionIndex];
      this.displayQuestion();
    }
  }

  checkAnswer(userAnswer) {
    const correctAnswer = this.currentQuestion.answer;
    if (userAnswer === correctAnswer)
      return true;
    else
      return false
  }

  showAnswer() {
    const correctAnswer = this.currentQuestion.answer;
    const answerElements = document.querySelectorAll(".answer");
    answerElements.forEach((element) => {
      if (element.innerText === correctAnswer)
        element.classList.add('checked');
    })
  }

  displayScore() {
    document.body.innerHTML = 
      `
      <h2 style="text-align:center;">Score: ${this.score} / 100</h2>
      <button class="next-button">Restart</button>
      `;

    const restartBtn = document.querySelector('.next-button');
    restartBtn.addEventListener("click", () => this.restartQuiz());
  }

  restartQuiz() {
    document.location.reload();
  }
}

const quiz = new Quiz(Questions);
quiz.displayQuestion();
