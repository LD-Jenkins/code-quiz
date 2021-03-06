var beginButton = document.querySelector("button");
var qDiv = document.getElementById("questions");
var divWrapper = document.getElementById("wrapper");
var timeDisplay = document.getElementById("time");

var iter = 0;
var score = 0;
var time = 59;

var beginWasClicked = false;


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

var qArray = [question1, question2];

var timer = setInterval(updateTime, 1000);

function endGameNoSpoilers() {
    
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
    
    if (iter == qArray.length) {
        clearInterval(timer);
        endGameNoSpoilers();  
    } else {
        displayQuestion();
    }
    

    iter++;
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