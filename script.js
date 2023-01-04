// defined a bunch of variables for use globally
var timerComponent = document.querySelector("#timer");
var  messageComponent = document.querySelector("#message");
var timeAllowed = 20;
var timeLeft = timeAllowed;
var myStartButton = document.querySelector("#timer_start");
var submitButton = document.querySelector("#submitButton");
var theQuestions = document.querySelector("#question");
var theCorrectAnswer = "";
var playerScore = 0;
var playerInitials="";
var response = document.querySelector("#highscores");
var reset = document.querySelector("#reload")
var iteratorTracker = document.querySelector("#question_tally")
var questionIterator = 0;
iteratorTracker.innerHTML = questionIterator + 1;
var playerStats = {
    score: 0,
    initials: "",
}


// These statements allow the user to select their answers 
var theAnswerItemA = document.querySelector("#a");
document.getElementById("a").onclick = OnClick;

var theAnswerItemB = document.querySelector("#b");
document.getElementById("b").onclick = OnClick;

var theAnswerItemC = document.querySelector("#c");
document.getElementById("c").onclick = OnClick;


// created an object to store all my questions and answers
var myQuestions = [
    {
        question: "Define a Javascript Function",
        answer: {
            a: "A special event hosted by JavaScript",
            b: "A set of statements that performs a task or calculates a value",
            c: "Text that won't be utilized or displayed",
        },
        correctAnswer: 'b'
    },
    {
        question: "What is a 'Variable' in JavaScript?",
        answer: {
            a: "A soldier who is unpredictable in behavior",
            b: "The answer to all of our prayers",
            c: "A name of a storage location",
        },
        correctAnswer: 'c'
    },
    {
        question: "Are Java and Javascript the same?",
        answer: {
            a: "No Java is a compiled language and JavaScript is interpreteed at runtime",
            b: "Yes, JavaScript is the name of the font used by Java",
            c: "They were originally the same but after internal disputes the languages diverged",
        },
        correctAnswer: 'a'
    },
    {
        question: "What was the original name of JavaScript?",
        answer: {
            a: "Vanilla",
            b: "Mocha",
            c: "Caramel",
        },
        correctAnswer: 'b'
    },
];

// created a function to display questions and cycle through them based on an iterator
function displayQuestion() {
    if (questionIterator<myQuestions.length) {
        theQuestions.textContent = myQuestions[questionIterator].question;
        theAnswerItemA.textContent = myQuestions[questionIterator].answer['a'];
        theAnswerItemB.textContent = myQuestions[questionIterator].answer['b'];
        theAnswerItemC.textContent = myQuestions[questionIterator].answer['c'];
        theCorrectAnswer = myQuestions[questionIterator].correctAnswer;
        console.log(theCorrectAnswer);
    }
    else {
        endOfQuiz();
        timeLeft = 1;
        console.log("All done!");
    };
    
}

// this functions checks the answer. the computer doesnt know what the question actually is so I just have the program compare values.
function OnClick() {
    var UserAnswer = this.id;
    console.log("The User answer is: " + UserAnswer);
    console.log(theCorrectAnswer);
    if (UserAnswer === theCorrectAnswer && timeLeft > 0) {
        playerScore++;
        questionIterator++;
        displayQuestion();
    }
    else {
        questionIterator ++;
        displayQuestion();
        if (timeLeft > 10) {
            timeLeft -= 10;
        }
        else {
            timeLeft = 1;
        }
        
    }
    console.log("The question iterator is: " + questionIterator);
}


// This functions starts the clock
function setTime() {
    quizArea.style.display = "block";
    myStartButton.style.display = "none";
    displayQuestion();
    messageComponent.textContent = "Good Luck!"
    var timerInterval = setInterval(function() {
        timeLeft--;
        timerComponent.textContent = timeLeft + " seconds left.";

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            sendMessage();
            endOfQuiz();
        }
    }, 1000)
}

// once time has expired this function is called
function sendMessage() {
    messageComponent.textContent = "Time's Up!";
    timeLeft = timeAllowed;
    getInitials();
}

// function fires once the quiz has been completed
function endOfQuiz() {
    messageComponent.textContent = "You have completed the Quiz."
    playerStats.score = playerScore

}

// I coudnt figure out how to collect and use userinput other than prompt so thats what I did
function getInitials() {
    playerInitials= prompt("What are your initials?");
    playerStats.initials = playerInitials;
    console.log(playerInitials);
    localStorage.setItem("playerStats", JSON.stringify(playerStats));
    displayScore();
}

// snags the user data and display on what looks like a new page
// shhhh I actually just hid everything elese
function displayScore() {
    main_section.style.display = "none";
    score_section.style.display = "block";
    console.log(playerStats);
    var lastScore = localStorage.getItem("playerStats")
    var parsedScore = JSON.parse(lastScore);
    var nameOfUser = parsedScore.initials;
    var userScore = parsedScore.score;
    console.log("Name is: " + nameOfUser);
    response.innerHTML = "<ul>"
    if (parsedScore!== null) {
        response.innerHTML += "<li> Player Name: " + nameOfUser + "</li>";
        response.innerHTML += "<li> Player Score: " + userScore + "</li>";
    }
}

// I wanted to be able to retake the quiz this function allows the user to do so by refreshing the page
function redo() {
    document.location.reload();
}

// event listerners
myStartButton.addEventListener("click", setTime);
reset.addEventListener("click", redo);









