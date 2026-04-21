const answerSection = document.getElementById("answerSection");
const openBtn = document.getElementById("openBtn");
const panel = document.getElementById("panel");
const questionEl = document.getElementById("question");
const answerInput = document.getElementById("answer");
const submitBtn = document.getElementById("submit");
const sliderContainer = document.getElementById("sliderContainer");

let correctAnswer = 0;


function generateQuestion() {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  correctAnswer = a + b;
  questionEl.textContent = `What is ${a} + ${b}?`;
}

openBtn.addEventListener("click", () => {
  panel.classList.remove("hidden");
  answerSection.classList.remove("hidden"); 
  generateQuestion();
});

submitBtn.addEventListener("click", () => {
  const userAnswer = parseInt(answerInput.value);

  if (userAnswer === correctAnswer) {
    showSliderTemporarily();
  }

  // 👇 Always runs (correct OR wrong)
  answerInput.value = "";
  generateQuestion();
});

function showSliderTemporarily() {
  panel.classList.add("hidden");
  sliderContainer.classList.remove("hidden");

  setTimeout(() => {
    sliderContainer.classList.add("hidden");
    answerInput.value = "";
  }, 2000); // disappears after 2 seconds
}