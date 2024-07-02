// Jeu de Réaction au Changement de Couleur
let startTime;
let endTime;
let isWaitingForClick = false;

function changeColor() {
    const reactionTimeGame = document.getElementById('reaction-time-game');
    reactionTimeGame.style.backgroundColor = 'green';
    startTime = new Date().getTime();
    isWaitingForClick = true;
}

function recordReactionTime() {
    if (isWaitingForClick) {
        endTime = new Date().getTime();
        const reactionTime = endTime - startTime;
        document.getElementById('reaction-time-result').innerText = `Votre temps de réaction est de ${reactionTime} millisecondes.`;
        resetReactionGame();
    }
}

function resetReactionGame() {
    setTimeout(() => {
        const reactionTimeGame = document.getElementById('reaction-time-game');
        reactionTimeGame.style.backgroundColor = 'lightgrey';
        isWaitingForClick = false;
        setTimeout(changeColor, Math.random() * 2000 + 1000);
    }, 2000);
}

document.getElementById('reaction-time-game').addEventListener('click', recordReactionTime);
setTimeout(changeColor, Math.random() * 2000 + 1000);

// Jeu de Cibles
let targetStartTime;
let targetEndTime;
let clickTimes = [];
let targetCount = 5;
let targetsHit = 0;

function startTargetGame() {
    clickTimes = [];
    targetsHit = 0;
    document.getElementById('target-game-result').innerText = '';
    createTarget();
}

function createTarget() {
    const targetGame = document.getElementById('target-game');
    const target = document.createElement('div');
    target.className = 'target';
    target.style.top = `${Math.random() * 250}px`;
    target.style.left = `${Math.random() * 250}px`;
    targetGame.appendChild(target);
    targetStartTime = new Date().getTime();
    target.addEventListener('click', targetClicked);
}

function targetClicked(event) {
    targetEndTime = new Date().getTime();
    const reactionTime = targetEndTime - targetStartTime;
    clickTimes.push(reactionTime);
    targetsHit++;
    event.target.remove();

    if (targetsHit < targetCount) {
        createTarget();
    } else {
        const averageReactionTime = clickTimes.reduce((a, b) => a + b, 0) / clickTimes.length;
        document.getElementById('target-game-result').innerText = `Votre temps de réaction moyen est de ${averageReactionTime.toFixed(2)} millisecondes.`;
    }
}
