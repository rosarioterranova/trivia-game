export default class Trivia{
    constructor(questions){
        this.round = 0;
        this.points = 0;
        this.questions = questions
        this.actualQuestion = null
    }

    createQuestion(){
        this.actualQuestion = this.questions[this.round]
        this.render()
        this.addEvents()
    }

    render(){
        document.querySelector("#app").innerHTML = `
        <h1>Trivia Game</h1>
        <p>By Rosario Terranova</p>
        <div id="question-display">
            <p id="question">${this.actualQuestion.question}</p>
            <div id="answers">
                ${this.shuffleAnswers(this.actualQuestion)}
            </div>
        </div>
        <div id="answer-info">
                <p id="category"><b>Category</b>: ${this.actualQuestion.category}</p>
                <p id="difficulty"><b>Difficulty</b>: ${this.actualQuestion.difficulty}</p>
                <p id="round"><b>Round</b>: ${this.round}</p>
                <p id="points"><b>Points</b>: ${this.points}</p>
            </div>
        `
    }

    shuffleAnswers(){
        const answers = [this.actualQuestion.correct_answer,...this.actualQuestion.incorrect_answers]
        const shuffledArray = answers.sort((a, b) => 0.5 - Math.random());
        let answerRes = ""
        for (const ans of shuffledArray) {
            answerRes += `<button>${ans}</button>`
        }
        return answerRes
    }

    addEvents(){
        const buttons = document.querySelectorAll("button")
        for (const button of buttons) {
            button.addEventListener("click", (e) =>{
                this.verifyAnswer(e.target.innerHTML)
            })
        }
    }

    verifyAnswer(answer){
        if(answer == this.actualQuestion.correct_answer){
            alert("Correct!")
            switch(this.actualQuestion.difficulty){
                case "easy": this.points +=1 ; break;
                case "medium": this.points +=2 ; break;
                case "hard": this.points +=3 ; break;
            }
        }
        else{
            alert("Wrong! it was "+this.actualQuestion.correct_answer)
        }

        this.round++;
        if(this.round == 10){
            alert("GameOver! Final Score: "+ this.points)
            this.saveData()
        }
        else
            this.createQuestion()
    }

    saveData(){
        const name = prompt("Please enter your name", "My name");
        let leaderboard = JSON.parse(localStorage.getItem('leaderboard'));
        if(leaderboard != null){
            leaderboard.push({
                name: name,
                points: this.points,
                date: new Date().toLocaleDateString()
            })
        }
        else{
            leaderboard = [
                {
                    name: name,
                    points: this.points,
                    date: new Date().toLocaleDateString()
                }
            ]
        }
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    }
}