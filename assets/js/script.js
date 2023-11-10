// global variables

const heading = document.getElementById("heading");
const menu = document.getElementById("menu");
const rulesSection = document.getElementById("rules");
const quizArea = document.getElementById("quiz-area");
const answersArea = document.getElementById('answer-area');
const timeDisplay = document.getElementById("timer");
const nextButton = document.getElementById("next-button");

// variables to be defined /

let shuffledQuestions;
let currentQuestionIndex;
let correctAnswer;
let score;
let timeLeft;
let timerInterval;

 /* Waits for DOM to be loaded */
 document.addEventListener("DOMContentLoaded", function() {
    const menuButtons = this.querySelectorAll(".menu-btn");
    menuButtons.forEach((menuButton) => {
        menuButton.addEventListener("click", function() {
            if (this.getAttribute("id") === "rules-button") {
                displayRules();
            } ;
            });
    });
 
 /**
  * hides main menu while the rules section is displayed.
  */

 function displayRules() {
    rulesSection.classList.remove("hide");
    heading.classList.add("hide");
    menu.classList.add("hide");
    const closeRulesButton = document.getElementById("close-rules");
    closeRulesButton.addEventListener("click", closeRules);
 }

 /**
  *   Hide rules section and display back main menu. 
   */
 function closeRules() {
    rulesSection.classList.add("hide");
    heading.classList.remove("hide");
    menu.classList.remove("hide");
}

 /**
  * hide the quiz area,reset the quiz and display menu
  */
 
 function closeQuiz() {
    currentQuestionIndex = 0;
    clearInterval(timerInterval);
    resetScore();
    quizArea.classList.add("hide");
    heading.classList.remove("hide");
    menu.classList.remove("hide");
 }
  /**
   * Displays quiz area and get 10 random questions.
   */

  function startQuiz() {
    quizArea.classList.remove("hide");
    shuffledQuestions = Questions.sort(() => 0.5 - Math.random()).slice(0, 10);
    currentQuestionIndex = 0;
    nextQuestion();
  }

  /**
   * function to reset and display the quiz content
   */

  function nextQuestion() {
    clearInterval(timerInterval); // stop timer from continuing
    if (currentQuestionIndex < 10) {
        resetQuizContent();
        displayQuizContent(shuffledQuestions[currentQuestionIndex]);
        currentQuestionIndex++;
        timer();
    } else {
        finalResult();
    }
  }
  /* quiz content */
  function displayQuizContent(question) {

    const questionContainer = document.getElementById("question");

    questionContainer.InnerText = question.question;
    // create a button
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.id = "correct";
        } else { 
            button.classList.add("incorrect");
        } 
        // Add event listnere
        button.addEventListener("click", checkAnswer);
        answersArea.appendChild(button);
    });
    displayQuestionNumber();
}

/**
 * change the question number 
 */
function displayQuestionNumber() {
    const questionNumber = document.getElementById("question-number");
    QuestionNumber.innerText = currentQuestionIndex + 1;
}

/** 
 * set time interval
 */
function startTimer() {
    timerInterval = setInterval(timer, 1000);

}

function timer() {
    if (timeLeft <= 0){
        timeUp();
    } else {
        timeLeft--;
    }
    timeDisplay.innerHTML = 'Time: ' + timeLeft;
}

/**
 * Alert for time up 
 */
function timeUp() {
    alert("Oops! You ran out of time!");
    clearInterval(timerInterval); 
    answersArea.classList.add("no-pointer");

    /**
     * incorrect answer
     */
    const wrongAnswers = document.querySelectorAll('.incorrect');
    for (let wrongAnswer of wrongAnswers ) {
        wrongAnswer.classList.add('wrong-answer');
    }

    /**
     * correct answers
     */

    function checkAnswer(event) {
        clearInterval(timerInterval); // stops the timer from continuing
  answersArea.classList.add("no-pointer"); // Prevents clicks after answer is chosen.
correctAnswer = document.getElementById("correct");

        const clickedButton = event.target;
        correctAnswer.classList.add("correct-answer");
        if (clickedButton === correctAnswer) {
            incrementScore();
        } else {
            this.classList.add("wrong-answer");
        }
        nextButton.classList.remove("hide"); // Displays the next button.
    }



/* listens for a next button */
nextButton.addEventListener("click", nextQuestion);


/* get the current score and increment by 1. */

function incrementScore() {
    score = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++score;

}

/* reset quiz content */
function resetQuizContent() {
    nextButton.classList.add("hide");
    answersArea.classList.remove("no-pointer");
    timeLeft = 16;
    startTimer();
    while (answersArea.firstChild) {
        answersArea.removeChild(answersArea.firstChild);
    }
}
/*final function*/
function finalResult() {
    const quizComplete = document.getElementById("quiz-complete");
    const finalScore = document.getElementById("final-score");
    quizArea.classList.add("hide");
    heading.classList.remove("hide");
    quizComplete.classList.remove("hide");
    finalScore.InnerText = score;
}

/* quiz-complete-btn */
const endOfQuizButtons = document.querySelectorAll(".quiz-complete-btn");
endOfQuizButton.forEach((endOfQuizButton) => {
    endOfQuizButton.addEventListener("click", function() {
        resetScore();
        quizComplete.classList.add("hide");
        if (this.getAttribute("id") === "retry-button");
    }
    )};
);
function resetScore() {
    score = document.getElementById("score");
    score.innerText = 0;
}