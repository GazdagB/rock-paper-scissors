document.addEventListener("DOMContentLoaded", function () {

    const functions = {
        getId(id){
            return document.getElementById(id);
        },
        getClass(clas){
            return document.querySelector(`.${clas}`)
        },
        getAllClass(clas){
            return document.querySelectorAll(`.${clas}`);
        },
        compChoose(choices){
           return choices[Math.floor(Math.random()*3)]; 
        },
        playGame(playerChoice, compChoice) {
            let message = '';
            
            
            if (playerChoice === compChoice) {
              message = `😐${playerChoice} vs ${compChoice}! It's a Tie!`;
              outcome = '';
              
            } else if (
              (playerChoice === "Rock" && compChoice === "Scissors") ||
              (playerChoice === "Paper" && compChoice === "Rock") ||
              (playerChoice === "Scissors" && compChoice === "Paper")
            ) {
              message = `😁🎉🏆${playerChoice} beats ${compChoice}! You Win!`;
              outcome = "Win"
            } else if (
              (compChoice === "Rock" && playerChoice === "Scissors") ||
              (compChoice === "Paper" && playerChoice === "Rock") ||
              (compChoice === "Scissors" && playerChoice === "Paper")
            ) {
              message = `😟❌😥${compChoice} beats ${playerChoice}! You Lose!`;
              outcome = "Lose"
            }
            
           return message
          }
          
    }
    
    let choices = ["Rock", "Paper", "Scissors"];
    let playerScore = 0, compScore = 0,outcome,unClickable;
    
    let resultUserElement = functions.getClass("result-user");
    let resultCompElement = functions.getClass("result-comp");
    let messageDiv = functions.getClass("message");
    let background = functions.getId("background");

    function backgroundSetBack(){
        unClickable = true 
        setTimeout(()=>{
            background.style.backgroundColor = "#252631"
            unClickable = false; 
        },1000)
    }

    function restartGame(){
        playerScore = 0; 
        compScore = 0; 
        resultUserElement.textContent = 0; 
        resultCompElement.textContent = 0;

        outcome = ""; 

        message = ""; 
        messageDiv.textContent = "Choose a hand!"


    }

    function updateOutcome(outcome) {
        
        if (outcome === "Win") {
            playerScore++;
            background.style.backgroundColor = "#059862"
            backgroundSetBack(); 
        
        } else if (outcome === "Lose") {
            compScore++;
            background.style.backgroundColor= "#e05a5b"
            backgroundSetBack();
            
        } 
        resultUserElement.textContent = playerScore;
        resultCompElement.textContent = compScore;
    }

    function playRound(playerChoice) {
        compChoice = functions.compChoose(choices);
        message = functions.playGame(playerChoice, compChoice);
        messageDiv.textContent = message;
        updateOutcome(outcome);
    }

    let btnRock = functions.getClass("choices-container-rock");
    let btnPaper = functions.getClass("choices-container-paper");
    let btnScissors = functions.getClass("choices-container-scissors");
    let restartIcon = functions.getId("restart");

    btnRock.addEventListener("click", () => unClickable ? null : playRound(choices[0]));
    btnPaper.addEventListener("click", () => unClickable ? null : playRound(choices[1]));
    btnScissors.addEventListener("click", () => unClickable ? null : playRound(choices[2]));
    restartIcon.addEventListener("click", ()=> unClickable ? null : restartGame());
});