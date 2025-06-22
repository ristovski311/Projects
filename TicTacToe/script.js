// Tic Tac Toe game written by Nikola Ristovski
// 24.4.'25.

let gameOn = false;
let playerTurn = 1;
let matrixValues = [0,0,0,0,0,0,0,0,0];
// result[0] = tie, result[1] = player 1 wins, result[2] = player 2 wins
let result = [0,0,0];

const rootStyles = getComputedStyle(document.documentElement);
let player1Color = rootStyles.getPropertyValue("--player-1-color").trim();
let player2Color = rootStyles.getPropertyValue("--player-2-color").trim();

document.querySelector("#player1-color-picker").addEventListener("input", () => {
    player1Color = event.target.value;
    document.documentElement.style.setProperty("--player-1-color", player1Color);
});

document.querySelector("#player2-color-picker").addEventListener("input", () => {
    player2Color = event.target.value;
    document.documentElement.style.setProperty("--player-2-color", player2Color);
});


function checkTieCondition()
{
    let product = matrixValues.reduce(
        (acc, cur) => {
            return acc * cur;
        }
    , 1);
    console.log("Product is " + product);
    if(product != 0)
        return true;
    return false;
}

let winPossibilities = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6] 
];

function checkWinCondition()
{
    for(let pos of winPossibilities)
    {
        let [a,b,c] = [matrixValues[pos[0]],matrixValues[pos[1]],matrixValues[pos[2]]];
        if(a !== 0 && a === b && a === c)
            return true;
    }
    return false;
}

var beginButton = document.querySelector(".begin-game");

function beginButtonClick()
{
    gameOn = true;
    beginButton.style.display = "none";
    var playerTurnDisplay = Array.from(document.getElementsByClassName("player-turn"))[0];
    playerTurnDisplay.style.animation = "none";
    playerTurnDisplay.offsetHeight;
    playerTurnDisplay.style.animation = "zoom-in 0.3s";
    playerTurnDisplay.style.display = "flex";
    console.log("The game has begun!");
    let board = Array.from(document.getElementsByClassName("board"))[0];
    board.style.transition = "ease-in-out 0.4s";
    board.style.transform = "rotate(360deg)";
    setTimeout(()=>{
        board.style.transition = "none";
    }, 400);
}

beginButton.addEventListener("click", beginButtonClick);

let cellArray = Array.from(document.getElementsByClassName("board-cell"));

cellArray.forEach(cell => {
    cell.addEventListener("click", function() {

        if(!gameOn)
            return;
        else
        {
            let row = cell.getAttribute("data-row");
            let col = cell.getAttribute("data-col");

            //In case player picks the cell already picked before

            if(matrixValues[parseInt(row)*3 + parseInt(col)] != 0)
            {
                console.log(`Player ${playerTurn} tried noting cell [${row},${col}] which is already marked by player ${matrixValues[parseInt(row)*3 + parseInt(col)]}.`);
                cell.style.animation = "none";
                cell.offsetHeight;
                cell.style.animation =  "wiggle 0.2s ease-in-out";
                return;
            }

            matrixValues[parseInt(row)*3 + parseInt(col)] = playerTurn;
            console.log(`Player ${playerTurn} noted cell [${row},${col}].`);
            let playerTurnNumber = Array.from(document.getElementsByClassName("player-number"))[0];
            
            if(playerTurn == 1)
            {
                cell.textContent = 'X';
                cell.style.color = player1Color;
                cell.style.animation = "none";
                cell.offsetHeight;
                cell.style.animation = "zoom 0.5s"
            }
            else
            {
                cell.textContent = "O";
                cell.style.color = player2Color;
                cell.style.animation = "none";
                cell.offsetHeight;
                cell.style.animation = "zoom 0.5s"
            }

            setTimeout(() => {
                    if(checkWinCondition(row, col))
                    {
                        gameOn = false;
                        let winner = playerTurn%2+1;
                        console.log(`Player ${winner} has wins!`);
                        result[winner]++;
                        updateScore(winner);
                        gameEndInfo(`Player ${winner} wins!`);
                    }
                    else if(checkTieCondition())
                    {
                        gameOn = false;
                        console.log("It's a tie!");
                        result[0]++;
                        updateScore(0);
                        gameEndInfo("It's a tie!");
                    }
                    else
                        console.log(`Game is still in play!`);
                }, 50
            )

            playerTurn = playerTurn%2+1;
            playerTurnNumber.textContent = playerTurn + "'s";

            if(playerTurn == 1)
            {
                playerTurnNumber.style.color = player1Color;
                playerTurnNumber.style.animation = "none";
                playerTurnNumber.offsetHeight;
                playerTurnNumber.style.animation = "zoom 0.5s"
            }
            else
            {
                playerTurnNumber.style.color = player2Color;
                playerTurnNumber.style.animation = "none";
                playerTurnNumber.offsetHeight;
                playerTurnNumber.style.animation = "zoom 0.5s"
            }
        }
    });
});

window.addEventListener('DOMContentLoaded', () => {
    let picker = document.querySelector(".player-color-picker-container");

    requestAnimationFrame(() => {
        picker.classList.add("animation");
    });
});

function updateScore(id)
{
    var scoreText;
    if(id == 0)
        scoreText = document.querySelector("#tie-score");
    else
        scoreText = document.querySelector(`#player${id}-score`);
    let curScore = parseInt(scoreText.textContent);
    curScore++;
    scoreText.textContent = curScore;
    scoreText.style.animation = "none";
    scoreText.offsetHeight;
    scoreText.style.animation = "wiggleScore 0.4s"
}

function gameEndInfo(text)
{
    let playerTurnText = document.querySelector(".player-turn");
    playerTurnText.querySelector(".player-number").textContent = "1's";
    playerTurnText.style.animation = "zoom-out 0.3s";
    setTimeout(() => {
        playerTurnText.style.display = "none";
        playerTurnText.querySelector(".player-number").style.color = player1Color;
    }, 300);

    setTimeout(() => {
        let restartButton = document.querySelector(".restart-game");
        restartButton.style.display = "flex";
        restartButton.style.animation = "zoom-in 0.3s";
    }, 300);

    let gameEndInfoDiv = document.querySelector(".game-end-info");
    if(text.includes(1))
    {
        gameEndInfoDiv.style.backgroundColor = player1Color;
    }
    else if(text.includes(2))
    {
        gameEndInfoDiv.style.backgroundColor = player2Color;
    }
    gameEndInfoDiv.style.display = "flex";
    let gameEndInfoText = gameEndInfoDiv.querySelector("h1");
    gameEndInfoText.textContent = text;
    gameEndInfoDiv.style.animation = "expand 0.25s";
    setTimeout(() => {
        gameEndInfoDiv.style.animation = "none";
        gameEndInfoDiv.offsetHeight;
        gameEndInfoDiv.style.animation = "collapse 0.2s";
        setTimeout(() => {
            gameEndInfoDiv.style.display = "none";            
        }, 160);
    }, 3000);
}

let restartButton = document.querySelector(".restart-game");

function restartButtonClick()
{
    let restartButton = document.querySelector(".restart-game");
    restartButton.style.display = "none";
    matrixValues.fill(0);
    let cells = document.getElementsByClassName("board-cell");
    for(let cell of cells)
    {
        cell.textContent = "";
    }
    playerTurn = 1;
    beginButtonClick();

}

restartButton.addEventListener("click", restartButtonClick);

const colorSubmitButton = document.querySelector(".color-submit-button");

function colorSubmit()
{
    const mainContent = document.querySelector(".main-content");
    mainContent.classList.toggle("blur");
    const playerColorPickerContainer = document.querySelector(".player-color-picker-container");

    playerColorPickerContainer.style.animation = "none";
    playerColorPickerContainer.offsetHeight;
    playerColorPickerContainer.style.animation = "fade-out 0.2s";
    setTimeout(() => {
        playerColorPickerContainer.style.display = "none";        
    }, 150);
}

colorSubmitButton.addEventListener("click", colorSubmit);