let user = localStorage.getItem("name");
let form = document.getElementById("form");
let game = document.getElementById("game");
let topicList = document.getElementById("topics");

const topics = ["Software", "Frontend", "Backend"];
const selectedTopics = [];

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
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = document.getElementById("name").value;
  if (!name) alert("You must enter your name");
  else {
    localStorage.setItem("name", name);
    form.hidden = true;
    game.hidden = false;
    document.body.classList.remove("login");
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
      console.log(selectedTopics);
    });
    topicList.appendChild(button);
  });
};

if (user) {
  form.hidden = true;
  game.hidden = false;
  displayTopics();
} else {
  game.hidden = true;
  document.body.classList.add("login");
}
