const { response } = require("express");
const express = require("express");
const port = process.env.PORT || 3000
const server = express();

server.listen(port, () => {
  console.log("server is runig on port 3000");
});
const theAnswer = "loope";
server.get("/guess/:word", (requst, reponse) => {
  const userword = requst.params.word;

  let answer = [];
  for (let i = 0; i < userword.length; i++) {
    const ch = userword[i];
    if (ch == theAnswer[i]) {
      answer.push(1);
    } else if (theAnswer.includes(ch)) {
      answer.push(0);
    } else {
      answer.push(-1);
    }
  }

  reponse.json(answer);
});

server.use(express.static("public"));

server.get("/hello/:name", (request, response) => {
  response.send("goodbye" + request.pareams);
});
