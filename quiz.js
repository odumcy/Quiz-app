//create a quiz class
class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    getQuestionIndex() {
        return this.questions[this.questionIndex];
    }

    guess(answer) {
        if (this.getQuestionIndex().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.questionIndex++;
    }

    isEnded() {
        return this.questionIndex === this.questions.length;
    }
}


//create a question class
class Question {
    constructor(text, choices, answer) { 
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}

//display questions
function displayQuestion() {
    if (quiz.isEnded()) {
        showScores();
    } else { 
        //show next question
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;

        //show options
        let choices = quiz.getQuestionIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

//guess function 
function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function () {
        quiz.guess(guess);
        displayQuestion();
    }
}

//show quiz progress
function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let progressElement = document.getElementById("progress");
    progressElement.innerHTML = `
        Question ${currentQuestionNumber} of ${quiz.questions.length}
    `;
}


//show score
function showScores() {
    let quizEndHTML = `
        <h1>Quiz Completed</h1>
        <h2 id="score">You Scored: ${quiz.score} of ${quiz.questions.length}</h2>
        <div class="quiz-repeat">
            <a href="quiz.html">Take Quiz Again</a>
        </div>
    `;
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = quizEndHTML;
}


//create quiz questions
let questions = [
    new Question(
        "Officer's are known by the___ they carry.", ["Knife", "Koboko", "Sword", "Jack-knife"], "Sword"
    ),
    new Question(
        "Who is the Head of CITO Department?", ["DRC Haruna", "SRC Jacobs", "CRC A. Ismaila", "DCC Wasiu A."], "DCC Wasiu A."
    ),
    new Question(
        "Who is the president of Nigeria?", ["Emperor", "Shabel", "Jagaban", "OC Mami"], "Jagaban"
    ),
    new Question(
        "How long does a political tonor takes?", ["5 years", "4 years", "10 years", "8 years"], "4 years"
    ),
];


let quiz = new Quiz(questions);


//display question
displayQuestion();


//add a countdown
let time = 2;
let quizTimeInMinutes = time * 60 * 60;
quizTime = quizTimeInMinutes / 60;

let counting = document.getElementById("count-down");

function startCountdown() {
    let quizTimer = setInterval(function () {
        if (quizTime <= 0) {
            clearInterval(quizTimer);
            showScores();
        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor((quizTime / 60) % 60);
            counting.innerHTML=`TIME: ${min} : ${sec}`;
        }
    }, 1000)
}

startCountdown();
