console.log("It's go time")

const game = document.getElementById('canvas')

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
        //add direction to be set with movehandler
        this.direction = {
            up: false,
            down: false,
            left: false,
            right: false
        }
        this.setDirection = () => {
            //randomizes direction of travel
            const way = Math.floor(Math.random()*4)
            console.log(way)
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
        //add direction to be set with movehandler
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
        this.speed = 12
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
const newEnemy = () => {
    smallEnemies.push(new Enemy(0, 0, 30, 40, 'brown',5,true))
    console.log('Hi')
    console.log(smallEnemies)
}
const newSeeker = () => {
    seekers.push(new Seeker(getRandomCoordinates(game.width), getRandomCoordinates(game.height), 30, 40, 'lightsteelblue',4,true))
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

const gameLoop = () => {

    ctx.clearRect(0,0, game.width, game.height)
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
    // enemy.moveEnemy()
    // enemy2.moveEnemy()
    // enemy3.moveEnemy()
    // movement.textContent = `${player.x}, ${player.y}`
    // points+=1
    // score.textContent = `${points}`
    
    // if (player.x + player.width >= game.width) {
    //     player.x = game.width - player.width
    // }
    // if (player.x <= 0) {
    //     player.x = 0
    // }
    // if (player.y + player.height >= game.height) {
    //     player.y = game.height - player.height
    // }
    // if (player.y <= 0) {
    //     player.y = 0
    // }

    // if (enemy.alive) {
    //     enemy.render ()
    //     detectHit(enemy)
    // }
    // if (enemy2.alive) {
    //     enemy2.render ()
    //     detectHit(enemy2)
    // }
    // if (enemy3.alive) {
    //     enemy3.render ()
    //     detectHit(enemy3)
    // }

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
document.addEventListener('DOMContentLoaded', function () {
gameInterval
const lvl1 = setInterval(newEnemy,5000)
setTimeout(lvl2,15000)
})
const lvl2 = () =>{
    const releaseSeeker = setInterval(newSeeker,8000)
}
const enemyMove = setInterval(setEnemyDirection, 1500)

const gameInterval = setInterval(gameLoop, 30)
const stopGameLoop = () => { clearInterval(gameInterval) }
