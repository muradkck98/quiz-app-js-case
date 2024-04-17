

const API = "https://jsonplaceholder.typicode.com/posts";

let numberofQuestion = 1;
let questions = [];
let results = [];

const question_number = document.getElementById("questionNumber");
const question_text = document.getElementById("questionText");
const selection_A = document.getElementById("selectionA");
const selection_B = document.getElementById("selectionB");
const selection_C = document.getElementById("selectionC");
const selection_D = document.getElementById("selectionD");
let eachQuestionTimeLeft;
let autoNextQuestion;

const pageLoad = async () => {
    try {
        const response = await fetch(API);
        const data = await response?.json();
        questions = data?.slice(0, 10);
        renderQuestion();
    } catch (error) {
        document.querySelector(".container").style = "display:none";
        document.getElementById("error").innerHTML = error;
    }
};
window.addEventListener("load", pageLoad);

const renderQuestion = () => {
    if (numberofQuestion < 11) {
        question_number.innerHTML = "Q" + numberofQuestion + ":";
        const firstLetterUpper = questions[numberofQuestion - 1]?.body.charAt(0).toUpperCase() + questions[numberofQuestion - 1]?.body.slice(1)
        question_text.innerHTML = firstLetterUpper + "?";

        selection_A.innerHTML =
            "A) " + questions[numberofQuestion - 1]?.body.split(" ")[0];
        selection_B.innerHTML =
            "B) " + questions[numberofQuestion - 1]?.body.split(" ")[1];
        selection_C.innerHTML =
            "C) " + questions[numberofQuestion - 1]?.body.split(" ")[2];
        selection_D.innerHTML =
            "D) " + questions[numberofQuestion - 1]?.body.split(" ")[3];

        const buttons = document.querySelectorAll("button");
        buttons?.forEach((btn) => (btn.disabled = true));

        let timeLeft = 30;
        document.getElementById("timer").innerHTML = timeLeft;

        eachQuestionTimeLeft = setInterval(() => {
            timeLeft--;
            document.getElementById("timer").innerHTML = timeLeft;
        }, 1000);

        autoNextQuestion = setTimeout(() => {
            clearInterval(eachQuestionTimeLeft);
            manuelNextQuestion();
        }, 30000);

        setTimeout(() => {
            buttons?.forEach((btn) => (btn.disabled = false));
            buttons?.forEach((btn) =>
                btn.addEventListener("click", takeUserAnswer)
            );
        }, 10000);
    } else {
        document.getElementById("quizSection").innerHTML = "";

        const mainTable = document.createElement("table");
        document.querySelector(".container").appendChild(mainTable);

        const tableTr = document.createElement("tr");
        const tableThQuestion = document.createElement("th");
        tableThQuestion.innerText = "Questions";

        const tableThAnswer = document.createElement("th");
        tableThAnswer.innerText = "Answers";

        mainTable.appendChild(tableTr);
        tableTr.appendChild(tableThQuestion);
        tableTr.appendChild(tableThAnswer);

        results.map((result, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="question-result">${"Q" + (index + 1) + ")" + result.question.charAt(0).toUpperCase() + result.question.slice(1)}?</td>
                <td class="answer-result">${result.answer.slice(0, 3) + result.answer.charAt(3).toUpperCase() + result.answer.slice(4)}</td>
            `;
            mainTable.appendChild(row);
        });
    }
};

const manuelNextQuestion = () => {
    results.push({
        question: questions[numberofQuestion - 1]?.body,
        answer: "Not answer",
    });
    numberofQuestion++;
    clearInterval(eachQuestionTimeLeft);
    clearTimeout(autoNextQuestion);
    renderQuestion();
};

const takeUserAnswer = (event) => {
    const buttonText = event.target.textContent;
    results.push({
        question: questions[numberofQuestion - 1]?.body,
        answer: buttonText,
    });
    numberofQuestion++;
    clearInterval(eachQuestionTimeLeft);
    clearTimeout(autoNextQuestion);
    renderQuestion();
};