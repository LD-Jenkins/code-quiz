var beginButton = document.getElementById("begin-button");
var qDiv = document.getElementById("questions");
var divWrapper = document.getElementById("main-wrapper");
var rDiv = document.getElementById("results");
var timeDisplay = document.getElementById("time");


var iter = 0;
var score = 0;
var time = 59;

var beginWasClicked = false;

var userSubmission = {
    initials: "",
    score: 0
}

var subArray = [];

var question1 = {
    q: "In Javascript, what is it called when you create a new variable and give it a value on the same line.",
    one: "Initialization",
    two: "wrong",
    three: "wrong",
    four: "sin",
    correct: "opt1"
}

var question2 = {
    q: "2",
    one: "2",
    two: "2",
    three: "correct",
    four: "2",
    correct: "opt3"
}

var qArray = [
    
    {
        q: "In Javascript, what is it called when you create a new variable and give it a value on the same line?",
        one: "Initialization",
        two: "Z-Index",
        three: "Hoisting",
        four: "Nullify",
        correct: "opt1"
    }, 

    {
        q: "What is the default flex-direction for an element with display: flex?",
        one: "Column",
        two: "Row-Reverse",
        three: "Row",
        four: "Diagonal",
        correct: "opt3"
    }, 

    {
        q: "Which of the following would give an element 3px of left and right padding, 5px top padding, and 10px bottom padding?",
        one: "3px 3px 5px 10px",
        two: "5px 3px 10px 3px",
        three: "3px 5px 10px 3px",
        four: "Tomato Soup",
        correct: "opt2"
    },

    {
        q: "Which of the following evaluates as falsey?",
        one: "[] (an empty array)",
        two: "{} (an empty object)",
        three: "function foo() {}",
        four: '"" (an empty string)',
        correct: "opt4"
    },

    {
        q: "Which element is not a block level element?",
        one: "<img>",
        two: "<div>",
        three: "<figure>",
        four: "<p>",
        correct: "opt1"
    },

    {
        q: "What browser storage persists between sessions?",
        one: "LocalStorage",
        two: "SessionStorage",
        three: "TheBoot",
        four: "AsyncStorage",
        correct: "opt1"
    },

    {
        q: "Which selector would select all p elements inside a div with a class name of 'foo'",
        one: "div.foo p",
        two: "div#foo p::all",
        three: "#foo #div #p",
        four: ".foo dive p.all",
        correct: "opt1"
    },

];

var timer = setInterval(updateTime, 1000);

function renderAttempts() {

    var stringToParse = localStorage.getItem("attempts") || '[]';
    var parsedArray = JSON.parse(stringToParse);

    var attemptsList = document.getElementById("attempt-list");
    attemptsList.innerHTML = "";

    for (var i = 0; i < parsedArray.length; i++){
        var listItem = document.createElement("li");
        listItem.textContent = parsedArray[i].initials + ": " + parsedArray[i].score;
        attemptsList.appendChild(listItem);
    }
}

function saveScore() {

    var userInitials = document.getElementById("initials").value;
    userSubmission.initials = userInitials;
    userSubmission.score = score;

    var stringToParse = localStorage.getItem("attempts");

    if (stringToParse === null) {
        subString = JSON.stringify([userSubmission]);
        localStorage.setItem("attempts", subString);
    } else {
        var parsedArray = JSON.parse(stringToParse);
        parsedArray.push(userSubmission);
        subArray = parsedArray;
        var stringifiedArray = JSON.stringify(parsedArray);
        localStorage.setItem("attempts", stringifiedArray);
    }

    renderAttempts();

}

function endGameNoSpoilers() {
    
    clearDiv();
    divWrapper.innerHTML = rDiv.innerHTML;

    renderAttempts();

    var scoreDisplay = document.getElementById("score-display");
    scoreDisplay.textContent = score;

    var submitButton = document.getElementById("submit-button");

    submitButton.addEventListener("click", saveScore, {once: true})
    
}

function updateTime() {

    if (!beginWasClicked) {
        return;
    }
    if (time <= 0) {
        clearInterval(timer);
        endGameNoSpoilers();
    }
    timeDisplay.textContent = time;
    time--;
}

function checkCorrect(event) {

    var selection = event.target.id;
    
    if (selection == qArray[iter].correct) {
        score++;
    } else {
        time -= 5;
    }
    
    iter++;
    if (iter == qArray.length) {

        clearInterval(timer);
        endGameNoSpoilers();  
    } else {
        
        displayQuestion();
    }
    
}

function clearDiv() {

    while (divWrapper.firstChild) {
        divWrapper.removeChild(divWrapper.firstChild);
    }
}

function displayQuestion() {

    beginWasClicked = true;
    clearDiv();

    var currQ = qArray[iter];

    divWrapper.innerHTML = qDiv.innerHTML;

    var question = document.getElementById("question");
    var opt1 = document.getElementById("opt1");
    var opt2 = document.getElementById("opt2");
    var opt3 = document.getElementById("opt3");
    var opt4 = document.getElementById("opt4");

    question.textContent = currQ.q;
    opt1.textContent = currQ.one;
    opt2.textContent = currQ.two;
    opt3.textContent = currQ.three;
    opt4.textContent = currQ.four;

    opt1.addEventListener("click", checkCorrect, {once: true});
    opt2.addEventListener("click", checkCorrect, {once: true});
    opt3.addEventListener("click", checkCorrect, {once: true});
    opt4.addEventListener("click", checkCorrect, {once: true});
    
}

beginButton.addEventListener("click", displayQuestion, {once: true});