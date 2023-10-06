const questions = [
  {
    question:
      "What is the CSS property used to create rounded corners on an element?",
    options: [
      "corner-radius",
      "border-radius",
      "border-corner",
      "rounded-corner",
    ],
    correctAnswer: "border-radius",
  },
  {
    question:
      "Which CSS pseudo-class is used to select an element when a user hovers over it?",
    options: ["hover", "active", "focus", "visited"],
    correctAnswer: "hover",
  },
  {
    question: "What does the CSS property opacity control?",
    options: [
      "The transparency of an element",
      "The rotation of an element",
      "The size of an element",
      "The font color of an element",
    ],
    correctAnswer: "The transparency of an element",
  },
  {
    question:
      "Which CSS property is used to create a shadow effect around an element?",
    options: ["shadow-effect", "box-shadow", "text-shadow", "element-shadow"],
    correctAnswer: "box-shadow",
  },
  {
    question: "In CSS, what is the purpose of the @media rule?",
    options: [
      "To define custom fonts for a website",
      "To include external CSS files",
      "To apply styles based on the screen size or device characteristics",
      "To create animations and transitions",
    ],
    correctAnswer:
      "To apply styles based on the screen size or device characteristics",
  },
];
const title = document.getElementById("title");
const playerNameInput = document.getElementById("input-container");
const startButton = document.getElementById("start-button");
const questiontimer = document.getElementById("timer");
const question = document.getElementById("question");
const options = document.getElementById("options-container");
const questionsContainer = document.getElementById("questions-container");
const playerscore = document.getElementById("score");
const next = document.getElementById("next-button");
const reset = document.getElementById("reset-button");
const scoreContainer = document.getElementById("score-container");

let score = 0;
let timer;
let playerName = "";
let currentQuestionIndex = 0;
questionsContainer.style.display = "none";
scoreContainer.style.display = "none";
document.getElementById("timer-container").style.display = "none";
next.style.display = "none";
reset.style.display = "none";
const displayQuestion = () => {
  clearInterval(timer);
  if (currentQuestionIndex === questions.length - 1) {
    next.setAttribute("disabled", "");
  } else {
    next.removeAttribute("disabled");
  }
  const currentQuestion = questions[currentQuestionIndex];
  question.textContent = `Question ${currentQuestionIndex + 1}:${
    currentQuestion.question
  }`;
  options.innerHTML = "";
  currentQuestion.options.map((option, index) => {
    const button = document.createElement("button");
    button.classList.add("option");
    button.setAttribute("id", index);
    button.textContent = option;
    button.addEventListener("click", () => {
      checkAnswer(option, index);
    });
    options.appendChild(button);
  });
  startTimer();
};

const startTimer = () => {
  questiontimer.style.color = "green";
  let timeleft = 10;
  clearInterval(timer);
  questiontimer.textContent = timeleft;
  timer = setInterval(() => {
    timeleft--;
    if (timeleft > 7) {
      questiontimer.style.color = "green";
    } else if (timeleft >= 4 && timeleft < 7) {
      questiontimer.style.color = "yellow";
    } else if (timeleft <= 3) {
      questiontimer.style.color = "red";
    }
    questiontimer.textContent = timeleft;
    if (timeleft === 0) {
      clearInterval(timer);
      currentQuestionIndex++;
      move();
    }
  }, 1000);
};

const checkAnswer = (selectedOption, selectedindex) => {
  clearInterval(timer);
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedOption === currentQuestion.correctAnswer) {
    score++;
    document.getElementById(selectedindex).style.backgroundColor = "green";
  } else {
    document.getElementById(selectedindex).style.backgroundColor = "red";
  }
  currentQuestionIndex++;

  setTimeout(() => {
    move();
  }, 1000);
};
const move = () => {
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
};
const endQuiz = () => {
  title.innerText = "Quiz Completed";
  questionsContainer.style.display = "none";
  document.getElementById("timer-container").style.display = "none";
  next.style.display = "none";
  scoreContainer.style.display = "block";
  document.getElementById("player-name").innerText = playerName;
  playerscore.innerText = score;
  reset.style.display = "block";
};
startButton.addEventListener("click", () => {
  playerName = playerNameInput.value;
  if (playerName == "") {
    alert("Name must be filled out");
  } else {
    document.getElementById("details-container").style.display = "none";
    document.getElementById("Rules").style.display = "none";

    questionsContainer.style.display = "block";
    next.style.display = "block";
    reset.style.display = "block";
    document.getElementById("timer-container").style.display = "flex";
    displayQuestion();
  }
});

next.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    currentQuestionIndex++;
    displayQuestion();
  }
});
reset.addEventListener("click", () => {
  document.getElementById("timer-container").style.display = "flex";
  title.innerText = "Css Quiz";
  scoreContainer.style.display = "none";
  questionsContainer.style.display = "block";
  next.style.display = "block";
  score = 0;
  currentQuestionIndex = 0;
  displayQuestion();
});

playerNameInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    startButton.click();
  }
});
