let newBtn = document.querySelector('#js-new-quote');
newBtn.addEventListener('click', getQuote);

let answerBtn = document.querySelector('#js-tweet');
answerBtn.addEventListener('click', showAnswer);

const answerText = document.querySelector('#js-answer-text');

let current = {
    question: "",
    answer: ""
}

const endpoint = 'https://trivia.cyberwisp.com/getrandomchristmasquestion';

async function getQuote() {
   try {
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw Error(response.statusText);
    }
    const json = await response.json();

    displayQuote(json['question']);
    current.question = json["question"];
    current.answer = json["answer"];

    answerText.textContent = "";

   } catch (err) {
    console.log(err);
    alert('Failed to catch new quote');
   }
}

function displayQuote(quote) {
    const quoteText = document.querySelector('#js-quote-text');
    quoteText.textContent = quote;
}

function showAnswer() {
    answerText.textContent = current.answer;
}

getQuote();