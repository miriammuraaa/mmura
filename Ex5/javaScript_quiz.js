const questions = [
    {
        questionImage: "img/1.png",
        question: 'Què mostrarà?',
        choices: ['NaN', '15', '105'],
        correctAnswer: 2
    },
    {
        questionImage: "img/2.png",
        question: 'Aquest codi funciona?',
        choices: ['Sí i mostra 10', 'Sí i mostra 25', 'No'],
        correctAnswer: 0
    },
    {
        questionImage: "img/3.png",
        question: 'Aquest codi funciona?',
        choices: ['No', 'Sí i mostra 2', 'Sí i mostra 52'],
        correctAnswer: 2
    },
    {
        questionImage: "img/4.png",
        question: 'Quin valor mostrarà alert?',
        choices: ['1', '5', '0'],
        correctAnswer: 2
    },
    {
        questionImage: "img/5.png",
        question: 'Aquest codi funciona?',
        choices: ['No', 'Sí i mostra 0', 'Sí i mostra 12'],
        correctAnswer: 2
    },
    {
        questionImage: "img/6.png",
        question: 'Quin valor mostra?',
        choices: ['True', '2€', '10€'],
        correctAnswer: 1
    },
    {
        questionImage: "img/7.png",
        question: 'Quin valor mostra alert?',
        choices: ['8', '6', '5'],
        correctAnswer: 0
    },
    {
        questionImage: "img/8.png",
        question: 'Què mostrarà per pantalla?',
        choices: ['Volvo Saab Ford', 'Saab Ford', 'Ford'],
        correctAnswer: 1
    },
    {
        questionImage: "img/9.png",
        question: 'Què mostrarà a la pantalla?',
        choices: ['Juanito', 'Maria', 'Juanito Maria'],
        correctAnswer: 1
    },
    {
        questionImage: "img/10.png",
        question: 'Què mostrarà l’alert?',
        choices: ['L1', 'L2', 'demo2'],
        correctAnswer: 1
    }
];

let currentQuestionIndex = 0;
let answeredCount = 0;
let correctCount = 0;
let score = 0;
let countdownInterval;

const startButton = document.getElementById('startButton');
const quizContainer = document.getElementById('quizContainer');
const questionImage = document.getElementById('questionImage');
const questionElement = document.getElementById('question');
const choicesList = document.getElementById('choices');
const nextButton = document.getElementById('nextButton');
const resultContainer = document.getElementById('resultContainer');
const answeredCountElement = document.getElementById('answeredCount');
const correctCountElement = document.getElementById('correctCount');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restartButton');

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', restartQuiz);

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startQuiz() {
    startButton.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    shuffleArray(questions); // Mezcla las preguntas aleatoriamente
    showQuestion();
    startCountdown();
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionImage.src = question.questionImage;
    questionElement.textContent = question.question;

    choicesList.innerHTML = '';
    for (let i = 0; i < question.choices.length; i++) {
        const choice = question.choices[i];
        const li = document.createElement('li');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'choice';
        input.value = i;
        li.appendChild(input);
        li.appendChild(document.createTextNode(choice));
        choicesList.appendChild(li);
    }
}

function startCountdown() {
    let seconds = 30;
    countdownInterval = setInterval(() => {
        seconds--;
        document.getElementById('countdown').textContent = seconds;
        if (seconds <= 0) {
            clearInterval(countdownInterval);
            finishQuiz();
        }
    }, 1000);
}

function nextQuestion() {
    const selectedChoice = document.querySelector('input[name="choice"]:checked');
    if (selectedChoice === null) {
        alert('Has de selecionar una resposta!');
        return;
    }

    const answerIndex = parseInt(selectedChoice.value);
    const question = questions[currentQuestionIndex];
    if (answerIndex === question.correctAnswer) {
        correctCount++;
        score++;
    }

    answeredCount++;
    currentQuestionIndex++;
    selectedChoice.checked = false;

    if (currentQuestionIndex === questions.length) {
        clearInterval(countdownInterval);
        finishQuiz();
    } else {
        showQuestion();
    }
}

function finishQuiz() {
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');

    answeredCountElement.textContent = answeredCount;
    correctCountElement.textContent = correctCount;
    scoreElement.textContent = score;

    const highScore = localStorage.getItem('highScore');
    if (highScore === null || score > highScore) {
        localStorage.setItem('highScore', score);
    }
}

function restartQuiz() {
    currentQuestionIndex = 0;
    answeredCount = 0;
    correctCount = 0;
    score = 0;
    clearInterval(countdownInterval);
    resultContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    showQuestion();
    startCountdown();
}

