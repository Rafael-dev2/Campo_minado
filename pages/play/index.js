'use strict';

const { boardSize, bombs, rivotrilMode } = JSON.parse(localStorage.getItem('gameSettings') || '{}')

const NumberColors = ["yellow","blue","red","indigo","maroon","cyan","black","grey","orangered"];
let textNumberBombs = bombs;
let gameState = "start";
let gameOver = false;
let currentBombs = bombs;

const bombMessage = 'Nº DE BOMBAS: ';
const bombNumberField = document.getElementById('bombsLeft');
bombNumberField.textContent = `${bombMessage}${textNumberBombs}`;

const boardSizeField = document.getElementById('boardSize');
boardSizeField.textContent = `TAMANHO: ${boardSize}x${boardSize}`;

if(rivotrilMode){
    const typeMode = document.getElementById('mode');
    typeMode.textContent = `MODO: RIVOTRIL`;
}

const bombMap = new Map();

function generateBoard() {
    const board = document.getElementById('game-area');

    for (let i = 0; i < boardSize; i += 1) {
        const line = document.createElement('div');

        for (let j = 0; j < boardSize; j += 1) {
            const boardCell = document.createElement('div');

            boardCell.setAttribute('posx', j);
            boardCell.setAttribute('posy', i);
            boardCell.textContent = '?';

            boardCell.addEventListener('click', playerLeftClick);
            boardCell.addEventListener('contextmenu', playerRightClick);

            line.appendChild(boardCell);    
        }

        board.appendChild(line);
    }
}

function plantBombs() {
    let bombsLeft = bombs;

    while (bombsLeft > 0) {
        const randomX = Math.floor(Math.random() * boardSize);
        const randomY = Math.floor(Math.random() * boardSize);

        const formmattedPosition = formatPosition(randomX, randomY);

        if (bombMap.has(formmattedPosition)) {
            continue;
        }

        bombMap.set(formmattedPosition, true);
        bombsLeft -= 1;
    }
}

function locateCell(x, y) {
    const isOutOfBounds = (pos) => pos < 0 || pos >= boardSize;
    if (isOutOfBounds(x) || isOutOfBounds(y)) {
        return -1;
    }

    const cell = document.querySelector(`[posx="${x}"][posy="${y}"]`);
    return cell;
}

function countMines(x, y) {
    let sum = 0

    for (let pointerY = y - 1; pointerY <= y + 1; pointerY += 1) {
        for (let pointerX = x - 1; pointerX <= x + 1; pointerX += 1) {
            const actualTile = locateCell(pointerX, pointerY);

            if (actualTile === -1) {
                continue;
            }

            if (bombMap.get(formatPosition(pointerX, pointerY))) {
                sum += 1;
            }
        }
    }

    return sum;
}

function recursiveClick(x, y) {
    for (let pointerY = y - 1; pointerY <= y + 1; pointerY += 1) {
        for (let pointerX = x - 1; pointerX <= x + 1; pointerX += 1) {
            const actualTile = locateCell(pointerX, pointerY);

            if (actualTile !== -1) {
                actualTile.click();
            }
        }
    }
}

function revealMap() {
    for (let i = 0; i < boardSize; i += 1) {
        for (let j = 0; j < boardSize; j += 1) {
            const tile = locateCell(i, j);
            
            if (gameState === "lose") {
                tile.click();
                continue;
            } 
            
            if (gameState === "win") {
                if (!bombMap.get(formatPosition(i, j))) {
                    tile.click();
                }
            }

        }
    }
}

function playerLeftClick() {

    if (this.classList.contains('revealed')) {
        return;
    }

    this.classList.add('revealed');

    const posX = parseInt(this.getAttribute('posx'));
    const posY = parseInt(this.getAttribute('posy'));

    const hasBomb = bombMap.get(formatPosition(posX, posY));

    if (hasBomb) {
        if(!gameOver) {
            alert('Você explodiu!');

            gameOver = true;
            gameState = 'lose';
            startChronometer();
            handleGameEnd();

            revealMap();
        }

        this.innerText = '';

        const bombImage = document.createElement('img');
        bombImage.src = '../../imgs/bombinha.png';

        this.appendChild(bombImage);

        return;
    }

    const sum = countMines(posX, posY);
    this.style = `color: ${NumberColors[sum]}`;
    this.textContent = sum;

    if (sum === 0) {
        recursiveClick(posX, posY);
    }
}

function playerRightClick(event) {
    event.preventDefault();

    const posX = parseInt(this.getAttribute('posx'));
    const posY = parseInt(this.getAttribute('posy'));

    const hasMine = bombMap.get(formatPosition(posX, posY));
    if (hasMine) {
        currentBombs -= 1;
    }

    textNumberBombs -= 1;
    bombNumberField.textContent = `${bombMessage}${textNumberBombs}`;

    const flag = document.createElement('img');
    flag.src = '../../imgs/bombFlag.png';
    
    this.textContent = '';
    this.appendChild(flag);

    if (currentBombs === 0) {
        alert('Você venceu!');
        gameState = 'win';
        handleGameEnd();

        revealMap();
    }

    this.addEventListener('contextmenu', reverseRightClick, { once: true });
}

function reverseRightClick() {
    const posX = parseInt(this.getAttribute('posx'));
    const posY = parseInt(this.getAttribute('posy'));

    if (bombMap.get(formatPosition(posX, posY))) {
        currentBombs += 1;
    }

    textNumberBombs += 1;
    bombNumberField.textContent = `${bombMessage}${textNumberBombs}`;

    this.textContent = '?';
    this.addEventListener('contextmenu', playerRightClick, { once: true });
}

function formatPosition(x, y) {
    return `${x}-${y}`;
}

function handleTimerEnd(intervalId) {
    clearInterval(intervalId);
    gameOver = true;
    alert('Tempo esgotado!');
    let gameState = 'lose';
    revealMap();
}

function startTimer() {
    let remainingSeconds = (boardSize - 4) * 60; 
    let intervalId;
    
    const updateTimer = () => {
        if(gameOver){
            clearInterval(intervalId);
            return;
        } 
        remainingSeconds -= 1;

        const remainingMinutes = Math.floor(remainingSeconds / 60);
        const remainingSecondsFormatted = remainingSeconds % 60;

        document.getElementById('timer').textContent = `${remainingMinutes}:${remainingSecondsFormatted} minutos`;

        if (remainingSeconds === 0) {
            handleTimerEnd(intervalId);
        }
    }

    intervalId = setInterval(updateTimer, 1000);
    updateTimer();
}

function main() {
    if (!boardSize || !bombs) {
        alert('Por favor, configure o jogo antes de jogar!');
        window.open('../modeSelection/modeSelection.html', '_self');
    }

    generateBoard();
    plantBombs();
    startChronometer();
    
    if (rivotrilMode) {
        startTimer();
    }
}

let startTime;
let intervalId;
let elapsedTimeInSeconds = 0; 

function startChronometer() {
    startTime = Date.now(); 

    intervalId = setInterval(() => {
        if (gameOver) {
            clearInterval(intervalId);
            return;
        }

        const currentTime = Date.now();
        const elapsedMilliseconds = currentTime - startTime;
        elapsedTimeInSeconds = Math.floor(elapsedMilliseconds / 1000);
        
        const minutes = Math.floor(elapsedTimeInSeconds / 60);
        const seconds = elapsedTimeInSeconds % 60;

        document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds} minutos`;
    }, 1000);
}

function stopChronometer() {
    clearInterval(intervalId);
}

function handleGameEnd() {
    gameOver = true;
    stopChronometer();
    clearInterval(intervalId);
    
    const finalMinutes = Math.floor(elapsedTimeInSeconds / 60);
    const finalSeconds = elapsedTimeInSeconds % 60;
    const finalTime = `${finalMinutes}:${finalSeconds < 10 ? '0' : ''}${finalSeconds} minutos`;

    console.log('Tempo total do jogo:', finalTime);
}

function activateCheatMode() {
    const cells = document.querySelectorAll('#game-area div div');
    const cellStates = new Map();

    cells.forEach(cell => {
        const posX = parseInt(cell.getAttribute('posx'));
        const posY = parseInt(cell.getAttribute('posy'));
        const hasBomb = bombMap.get(formatPosition(posX, posY));

        cellStates.set(cell, {
            revealed: cell.classList.contains('revealed'),
            content: cell.textContent,
            color: cell.style.color,
            hasBomb: hasBomb
        });

        if (hasBomb) {
            cell.textContent = '';
            const bombImage = document.createElement('img');
            bombImage.src = '../../imgs/bombinha.png';
            cell.appendChild(bombImage);
        } else {
            const bombCount = countMines(posX, posY);
            cell.style = `color: ${NumberColors[bombCount]}`;
            cell.textContent = bombCount;
        }
    });

    setTimeout(() => {
        cells.forEach(cell => {
            const state = cellStates.get(cell);

            if (!state.revealed) {
                cell.innerHTML = '';
                cell.textContent = state.hasBomb ? '?' : '?';
                cell.style.color = state.color;
            }
        });
    }, 3000);
}

document.querySelector('.trapaca-btn').addEventListener('click', activateCheatMode);

main();

