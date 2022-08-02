const line_count = 6;
const Char_count = 5;

const allWords = document.getElementById("words");

for (let i = 0; i < line_count; i++) {
  const newWord = document.createElement("div");
  newWord.className = "word";

  for (let j = 0; j < Char_count; j++) {
    const newChar = document.createElement("div");
    newChar.className = "char";
    newWord.appendChild(newChar);
  }
  allWords.appendChild(newWord);
}

let currentchar = 0;
let currentword = 0;
document.addEventListener("keydown", async (event) => {
  const firstWord = allWords.children[currentword];
  if (event.code == "Enter") {
    if (currentchar == Char_count) {
      console.log("Hello");
      const answer = getCurrentWord();
      const result = await guess(answer);
      colorize(result);
      currentword++;
      currentchar = 0;
    }
  } else if (event.code == "Backspace") {
    if (currentchar > 0) {
      currentchar--;
      firstWord.children[currentchar].innerHTML = "";
    }
  } else if (currentchar < Char_count) {
    firstWord.children[currentchar].innerHTML = event.key;
    currentchar++;
  } else {
    alert("stop ");
  }
});
async function guess(word) {
  const resuest = await fetch("guess/" + word);
  const result = await resuest.json();
  return result;
}

function getCurrentWord() {
  var word = "";
  var wordDiv = document.getElementById("words").children[currentword];
  for (var i = 0; i < wordDiv.children.length; i++) {
    word = word + wordDiv.children[i].innerHTML;
  }
  return word;
}
function colorize(results) {
  const wordDiv =
    document.getElementById("words").children[currentword].children;
  for (let i = 0; i < results.length; i++) {
    if (results[i] == 1) {
      wordDiv[i].style.backgroundColor = "green";
    } else if (results[i] == 0) {
      wordDiv[i].style.backgroundColor = "yellow";
    } else {
      wordDiv[i].style.backgroundColor = "gray";
    }
  }
}
