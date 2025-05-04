document.addEventListener("DOMContentLoaded", () => {
    const welcomeScreen = document.getElementById("welcome-screen");
    const questionScreen = document.getElementById("question-screen");
    const resultScreen = document.getElementById("result-screen");

    const playerForm = document.getElementById("player-form");
    const playerNameInput = document.getElementById("player-name");

    const currentPlayerDisplay = document.getElementById("current-player");
    const currentQuestionDisplay = document.getElementById("current-question");
    const totalQuestionsDisplay = document.getElementById("total-questions");
    const currentScoreDisplay = document.getElementById("current-score");

    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");
    const optionTemplate = document.getElementById("option-template");

    const feedBackContainer = document.getElementById("feedback-container");
    const feedbackText = document.getElementById("feedback-text");
    const nextButton = document.getElementById("next-button");

    const resultPlayerName = document.getElementById("result-player-name");
    const resultScore = document.getElementById("result-score");
    const resultTotal = document.getElementById("result-total");
    const resultPercentage = document.getElementById("result-percentage");
    const restartButton = document.getElementById("restart-button");

    let currentQuestion = 0;
    let score = 0;
    let currentPlayer = "";
    let hasAnswered = false;
    let quizQuestions = [];

    // JSON файл динамически
    function getJsonPath() {
        const depth = location.pathname.split('/').length - 2;
        return `${'../'.repeat(depth)}assets/json/data-quiz.json`;
    }

    // Функция для перемешивания массива
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; 
        }
        return array;
    }

    //  вопросы из JSON
    fetch(getJsonPath())
        .then(response => response.json())
        .then(data => {
            quizQuestions = shuffleArray(data).slice(0, 15); // Берём только 15 случайных 
            questionsCount = quizQuestions.length;

            if (resultTotal) {
                resultTotal.innerText = questionsCount;
            } else {
                console.error("Элемент result-total не найден в DOM");
            }

            if (totalQuestionsDisplay) {
                totalQuestionsDisplay.innerText = questionsCount;
            } else {
                console.error("Элемент total-questions не найден в DOM");
            }

            console.log("Вопросы загружены и перемешаны:", quizQuestions); // Проверяем, что вопросы загружены и перемешаны
        })
        .catch(error => console.error("Ошибка при загрузке JSON:", error));

    playerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        currentPlayer = playerNameInput.value.trim();
        if (!currentPlayer) {
            alert("Enter your name");
            return;
        }

        currentPlayerDisplay.innerText = currentPlayer;
        resultPlayerName.innerText = currentPlayer;
        welcomeScreen.classList.remove("active");
        questionScreen.classList.add("active");
        loadQuestion(currentQuestion);
    });

    nextButton.addEventListener("click", () => {
        console.log("Next button clicked, current question:", currentQuestion);

        currentQuestion++;
        hasAnswered = false;
        feedBackContainer.classList.add("hidden");

        if (currentQuestion < quizQuestions.length) {
            loadQuestion(currentQuestion);
        } else {
            showResults();
            nextButton.disabled = true; // Блокируем кнопку в конце
        }
    });

    restartButton.addEventListener("click", resetQuiz);

    function loadQuestion(index) {
        if (index >= quizQuestions.length) {
            console.log("Игра завершена, больше вопросов нет.");
            return; // если игра завершена
        }

        nextButton.disabled = true;

        console.log(`[Quiz] Загружаем вопрос ${index + 1} из ${quizQuestions.length}`);
        console.log("Загружаем вопрос:", index);

        currentQuestionDisplay.textContent = index + 1;
        const question = quizQuestions[index];
        questionText.innerText = question.question;
        optionsContainer.innerHTML = ""; // Очищаем контейнер вариантов

        feedBackContainer.classList.add("hidden");
        feedBackContainer.classList.remove("correct");
        feedBackContainer.classList.remove("incorrect");

        question.options.forEach((option, i) => {
            const optionElement = optionTemplate.content.cloneNode(true);
            const radioInput = optionElement.querySelector("input");
            const label = optionElement.querySelector("label");

            const optionId = `option-${index}-${i}`;
            radioInput.id = optionId;
            label.htmlFor = optionId;
            label.innerText = option;

            const optionContainer = optionElement.querySelector(".option");
            optionContainer.addEventListener("click", () => {
                if (!hasAnswered) {
                    selectOption(i);
                }
            });

            optionsContainer.appendChild(optionElement);
        });
    }

    nextButton.disabled = true;

    function selectOption(selectedIndex) {
        if (hasAnswered) return;

        hasAnswered = true;
        nextButton.disabled = false; // Разблокируем кнопку 
        const question = quizQuestions[currentQuestion];
        const options = optionsContainer.querySelectorAll('.option');
        feedBackContainer.classList.remove("hidden");

        options.forEach(opt => {
            opt.classList.remove("correct");
            opt.classList.remove("incorrect");
        });

        const isCorrect = selectedIndex === question.correctAnswer;

        if (isCorrect) {
            score++;
            console.log(`Правильный ответ! Текущий счет: ${score}`);
        } else {
            console.log(`Неправильный ответ. Счет остается: ${score}`);
        }

       
        currentScoreDisplay.innerText = score;

       
        const percentage = Math.round((score / (currentQuestion + 1)) * 100);
        resultPercentage.innerText = `${percentage}%`;

        if (isCorrect) {
            options[selectedIndex].classList.add("correct");
            feedBackContainer.classList.add("correct");
            feedbackText.innerText = `Correct! ${question.explanation}`;
        } else {
            options[selectedIndex].classList.add("incorrect");
            feedBackContainer.classList.add("incorrect");
            feedbackText.innerText = `Incorrect! ${question.explanation}`;
        }
    }

    function showResults() {
        questionScreen.classList.remove("active");
        resultScreen.classList.add("active");

        if (quizQuestions.length === 0) {
            resultPercentage.innerText = "0%";
            resultScore.innerText = "0";
            resultTotal.innerText = "0";
            return;
        }

      
        const percentage = Math.round((score / quizQuestions.length) * 100);

       
        resultPercentage.innerText = `${percentage}%`;
        resultScore.innerText = score; 
        resultTotal.innerText = quizQuestions.length; 
    }

    function resetQuiz() {
        currentQuestion = 0;
        score = 0;
        currentPlayer = "";
        hasAnswered = false;
        currentPlayerDisplay.innerText = "";
        currentQuestionDisplay.innerText = currentQuestion;
        feedBackContainer.classList.remove("correct", "incorrect");
        playerNameInput.value = "";
        welcomeScreen.classList.add("active");
        questionScreen.classList.remove("active"); 
        resultScreen.classList.remove("active");
    }
});