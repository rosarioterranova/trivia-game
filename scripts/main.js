let questions = [];

async function fetchQuestions(){
    const data = await fetch("https://opentdb.com/api.php?amount=10")
    const res = await data.json()
    questions = res.results
    console.log(questions)
}

function init(){
    fetchQuestions()
}

init()

function nextQuestion(right, wrong){
    
}