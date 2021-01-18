var timeEl = document.querySelector(".time");
var start = document.getElementById("startBtn");
var startDiv = document.getElementById("startDiv");
var quizDiv = document.getElementById("quizDiv");
var correct = document.getElementById("correct");
var endScore = document.getElementById("endScore");
var highScore = document.getElementById("highScores");
var highScoreLink = document.getElementById("scoreLink");
var highList = document.getElementById("highList");
var choiceBtn = document.querySelectorAll(".choiceBtn");
var submit = document.querySelector(".submitBtn");
var clear = document.querySelector(".clearBtn");
var timerInterval;
var scores = [];

var Q1 = {
    qNumber: "Question 1",
    question: "Which is a value of a boolean?",
    C1: "Yes",
    C2: "UNDEFINED",
    C3: "True",
    C4: "HelloWorld",
    answer: "C3"
};

var Q2 = {
    qNumber: "Question 2",
    question: "Commonly used data types DO NOT Include ",
    C1: "strings",
    C2: "booleans",
    C3: "alerts", 
    C4: "numbers",
    answer: "C3"

};

var Q3 = {
    qNumber: "Question 3",
    question: "The condition in an if/else statement is enclosed within _____.",
    C1: "Quotes",
    C2: "Curly Brackets",
    C3: "Parentheses",
    C4: "Square brackets",
    answer: "C2"

};

var Q4 = {
    qNumber: "Question 4",
    question: "What type of information can Arrays store?",
    C1: "Numbers ",
    C2: "Strings",
    C3: "More Arrays",
    C4: "All of the above",
    answer: "C4"
}; 

var Q5 = {
    qNumber: "Question 5",
    question: "String values must be enclosed within  _____ when being assigned to variables ",
    C1: "Commas", 
    C2: "Curly Brackets",
    C3: "Quotes",
    C4: "Parentheses",
    answer: "C3"
};

var Q6 = {
    qNumber: "Question 6",
    question: "Which tool is most useful for printing content to the debugger?",
    C1: "JavaScript",
    C2: "Terminal/bash",
    C3: "for loops",
    C4: "Console.log",
    answer: "C4"
};

var Q7 = {
    qNumber: "Question 7",
    question: "How can you alert `Hello World`",
    C1: `alertBox("Hello World");`,
    C2: `msg("Hello World");`,
    C3: `dialog("Hello World");`,
    C4: `alert("Hello World");`,
    answer: "C4"
}



var questionsArray = [Q1, Q2, Q3, Q4, Q5, Q6, Q7];
var secondsLeft = questionsArray.length * 15; 
var questionIndex = 0;

function setTime() {
    timerInterval = setInterval (function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " seconds remaining";

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            sendMessage();
            endQuiz();

        }
    },  1000);
}

function sendMessage() {
    timeEl.textContent = "Time's Up!";
}

function hideCorrect() {
    correct.textContent = " "
}

function startQuiz () {
    startDiv.className = "invisible";
    startDiv.style = "display:none";
    quizDiv.classList.remove("invisible");
    quizDiv.className = "visible";
    setTime();
    quizDisplay();
}

function quizDisplay () {
    document.getElementById("Q").innerHTML = questionsArray[questionIndex].qNumber + ": " + questionsArray[questionIndex].question;
    document.getElementById("C1").innerHTML = questionsArray[questionIndex].C1;
    document.getElementById("C2").innerHTML = questionsArray[questionIndex].C2;
    document.getElementById("C3").innerHTML = questionsArray[questionIndex].C3;
    document.getElementById("C4").innerHTML = questionsArray[questionIndex].C4;
}

for ( var i = 0; i < choiceBtn.length; i++) {
    choiceBtn[i].addEventListener("click", choices);
}
    function choices () {
        var btnId = this.getAttribute("id");
        isCorrect(btnId);
        questionIndex++;
        if (questionIndex <= questionsArray.length - 1) {
            quizDisplay();
        }
        else {
            endQuiz();
            clearInterval(timerInterval);
        }
    }

    function isCorrect (btnId) {

        if (btnId == questionsArray[questionIndex].answer) {
            correct.textContent = "CORRECT";
        }
        else {
            correct.textContent = "Incorrect...";

            if (secondsLeft > 15) { 
                secondsLeft = secondsLeft - 15;
            }
            else {
                endQuiz();
            }
         }

         setTimeout(hideCorrect, 1000);
    }

    function endQuiz () {
        quizDiv.classList.remove("visible");
        quizDiv.className = "invisible";
        quizDiv.style = "display:none";
        endScore.classList.remove("invisible");
        endScore.classList.className = "visible";
        document.getElementById("finalScore").textContent = secondsLeft;
}

function logHighScore() {
    var storedScores = JSON.parse(localStorage.getItem("scores"));
    if (storedScores !== null) {
        scores = storedScores;
    }
    scores.push(secondsLeft + " - " + document.querySelector(".nameEntered").value);
    localStorage.setItem("scores", JSON.stringify(scores));
}

function renderScores() {
    var storedScores = JSON.parse(localStorage.getItem("scores"));
    if (storedScores !== null) {
        scores = storedScores;
    }

    for (var  i = 0; i < scores.length; i++ ) {
        scores.sort();
        scores.reverse();
        var score = scores[i];
        var li = document.createElement("li");
        li.textContent = score; 
        li.setAttribute("data-index", i);

        highList.appendChild(li);
    }
}

function highScores() {
    logHighScore();

    endScore.classList.remove("visible");
    endScore.className = "invisible";
    endScore.style = "display:none";
    highScore.classList.remove("invisible");
    highScore.classList.className = "visible";

    renderScores();
}

function highScoresLink() {
    timeEl.className = "invisible";
    startDiv.className = "invisible";
    startDiv.style = "display:none";
    quizDiv.classList.remove("visible");
    quizDiv.className = "invisible";
    quizDiv.style = "display:none";
    endScore.classList.remove("visible");
    endScore.className = "invisible";
    endScore.style = "display:none";
    highScore.classList.remove("invisible");
    highScore.classList.className = "visible";
    renderScores();

}

submit.addEventListener("click", highScores);
highScoreLink.addEventListener("click", highScoresLink);

function clearS() {
    localStorage.clear();
    highList.innerHTML = "";
}

clear.addEventListener("click", clearS);

start.addEventListener("click", startQuiz);