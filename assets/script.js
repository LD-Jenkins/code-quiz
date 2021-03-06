var beginButton = document.querySelector("button");
var qDiv = document.getElementById("questions");
var divWrapper = document.getElementById("wrapper");


var question1 = {
    q: "In Javascript, what is it called when you create a new variable and give it a value on the same line.",
    one: "Initialization",
    two: "wrong",
    three: "wrong",
    four: "sin",
    correct: 1
}

var question2 = {
    q: "2",
    one: "2",
    two: "2",
    three: "correct",
    four: "2",
    correct: 3
}

var qArray = [question1];

function checkCorrect() {

}

function clearDiv() {

    while (divWrapper.firstChild) {
        divWrapper.removeChild(divWrapper.firstChild);
    }
}

function displayQuestion() {

    clearDiv();

    for (var i = 0; i < qArray.length; i++) {

        var currQ = qArray[i];

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
}

beginButton.addEventListener("click", displayQuestion, {once: true});