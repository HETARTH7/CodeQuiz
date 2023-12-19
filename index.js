let user = localStorage.getItem("name");
let form = document.getElementById("form");
let game = document.getElementById("game");
let topicList = document.getElementById("topics");
let quiz = document.getElementById("quiz");
let answers;
let correctAnswers = [];
let timer = document.createElement("div");
timer.classList.add("timer");
quiz.appendChild(timer);

const topics = ["Software", "DSA", "Java"];
let selectedTopics = [];

const quizData = {
  Software: [
    {
      question: "Software is defined as ___________",
      options: [
        "a) set of programs, documentation & configuration of data",
        "b) set of programs",
        "c) documentation and configuration of data",
        "d) None of the mentioned",
      ],
      answer: "a",
      explanation:
        "Software is a collection of programmes; it also includes documentation and data setup to enable the programmes to function. Microsoft windows, excel, word, powerpoint, etc. are a few examples of software.",
    },
    {
      question: "What is Software Engineering?",
      options: [
        "a) Designing a software",
        "b) Testing a software",
        "c) Application of engineering principles to the design a software",
        "d) None of the above",
      ],
      answer: "c",
      explanation:
        "Software engineering is the application of engineering principles to the design, development, and support of software and it helps to solve the challenges of low-quality software projects.",
    },
    {
      question: "Who is the father of Software Engineering?",
      options: [
        "a) Margaret Hamilton",
        "b) Watts S. Humphrey",
        "c) Alan Turing",
        "d) Boris Beizer",
      ],
      answer: "b",
      explanation:
        "Watts S. Humphrey created the Software Process Program at Carnegie Mellon University’s Institute (SEI) in the 1980s, and served as its director from 1986 through the early 1990s. This program was designed to help participants understand and manage the software development process.",
    },
  ],
  DSA: [
    {
      question: "What is a data structure?",
      options: [
        "a) A programming language",
        "b) A collection of algorithms",
        "c) A way to store and organize data",
        "d) A type of computer hardware",
      ],
      answer: "c",
      explanation:
        "A data structure is a way to store and organize data efficiently, enhancing access and manipulation, unlike programming languages, algorithms, or computer hardware.",
    },
    {
      question: "What are the disadvantages of arrays?",
      options: [
        "a) Index value of an array can be negative",
        "b) Elements are sequentially accessed",
        "c) Data structure like queue or stack cannot be implemented",
        "d) There are chances of wastage of memory space if elements inserted in an array are lesser than the allocated size",
      ],
      answer: "d",
      explanation:
        "Arrays are of fixed size. If we insert elements less than the allocated size, unoccupied positions can’t be used again. Wastage will occur in memory.",
    },
    {
      question: "Which data structure is used for implementing recursion?",
      options: ["a) Stack", "b) Queue", "c) List", "d) Array"],
      answer: "a",
      explanation: "Stacks are used for the implementation of Recursion.",
    },
  ],

  Java: [
    {
      question: "Who invented Java Programming?",
      options: [
        "a) Guido van Rossum",
        "b) James Gosling",
        "c) Dennis Ritchie",
        "d) Bjarne Stroustrup",
      ],
      answer: "b",
      explanation:
        "Java programming was developed by James Gosling at Sun Microsystems in 1995. James Gosling is well known as the father of Java.",
    },
    {
      question: "Which statement is true about Java?",
      options: [
        "a) Java is a sequence-dependent programming language",
        "b) Java is a code-dependent programming language",
        "c) Java is a platform-dependent programming language",
        "d) Java is a platform-independent programming language",
      ],
      answer: "d",
      explanation:
        "Java is called ‘Platform Independent Language’ as it primarily works on the principle of ‘compile once, run everywhere’.",
    },
    {
      question:
        "Which component is used to compile, debug and execute the java programs?",
      options: ["a) JRE", "b) JIT", "c) JDK", "d) JVM"],
      answer: "c",
      explanation:
        "JDK is a core component of Java Environment and provides all the tools, executables and binaries required to compile, debug and execute a Java Program.",
    },
  ],
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = document.getElementById("name").value;
  if (!name) alert("You must enter your name");
  else {
    localStorage.setItem("name", name);
    localStorage.setItem("score", 0);
    form.hidden = true;
    game.hidden = false;
    topicList.hidden = false;
    start.hidden = false;
    document.body.classList.remove("login");
    displayTopics();
  }
});

const displayTopics = () => {
  topics.forEach((topic) => {
    const button = document.createElement("button");
    button.textContent = topic;
    button.classList.add("btn");
    button.addEventListener("click", () => {
      if (selectedTopics.includes(topic)) {
        selectedTopics.pop(topic);
        button.style.backgroundColor = "#ffa94d";
      } else {
        selectedTopics.push(topic);
        button.style.backgroundColor = "#e8590c";
      }
    });
    topicList.appendChild(button);
    game.appendChild(quiz);
  });
};

const getResult = () => {
  var correct = 0;
  const n = answers.length;
  for (var i = 0; i < n; i++) {
    if (answers[i] === correctAnswers[i]) correct++;
  }
  const result = (correct / n) * 100;
  game.innerHTML = "";
  localStorage.setItem(
    "score",
    Math.max(localStorage.getItem("score"), result)
  );
  const score = document.createElement("div");
  score.textContent = "Your score is " + result.toPrecision(4) + "%";
  const highScore = document.createElement("div");
  highScore.textContent = "Highscore: " + localStorage.getItem("score");
  game.appendChild(score);
  game.appendChild(highScore);
};

const displayQuiz = () => {
  var idx = 1;
  selectedTopics.forEach((selectedTopic) => {
    const problems = quizData[selectedTopic];
    problems.forEach((problem) => {
      correctAnswers.push(problem.answer);
      const section = document.createElement("div");
      const question = document.createElement("p");
      question.textContent = idx + ". " + problem.question;
      const options = document.createElement("form");
      problem.options.forEach((option) => {
        radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "name";
        radio.addEventListener("click", () => {
          answers[question.textContent[0] - 1] = option[0];
        });
        label = document.createElement("label");
        label.textContent = option;
        options.appendChild(radio);
        options.appendChild(label);
      });
      section.appendChild(question);
      section.appendChild(options);
      quiz.appendChild(section);
      idx++;
    });
    startTimer((idx - 1) * 60, timer);
  });
  answers = new Array(idx - 1);
  const submitButton = document.createElement("button");
  submitButton.addEventListener("click", () => getResult());
  submitButton.textContent = "Submit";
  submitButton.classList.add("submit", "btn");
  quiz.appendChild(submitButton);
};

if (user) {
  form.hidden = true;
  game.hidden = false;
  topicList.hidden = false;
  start.hidden = false;
  displayTopics();
} else {
  game.hidden = true;
  topicList.hidden = true;
  start.hidden = true;
  document.body.classList.add("login");
}

const startButton = document.getElementById("start");

startButton.addEventListener("click", () => {
  topicList.innerHTML = "";
  startButton.hidden = true;
  displayQuiz();
});

const startTimer = (duration, display) => {
  var timer = duration,
    minutes,
    seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    display.textContent = "Time remaining: " + minutes + ":" + seconds;
    if (--timer < 0) {
      getResult();
    }
  }, 1000);
};

const date = new Date();
const currentYear = date.getFullYear();
const year = document.getElementById("year");
year.textContent = currentYear;
