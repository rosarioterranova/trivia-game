import Trivia from "./Trivia.js"

async function newGame(){
    const response = await fetch("https://opentdb.com/api.php?amount=10")
    const questions = await response.json()
    const trivia = new Trivia(questions.results)
    trivia.createQuestion()
}


function loadLeaderboard(){
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard'));
    if(leaderboard != null){
        let usersList = ""
        for (const user of leaderboard) {
            usersList += `<li><b>Name:</b> ${user.name} <b>Points:</b> ${user.points} <b>Date:</b> ${user.date}</li>`
        }
        document.querySelector("ul").innerHTML = usersList
    }
    else
        document.querySelector("ul").innerHTML = "No saved data"
}

document.querySelector("button").addEventListener("click",newGame)
loadLeaderboard();