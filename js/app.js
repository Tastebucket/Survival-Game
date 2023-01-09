console.log("It's go time")

const game = document.getElementById('canvas')
const container = document.getElementById('container')
const points = document.getElementById('points')
const titleScreen = document.getElementById('title-screen')
const startButton = document.getElementById('start-button')
const levelDisplay = document.getElementById('level')
const ctx = game.getContext('2d')

game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])
game.height=600


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
            // console.log(way)
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
const smallEnemies = []
const seekers = []
// const enemy = new Enemy(0, 0, 30, 40, 'brown',4,true)
// const enemy2 = new Enemy(getRandomCoordinates(game.width), getRandomCoordinates(game.height), 30, 40, 'purple',8,true)
// const enemy3 = new Enemy(getRandomCoordinates(game.width), getRandomCoordinates(game.height),40, 10, 'green',13, false)

// const newOg = () => {
//     enemy3.alive = true
//     setInterval(enemy3.setDirection,300)
//     console.log('Yahoo!')
// }
const newEnemy = (rate) => {
    place = getRandomCoordinates(2)
    if (place===0) {
        smallEnemies.push(new Enemy(0, 0, 30, 40, 'brown',rate,true))
    } else {
        smallEnemies.push(new Enemy((game.width-30), (game.height-40), 30, 40, 'brown',rate,true))
    }
    console.log('Hi')
    console.log(smallEnemies)
}
const newSeeker = (rate) => {
    seekers.push(new Seeker(getRandomCoordinates(game.width), getRandomCoordinates(game.height), 30, 40, 'lightsteelblue',rate,true))
    console.log('Gonna getcha')
    console.log(seekers)
}

const detectHit = (thing) => {
    if (player.x < thing.x + thing.width
        && player.x + player.width > thing.x
        && player.y < thing.y + thing.height
        && player.y + player.height > thing.y) {
            console.log('HIT!')
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
    constructor (x,y,color,type) {
        this.x = x
        this.y = y
        this.width = 30
        this.height = 70
        this.color = color
        this.type = type
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
    console.log("This is fast in resume", fast)
    console.log("This is things in resume", things)
    console.log('as you were')

}
const createPower = () => {
    const rando = getRandomCoordinates(20)
    console.log(`This is the random number: ${rando}`)
    if (rando >= 0) {
        powerArray.push(new Power(getRandomCoordinates(game.width),getRandomCoordinates(game.height),'black','stopper'))
        console.log("pow pow")
        console.log(powerArray)
    }

}
const detectPower = (thing) => {
    if (player.x < thing.x + thing.width
        && player.x + player.width > thing.x
        && player.y < thing.y + thing.height
        && player.y + player.height > thing.y) {
            console.log('Boosted!')
            timeStop()
            powerArray.pop()

        }
}
///Stopping function, which is working. The timeouts are not. smallEnemies and seekers are the two arrays of enemies
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

let point = 0

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

const stopGameLoop = () => { 
    clearInterval(gameInterval) 
    clearInterval(enemyMove)
    clearInterval(powerInterval)
    clearInterval(releaseEnemy)
    clearInterval(releaseSeeker)
    clearInterval(newLevel)
}

//////Title Screen Functions///////
const startGame = () => {
    titleScreen.style.display = 'none'
    gameInterval = setInterval(gameLoop, 50)
    newEnemy(3)
    setEnemyDirection()
    releaseEnemy = setInterval(newEnemy,10000,(2+lvl))
    releaseSeeker = setInterval(newSeeker,16000,lvl)
    powerInterval = setInterval(createPower,18000)
    enemyMove = setInterval(setEnemyDirection, 1500)
    newLevel = setInterval(lvlUp,35000)
    //setTimeout(lvl2,15000)
}
// const highlight = (event) => {
//     event.target.style.color = 'white'
// }


startButton.addEventListener('click',startGame)
// titleScreen.addEventListener('mouseover', highlight)

////////////////TO DO///////////////////////
    // Fine tune intervals and levels
    //// when are certain enemies released? how long is a level??
    
    ///////// Title Screen //////////
    // High scores
    ///// separate high score box that doesn't get cleared with a reset
    ///// how to save high score when closing and reloading page?
    // Play Game
    // Instructions/controls

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