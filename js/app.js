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

const ctx = game.getContext('2d')

game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])
game.height=600

//////Title Screen Functions///////
const startGame = () => {
    titleScreen.style.display = 'none'
    gameInterval = setInterval(gameLoop, 50)
    smallEnemies.push(new Enemy(getRandomCoordinates(game.width)-30, getRandomCoordinates(game.height)-40, 30, 40, 'brown',(lvl+2),true))
    setEnemyDirection()
    releaseEnemy = setInterval(newEnemy,10000,(2+lvl))
    releaseSeeker = setInterval(newSeeker,16000,lvl)
    powerInterval = setInterval(createPower,18000)
    enemyMove = setInterval(setEnemyDirection, 1300)
    newLevel = setInterval(lvlUp,35000)
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
    point=0
    smallEnemies = []
    seekers = []
    lvl=1
}


startButton.addEventListener('click',startGame)
instructionButton.addEventListener('click',viewInstructions)
highScoreButton.addEventListener('click',viewHighScores)
backButton.addEventListener('click',mainMenu)
backButton2.addEventListener('click',mainMenu)
playAgain.addEventListener('click',mainMenu)

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
// const enemy = new Enemy(0, 0, 30, 40, 'brown',4,true)
// const enemy2 = new Enemy(getRandomCoordinates(game.width), getRandomCoordinates(game.height), 30, 40, 'purple',8,true)
// const enemy3 = new Enemy(getRandomCoordinates(game.width), getRandomCoordinates(game.height),40, 10, 'green',13, false)

// const newOg = () => {
//     enemy3.alive = true
//     setInterval(enemy3.setDirection,300)
//     console.log('Yahoo!')
// }
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
            // console.log('HIT!')
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
const powerArray = []
class Power {
    constructor (x,y) {
        this.x = x
        this.y = y
        this.width = 25
        this.height = 40
        const rando = getRandomCoordinates(20)
        // console.log(`This is the random number: ${rando}`)
        if (rando<8){
            this.color='green'
            this.type='pointer'
        } else if (rando<11) {
            this.color="black"
            this.type="stopper"
        } else if (rando<14){
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
///////Restart movement function
const resumeSpeed = (things, fast) => {
    for (let i = 0; i < things.length; i++) {
        things[i].speed = fast
    }
    // console.log("This is fast in resume", fast)
    // console.log("This is things in resume", things)
    // console.log('as you were')

}
const createPower = () => {
        powerArray.push(new Power(getRandomCoordinates(game.width-25),getRandomCoordinates(game.height-40)))
}
const detectPower = (thing) => {
    if (player.x < thing.x + thing.width
        && player.x + player.width > thing.x
        && player.y < thing.y + thing.height
        && player.y + player.height > thing.y) {
            // console.log('Boosted!')
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
            powerArray.pop()

        }
}
////Power up functions
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
        smallEnemies[i].speed /= 2
    }
    for (let i = 0; i<seekers.length; i++) {
        seekers[i].speed /= 2
    }
    setTimeout(resumeSpeed,5000,smallEnemies,(2+lvl))
    setTimeout(resumeSpeed,5000,seekers, lvl)
    // console.log('tooslow')
}
//Boosts score
const morePoints = () => {
    point+=250
    // console.log('cha-ching')
}
//Speeds Up player
const speedBoost = () => {
    player.speed += 5
    setTimeout((function (){player.speed -=5}), 5000)
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
let gameInterval
let powerInterval
let enemyMove
// document.addEventListener('DOMContentLoaded', function () {
//     gameInterval = setInterval(gameLoop, 30)
//     lvl1 = setInterval(newEnemy,5000)
//     powerInterval = setInterval(createPower,10000)
//     enemyMove = setInterval(setEnemyDirection, 1500)
//     //setTimeout(lvl2,15000)
// })
highScoreList = []
const highScoreOrder = (a,b) => {
    return b-a
}
const recordScores= () => {
    highScoreList.push(point)
    highScoreList.sort(highScoreOrder)
    // console.log(highScoreList)
    const oldScores = document.getElementById('the-scores')
    if (oldScores) {
        oldScores.remove()
    }
    const ulScores = document.createElement('ul')
    ulScores.id = 'the-scores'
    for (let i = 0; i<5; i++) {
        const liScore = document.createElement('li')
        if (highScoreList[i]) {
            liScore.textContent = highScoreList[i]
        }
        ulScores.appendChild(liScore)
    }
    scoreboard.appendChild(ulScores)
}
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
    recordScores()
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