let user = localStorage.getItem("name");
let form = document.getElementById("form");
let game = document.getElementById("game");

if (user) {
  form.hidden = true;
  game.hidden = false;
} else {
  game.hidden = true;
  document.body.classList.add("login");
}

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
