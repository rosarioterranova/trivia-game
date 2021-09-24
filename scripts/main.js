import Trivia from "./Trivia.js"

async function fetchQuestions(){
    const data = await fetch("https://opentdb.com/api.php?amount=10")
    const res = await data.json()
    return res.results
}

async function init(){
    const questions = await fetchQuestions()
    const trivia = new Trivia(questions)
    trivia.createQuestion()
}

init()