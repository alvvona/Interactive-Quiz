

const quizData = [
    {
        question: "What is the capitol of Japan?",
        answers: ["Osaka", "Kyoto", "Tokyo", "Fuji"],
        correctAnswer: "Tokyo",
        progress: "Q: 1 out of 5"
    },
    {
        question: "What animal has eight legs?",
        answers: ["Cat", "Swan", "Snake", "Octopus"],
        correctAnswer: "Octopus",
        progress: "Q: 2 out of 5"
    },
    {
        question: "What book did Tomihiko Morimi not write?",
        answers: ["Tatami Galaxy", "Suzume", "Penguin Highway", "The Night is Short"],
        correctAnswer: "Suzume",
        progress: "Q: 3 out of 5"
    },
    {
        question: "What is not a Ghibli movie?",
        answers: ["Spirited Away", "Nana", "Howl's Moving Castle", "Totoro"],
        correctAnswer: "Nana",
        progress: "Q: 4 out of 5"
    },
    {
        question: "What fruit does Hachi like?",
        answers: ["Strawberry", "Peach", "Lychee", "Watermelon"],
        correctAnswer: "Strawberry",
        progress: "Q: 5 out of 5"
    }
]




let userAnswersList = new Array(quizData.length).fill(null);
let answeredQsList = new Set();

let currentQ = 0;
let score = 0;





window.addEventListener("load", function () {
    // initial start page
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.style.display = "none";
    const resultsContainer = this.document.getElementById("results-container");
    resultsContainer.style.display = "none";

    // user click 'start' button 
    startButton.addEventListener("click", function() {
        const welcomeContainer = document.getElementById("welcome-container");
        welcomeContainer.style.display = "none";

        const startButton = document.getElementById("startButton");
        startButton.style.display = "none";

        const prevButton = document.getElementById("prevButton");
        prevButton.style.display = "none";

        quizContainer.style.display = "block";
        displayQ();
    })

    // user click 'next' button
    document.getElementById("nextButton").addEventListener("click", function() {
        if (answerSelected()) {
            if (currentQ < quizData.length-1) {nextQ();}
            else {submitQuiz();}
        }
        else {
            if (currentQ == quizData.length-1) {
                alert("Answer all questions before submitting quiz");
            }
            else {
                alert("Select an answer before moving on to next question");
            };
        };
    });


    // user click 'previous' button
    this.document.getElementById("prevButton").addEventListener("click", function() {
        prevQ();
    });
});






//////////////////////////////////   DISPLAY QUESTION   //////////////////////
function displayQ(){
    const questionContainer = document.getElementById("question-container");
    const questionData = quizData[currentQ];

    if (questionData) {
        // if not at first question, show 'previous' button
        if (currentQ != 0) {
            const prevButton = document.getElementById("prevButton");
            prevButton.style.display = "inline";
        }

        // if at last question, 'next' button becomes 'submit'
        if (currentQ == quizData.length-1) {
            const nextButton = document.getElementById("nextButton");
            nextButton.innerHTML = "Submit";
        }

        // display questions and available answers
        const questionHTML = `
            <br>
            <h2>${questionData.question}</h2>
            <ul class="answers">
                ${questionData.answers.map((answer, index) => `
                    <li>
                        <input type="radio" name="q${currentQ}" value="${answer}"> ${answer}
                    </li>`).join('')
                }
            </ul>
            <br>
            <p>${questionData.progress}</p>
        `;
        questionContainer.innerHTML = questionHTML; // place questionHTML code into HTML document in questionContainer

        // if question already answered before, cannot answer again
        const answerBtns = document.querySelectorAll(`input[name="q${currentQ}"]`);
        if (answeredQsList.has(currentQ)) {
            answerBtns.forEach((answerBtn) => {
                if (answerBtn.value == userAnswersList[currentQ]) {
                    answerBtn.checked = true; // automatically check previous answer
                }
                answerBtn.disabled = true; // user cannot access buttons
            });
        }
    }
}





function checkAns(){
    const userAns = document.querySelector(`input[name="q${currentQ}"]:checked`);
    
    if (userAns) {
        const correctAnsValue = quizData[currentQ].correctAnswer;
        //console.log('correctAnsValue:', correctAnsValue);

        if (userAns.value === correctAnsValue) {
            userAns.parentElement.style.backgroundColor = 'green';
            if (answeredQsList.has(currentQ) == false) {
                score++;
            }
        }
        else {
            userAns.parentElement.style.backgroundColor = 'red';
            const correctAnsElement = document.querySelector(`input[name="q${currentQ}"][value="${correctAnsValue}"]`);
            correctAnsElement.parentElement.style.backgroundColor = 'green';
        }
        userAnswersList[currentQ] = userAns.value; // store answer to this question
        answeredQsList.add(currentQ); // store that this question is answered
    }
}





function startQuiz() {
    displayQ();
}

function nextQ(){
    checkAns();
    setTimeout(function() {
        currentQ++;
        displayQ();
    }, 1000);
}

function prevQ() {
    //hideFeedback();
    currentQ--;
    displayQ();
}





function hideFeedback() {
    const correctAnswersContainer = document.getElementById("correct-answers");
    correctAnswersContainer.innerHTML = "";
}





function submitQuiz() {
    checkAns();
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.style.display = "none";
    displayResults();
}





function displayResults() {
    const resultsContainer = document.getElementById("results-container");
    resultsContainer.style.display = "block";

    if (score === quizData.length) {
        resultsContainer.innerHTML += "<p>Congratulations! You got all the questions right!</p>";
    }

    const resultsHTML = `
        <div class="correctans-container">
        <ul id="correct-answers">
            <br>
            <h2> ✧˖°. Quiz Results .°˖✧ </h2>
            <p id="user-score">
                Your Score: ${score} out of ${quizData.length}
            </p> <br>
            ${quizData.map((question, index) => `
                <li>
                    <p> <strong> Q${index+1}: </strong> ${question.question} </p>
                    <p> Your Answer - ${userAnswersList[index]} </p>
                    <p> Correct Answer - ${question.correctAnswer} </p>
                    <br>
                </li>`).join('')
            }
        </ul>
        </div>
    `;
    resultsContainer.innerHTML += resultsHTML;
}






function answerSelected() {
    const userAns = document.querySelector(`input[name="q${currentQ}"]:checked`);
    return userAns !== null; // true if ans exists, false if no ans
}
