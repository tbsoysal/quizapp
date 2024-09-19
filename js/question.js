import quiz from './quiz.js'
export default class Question {
  constructor(index, text, answers, correctAnswer) {
    this.correctAnswer = correctAnswer;
    this.point = 0;
    this.template = `
      <header>
        ${index > 1 ? `<button type="button"><i class="fa-solid fa-angle-left"></i>Previous</button>` : ""}
        <p class="question-counter">${index}/10</p>
      </header>
      <main class="question-container">
        <p class="question">${text}</p>
      </main>
      <ul class="answers-container">
        <li class="answer"><span class="text">${answers[0]}</span><span class="checkbox"></span></li>
        <li class="answer"><span class="text">${answers[1]}</span><span class="checkbox"></span></li>
        <li class="answer"><span class="text">${answers[2]}</span><span class="checkbox"></span></li>
        <li class="answer"><span class="text">${answers[3]}</span><span class="checkbox"></span></li>
      </ul>
      <button class="next-button" type="button">Next</button>
    `;
  }

  display() {
    document.body.innerHTML = this.template;
    this.listenForClicks();
  }

  listenForClicks() {
    const answerElements = document.querySelectorAll(".answer");
    const nextBtn = document.querySelector(".next-button");
    const previousBtn = document.querySelector("header button");

    answerElements.forEach((el) => {
      el.addEventListener("click", () => this.checkAnswer(el));
    });
    nextBtn.addEventListener("click", () => quiz.displayNextQuestion());

    if (previousBtn) {
      previousBtn.addEventListener("click", () => quiz.displayPrevQuestion());
    }
  }

  checkAnswer(clickedElement) {
    if (clickedElement.innerText === this.correctAnswer) {
      if (!clickedElement.classList.contains("checked")) {
        clickedElement.classList.add("checked");
        this.saveAnswers();
        quiz.score += 10;
      }
    } else {
      this.isSelectCorrect =
        this.isSelectCorrect === null ? false : this.isSelectCorrect;
      clickedElement.classList.add("falsechecked");
      setTimeout(() => {
        this.showAnswer();
      }, 500);
    }
  }

  showAnswer() {
    const answerElements = document.querySelectorAll(".answer");
    answerElements.forEach((el) => {
      if (el.innerText === this.correctAnswer) el.classList.add("checked");
    });
    this.saveAnswers();
  }

  saveAnswers() {
    this.template = document.body.innerHTML;
  }
}

