import Ball from './Ball.js'
import Paddle from './Paddle.js'

const ball = new Ball(document.querySelector('.ball'))
const playerPaddle = new Paddle(document.querySelector("#player-paddle"))
const computerPaddle = new Paddle(document.querySelector("#computer-paddle"))
const playerScoreElem = document.querySelector('#player-score')
const computerScoreElem = document.querySelector('#computer-score')

let lastTime

function update(time) {

    if (lastTime != null) {
        const delta = time - lastTime
        ball.update(delta , [playerPaddle.rect() , computerPaddle.rect()])
        computerPaddle.update(delta, ball.y)
        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hue'))
        if (isLose()) handleLose()

        document.documentElement.style.setProperty("--hue" , hue + delta *0.01)
    }

    lastTime = time
    window.requestAnimationFrame(update)
}

function isLose() {
const rect = ball.rect()
return rect.right >= window.innerWidth || rect.left <= 0

}

function handleLose() {
    const rect = ball.rect()

    if(rect.right >= window.innerWidth) {
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
    }

    else{
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
    }
    ball.reset()
    computerPaddle.reset()
    
}

document.addEventListener("mousemove" , e => {
playerPaddle.position = (e.y / window.innerHeight) *100
})

window.requestAnimationFrame(update)