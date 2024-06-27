const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");

start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); 
}

exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); 
}

continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.add("activeQuiz"); 
    showQuestions(0); 
    queCounter(1); 
    next_btn.style.display = "none"; // Hide the next button initially
}

let que_count = 0;
let que_numb = 1;
let correctAnswers = 0; // Counter for correct answers

const next_btn = quiz_box.querySelector(".next_btn");

next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        next_btn.style.display = "none"; // Hide the next button until an option is selected
    } else {
        completeQuiz();
    }
}

function showQuestions(index) {
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option">' + questions[index].options[0] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[1] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[2] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[3] + '<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");

    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer) {
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if (userAns == correctAns) {
        answer.classList.add("correct");
        console.log("Answer is correct");
        answer.insertAdjacentHTML("beforeend", tickIconTag);
        correctAnswers++; // Increment correct answer counter
    } else {
        answer.classList.add("incorrect");
        console.log("Answer is wrong");
        answer.insertAdjacentHTML("beforeend", crossIconTag);
    }

    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }

    next_btn.style.display = "block"; // Show the next button when an option is selected
}

function queCounter(index) {
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>' + index + '</p>of<p>' + questions.length + '</p>Questions</span>';
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}

function completeQuiz() {
    console.log("Questions completed");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    next_btn.style.display = "none"; // Hide the next button
    
    const scoreText = result_box.querySelector(".score_text span");
    const resultText = result_box.querySelector(".complete_text");

    if (correctAnswers === questions.length) {
        resultText.textContent = "You got all the answers correct, move on to the next stage.";
        return true; // Indicate all answers are correct
    } else {
        resultText.innerHTML = `You got only ${correctAnswers} out of ${questions.length}`;
        return false; // Indicate not all answers are correct
    }

    scoreText.innerHTML = `You scored: <p>${correctAnswers}/${questions.length}</p>`;
}

const replay_btn = result_box.querySelector(".buttons .restart");
const quit_btn = result_box.querySelector(".buttons .quit");

replay_btn.onclick = () => {
    resetQuiz();
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.remove("activeResult");
    info_box.classList.add("activeInfo"); // Navigate back to the first page
}

quit_btn.onclick = () => {
    if (completeQuiz()) {
        window.location.href = "video.html"; // Navigate to the video page if all answers were correct
    } else {
        alert("You cannot quit quiz until you get all answers correct.");
    }
}

function resetQuiz() {
    que_count = 0;
    que_numb = 1;
    correctAnswers = 0; // Reset correct answer counter
    next_btn.style.display = "none"; // Hide the next button initially
}
