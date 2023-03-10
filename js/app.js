// console.log("It's go time")

////Grabbing DOM elements
const game = document.getElementById('canvas')
const container = document.getElementById('container')
const points = document.getElementById('points')
const titleScreen = document.getElementById('title-screen')
const startButton = document.getElementById('start-button')
const instructionButton = document.getElementById('instructions')
const highScoreButton = document.getElementById('high-scores')
const levelDisplay = document.getElementById('level')
const instructionScreen = document.getElementById('instruction-screen')
const highScoreScreen = document.getElementById('high-score-screen')
const gameOverScreen = document.getElementById('game-over-screen')
const backButton = document.getElementById('back-button')
const backButton2 = document.getElementById('back-button-2')
const playAgain = document.getElementById('play-again')
const theHighScore = document.getElementById('the-high-score')
const finalScore = document.getElementById('final-score')
const scoreboard = document.getElementById('scoreboard')
const highScorePrompt = document.getElementById('high-score-prompt')
const initial = document.getElementById('initials')

const ctx = game.getContext('2d')

game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])
game.height=600

//////Title Screen Functions///////
const startGame = () => {
    titleScreen.style.display = 'none'
    levelDisplay.textContent = `${lvl}`
    gameInterval = setInterval(gameLoop, 50)
    smallEnemies.push(new Enemy(getRandomCoordinates(game.width-30), getRandomCoordinates(game.height-40), 30, 40, 'brown',(lvl+2),true))
    setEnemyDirection()
    releaseEnemy = setInterval(newEnemy,6000,(2+lvl))
    releaseSeeker = setInterval(newSeeker,10000,lvl)
    powerInterval = setInterval(createPower,10000)
    enemyMove = setInterval(setEnemyDirection, 1300)
    newLevel = setInterval(lvlUp,12000)
    player.alive=true
    player.x=game.width/2
    player.y=game.height/2
}
const viewInstructions = () => {
    titleScreen.style.display = 'none'
    instructionScreen.style.display = 'initial'
}
const viewHighScores = () => {
    titleScreen.style.display = 'none'
    highScoreScreen.style.display = 'initial'
}
const mainMenu = () => {
    titleScreen.style.display = 'initial'
    instructionScreen.style.display = 'none'
    highScoreScreen.style.display = 'none'
    gameOverScreen.style.display = 'none'
    highScorePrompt.style.display = 'none'
    ///resets object arrays, points, and level
    point=0
    smallEnemies = []
    seekers = []
    powerArray = []
    lvl=1
}
const playAgainMenu = () => {
    recordScores()
    mainMenu()
}


startButton.addEventListener('click',startGame)
instructionButton.addEventListener('click',viewInstructions)
highScoreButton.addEventListener('click',viewHighScores)
backButton.addEventListener('click',mainMenu)
backButton2.addEventListener('click',mainMenu)
playAgain.addEventListener('click',playAgainMenu)

class Enemy {
    constructor (x,y, width, height,color,speed,alive) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.alive = alive
        this.render = function (){
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
        this.speed = speed
        this.direction = {
            up: false,
            down: false,
            left: false,
            right: false
        }
        this.setDirection = () => {
            //randomizes direction of travel
            const way = Math.floor(Math.random()*4)
            if (way == 0) {this.direction = {
                up: true,
                down: false,
                left: false,
                right: false
            }}
            if (way == 1) {this.direction = {
                up: false,
                down: true,
                left: false,
                right: false
            }}
            if (way == 2) {this.direction = {
                up: false,
                down: false,
                left: true,
                right: false
            }}
            if (way == 3) {this.direction = {
                up: false,
                down: false,
                left: false,
                right: true
            }}
        }
    
        this.moveEnemy = function () {
           
            // If Enemy hits the side of the canvas, they switch direction
            if (this.direction.up) {
                this.y -= this.speed
                if (this.y <= 0) {
                    this.direction.up = false
                    this.direction.down = true
                }
            }
            if (this.direction.left) {
                this.x -= this.speed
                if (this.x <= 0) {
                    this.direction.left = false
                    this.direction.right = true
                }
            }
            if (this.direction.down) {
                this.y += this.speed
                if (this.y + this.height >= game.height) {
                    this.direction.down = false
                    this.direction.up = true
                }
            }
            if (this.direction.right) {
                this.x += this.speed
                if (this.x + this.width >= game.width) {
                    this.direction.right = false
                    this.direction.left = true
                }
            }
        }
        this.render = function (){
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
    }

class Seeker {
    constructor (x,y, width, height,color,speed,alive) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.alive = alive
        this.render = function (){
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
        this.speed = speed
        this.direction = {
            up: false,
            down: false,
            left: false,
            right: false
        }
        this.setDirection = () => {
            if (this.x>player.x){
                this.direction.left = true
            } else {
                this.direction.left = false
            }
            if (this.x<player.x){
                this.direction.right= true
            } else {
                this.direction.right = false
            }
            if (this.y>player.y){
                this.direction.up = true
            } else {
                this.direction.up = false
            }
            if (this.y<player.y){
                this.direction.down = true
            } else {
                this.direction.down = false
            }
        }
    
        this.moveEnemy = function () {
           
            // If Enemy hits the side of the canvas, they switch direction
            if (this.direction.up) {
                this.y -= this.speed
            }
            if (this.direction.left) {
                this.x -= this.speed
                if (this.x <= 0) {
                    this.direction.left = false
                    this.direction.right = true
                }
            }
            if (this.direction.down) {
                this.y += this.speed
                if (this.y + this.height >= game.height) {
                    this.direction.down = false
                    this.direction.up = true
                }
            }
            if (this.direction.right) {
                this.x += this.speed
                if (this.x + this.width >= game.width) {
                    this.direction.right = false
                    this.direction.left = true
                }
            }
        }
        this.render = function (){
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
    }

class User {
    constructor (x,y, width, height,color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.alive = true
        this.speed = 13
        this.direction = {
            up: false,
            down: false,
            left: false,
            right: false
        }
        this.setDirection = function (key) {
            if (key.toLowerCase() == 'w') {this.direction.up = true}
            if (key.toLowerCase() == 'a') {this.direction.left = true}
            if (key.toLowerCase() == 's') {this.direction.down = true}
            if (key.toLowerCase() == 'd') {this.direction.right = true}
        }
        this.unsetDirection = function (key) {
            if (key.toLowerCase() == 'w') {this.direction.up = false}
            if (key.toLowerCase() == 'a') {this.direction.left = false}
            if (key.toLowerCase() == 's') {this.direction.down = false}
            if (key.toLowerCase() == 'd') {this.direction.right = false}
        }
        this.movePlayer = function () {


            if (this.direction.up) {
                this.y -= this.speed
                if (this.y <= 0) {
                    this.y = 0
                }
            }
            if (this.direction.left) {
                this.x -= this.speed
                if (this.x <= 0) {
                    this.x = 0
                }
            }
            if (this.direction.down) {
                this.y += this.speed
                if (this.y + this.height >= game.height) {
                    this.y = game.height - this.height
                }
            }
            if (this.direction.right) {
                this.x += this.speed
                if (this.x + this.width >= game.width) {
                    this.x = game.width - this.width
                }
            }
        }
        this.render = function (){
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}

const getRandomCoordinates = (max) => {
    return Math.floor(Math.random() * max)
}
const player = new User(game.width/2, game.height/2, 20, 20, 'purple')
let smallEnemies = []
let seekers = []

const newEnemy = () => {
    place = getRandomCoordinates(2)
    if (place===0) {
        smallEnemies.push(new Enemy(0, 0, 30, 40, 'brown',(lvl+2),true))
    } else {
        smallEnemies.push(new Enemy((game.width-30), (game.height-40), 30, 40, 'brown',(lvl+2),true))
    }
    // console.log('Hi')
    // console.log(smallEnemies)
}
const newSeeker = () => {
    seekers.push(new Seeker(getRandomCoordinates(game.width)-20, getRandomCoordinates(game.height)-30, 20, 30, 'lightsteelblue',lvl,true))
    // console.log('Gonna getcha')
    // console.log(seekers)
}

const detectHit = (thing) => {
    if (player.x < thing.x + thing.width
        && player.x + player.width > thing.x
        && player.y < thing.y + thing.height
        && player.y + player.height > thing.y) {
            player.alive = false
        }
}

    ///////// Power Ups ////////////
    // random generator determines power. perhaps 1-20 with rare powers needing one specific value
        // Time Stop: set all speeds to 0

        // Slow: reduce enemy speeds
        // Speed Boost: Up player speed
            ////// for speed related power ups, make sure to get initial speeds to that they can be restored after power up ends
        // Points: Just simple score boost
        // invincibility: TBD
        // nuke: clear all enemy arrays
let powerArray = []
class Power {
    constructor (x,y) {
        this.x = x
        this.y = y
        this.width = 25
        this.height = 40
        const rando = getRandomCoordinates(20)
        //determines what kind of power-up is deployed
        if (rando<7){
            this.color='green'
            this.type='pointer'
        } else if (rando<10) {
            this.color="black"
            this.type="stopper"
        } else if (rando<13){
            this.color = 'pink'
            this.type = 'slowpoke'
        } else if (rando<18) {
            this.color = 'white'
            this.type = 'speedy'
        } else {
            this.color = 'red'
            this.type = 'destroyer'
        }
        this.render = function (){
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}

const createPower = () => {
        powerArray.push(new Power(getRandomCoordinates(game.width-25),getRandomCoordinates(game.height-40)))
}
const detectPower = (thing) => {
    if (player.x < thing.x + thing.width
        && player.x + player.width > thing.x
        && player.y < thing.y + thing.height
        && player.y + player.height > thing.y) {
            if (thing.type === 'stopper') {
                timeStop()
            } else if (thing.type === 'pointer') {
                morePoints()
            } else if (thing.type === 'speedy') {
                speedBoost()
            } else if (thing.type === 'slowpoke') {
                timeSlow()
            } else if (thing.type === 'destroyer') {
                destroy()
            }
            const index = powerArray.indexOf(thing)
            powerArray.splice(index, 1)
        }
}
////Power up functions
///////Restart movement function
const resumeSpeed = (things, fast) => {
    for (let i = 0; i < things.length; i++) {
        things[i].speed = fast
    }
}

//Freeze Enemies

const timeStop = () => {
    for (let i = 0; i<smallEnemies.length; i++) {
        smallEnemies[i].speed = 0
    }
    for (let i = 0; i<seekers.length; i++) {
        seekers[i].speed = 0
    }
    setTimeout(resumeSpeed,5000,smallEnemies,(2+lvl))
    setTimeout(resumeSpeed,5000,seekers, lvl)
}
//Slow enemies
const timeSlow = () => {
    for (let i = 0; i<smallEnemies.length; i++) {
        smallEnemies[i].speed /= 3
    }
    for (let i = 0; i<seekers.length; i++) {
        seekers[i].speed /= 3
    }
    setTimeout(resumeSpeed,6000,smallEnemies,(2+lvl))
    setTimeout(resumeSpeed,6000,seekers, lvl)
    // console.log('tooslow')
}
//Boosts score
const morePoints = () => {
    point+=250
    // console.log('cha-ching')
}
//Speeds Up player
const speedBoost = () => {
    player.speed += 8
    setTimeout((function (){player.speed -=8}), 5000)
    // console.log('greased')
}

//Destroys enemies
const destroy = () => {
    smallEnemies=[]
    seekers=[]
    // console.log('bye')
}
let point = 0
let newHighScore = 0
theHighScore.textContent = 0

///////////GAME LOOP ///////////
const gameLoop = () => {

    ctx.clearRect(0,0, game.width, game.height)
    point += 1
    points.textContent = `${point}`
    if (player.alive){
        player.render()
        player.movePlayer()
    } else {
        stopGameLoop()
    }
    for (let i=0; i<smallEnemies.length; i++) {
        if (smallEnemies[i]){
            smallEnemies[i].render()
            smallEnemies[i].moveEnemy()
            detectHit(smallEnemies[i])
        }
    }
    for (let i=0; i<seekers.length; i++) {
        if (seekers[i]){
            seekers[i].render()
            seekers[i].moveEnemy()
            seekers[i].setDirection()
            detectHit(seekers[i])
        }
    }
    for (let i=0; i<powerArray.length; i++) {
        powerArray[i].render()
        detectPower(powerArray[i])
    }

}

document.addEventListener('keydown', (e) =>{
    player.setDirection(e.key)
})
document.addEventListener('keyup', (e) =>{
    if (['w', 'a', 's', 'd'].includes(e.key)) {
        player.unsetDirection(e.key)
    }
})

const setEnemyDirection = () => {
    for (let i = 0; i<smallEnemies.length; i++){
        smallEnemies[i].setDirection()
    }
}

let highScoreList = []
class ScoreObject {
    constructor (initials, score) {
    this.initials= initials
    this.score = score
    }
}
const highScoreOrder = (a,b) => {
    return b.score-a.score
}
const recordScores = () => {
    highScoreList.push(new ScoreObject(initial.value,point))
    highScoreList.sort(highScoreOrder)
    const oldScores = document.getElementById('the-scores')
    if (oldScores) {
        oldScores.remove()
    }
    const ulScores = document.createElement('ul')
    ulScores.id = 'the-scores'
    for (let i = 0; i<5; i++) {
        const liScore = document.createElement('li')
        if (highScoreList[i]) {
            liScore.textContent = `${highScoreList[i].initials}      ${highScoreList[i].score}`
        }
        ulScores.appendChild(liScore)
    }
    scoreboard.appendChild(ulScores)
}
//Clears all intervals and records score
const stopGameLoop = () => { 
    clearInterval(gameInterval) 
    clearInterval(enemyMove)
    clearInterval(powerInterval)
    clearInterval(releaseEnemy)
    clearInterval(releaseSeeker)
    clearInterval(newLevel)
    gameOverScreen.style.display = 'flex'
    finalScore.textContent=`You scored ${point} points`
    if (point>newHighScore) {
        newHighScore=point
        theHighScore.textContent=`${newHighScore}`
    }
    if (highScoreList[4]) {
        if (point>highScoreList[4].score){
            highScorePrompt.style.display = 'initial'
        }
    } else {
        highScorePrompt.style.display = 'initial'
    }
}




////////////////TO DO///////////////////////
    
    ///////// Title Screen //////////
    // High scores
    ///// separate high score box that doesn't get cleared with a reset
    ///// how to save high score when closing and reloading page?

    ///////// Beautify /////////////
    ///Nice background/////
    // nice lil title screen with cool fonts
    // what is the story of the game? who is avoiding what?

    ///Fix
    // powerup array pop/splice


//////// LEVEL UP FUNCTION ////////
let lvl = 1
levelDisplay.textContent = `${lvl}`
const lvlUp = () => {
    if (lvl < 10) {
    lvl +=1
    }   else {
    newEnemy(12)
    newEnemy(12)
    newSeeker(10)
    }
    for(let i=0; i<smallEnemies.length; i++) {
        smallEnemies[i].speed=(2+lvl)
    }
    for(let i=0; i<seekers.length; i++) {
        seekers[i].speed=lvl
    }
    levelDisplay.textContent=`${lvl}`
}