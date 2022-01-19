
const width = 28
const grid = document.querySelector('.grid')
const scoreDisplay = document.getElementById('score')
let squares = []
let score = 0

// 0 - pacdots
// 1 - wall
// 2 - ghost lair
// 3 - powerpellets
// 4 - empty

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

//create board /grid
function createBoard() {
    
    for (let i = 0; i < layout.length; i++) {

        //create a square 
        const square = document.createElement('div')
        //put square in grid 
        grid.appendChild(square)
        //put square in squares array
        squares.push(square)

        if (layout[i] === 0) 
            squares[i].classList.add('pac-dot')

        else if (layout[i] === 1) 
            squares[i].classList.add('wall')

        else if (layout[i] === 2) 
            squares[i].classList.add('ghost-lair')

        else if (layout[i] === 3) 
            squares[i].classList.add('power-pellet')
        
        
    }
}
createBoard()



//starting position of pacman 
let pacmanCurrentIndex = 490
squares[pacmanCurrentIndex].classList.add('pacman')

function control(e) {

    squares[pacmanCurrentIndex].classList.remove('pacman')

    switch(e.key) {

        case 'ArrowDown':
        if (
            !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
            pacmanCurrentIndex + width < width * width
            ) 
            pacmanCurrentIndex += width
        break

        case 'ArrowUp':
        if (
            !squares[pacmanCurrentIndex -width].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
            pacmanCurrentIndex - width >=0
            ) 
            pacmanCurrentIndex -= width
        break

        case 'ArrowLeft': 
        if( 
            !squares[pacmanCurrentIndex -1].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex -1].classList.contains('wall') &&
            pacmanCurrentIndex % width !==0
            ) 
            pacmanCurrentIndex -=1

        if (pacmanCurrentIndex % width === 0)   //364
               pacmanCurrentIndex += width-1  
        break

        case 'ArrowRight':
        if(
            !squares[pacmanCurrentIndex +1].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex +1].classList.contains('wall') &&
            pacmanCurrentIndex % width < width -1
            ) 
              pacmanCurrentIndex +=1

        if (pacmanCurrentIndex % width === width -1 )   //391 
                   pacmanCurrentIndex -= width-1
        break

    }
    // adding pacman to new currentIndex
    squares[pacmanCurrentIndex].classList.add('pacman')

    pacDotEaten()
    powerPelletEaten()

    checkForWin()
    checkForGameOver()
}
document.addEventListener('keyup', control)

/* pacdot and  power-pellet eaten by pacman  */

function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {

        squares[pacmanCurrentIndex].classList.remove('pac-dot')
        //incrementing score
        score++
        scoreDisplay.innerHTML = score
    }
}

function powerPelletEaten() {
    //if square pacman is in contains a power pellet
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {

        //remove power pellet class
        squares[pacmanCurrentIndex].classList.remove('power-pellet')

        score +=10

        //change each of the four ghosts to isScared
        ghosts.forEach(ghost => ghost.isScared = true)

        //setTimeout to unscare ghosts after 10 seconds   
        setTimeout(unScareGhosts, 10000)    
    }
}

function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
}


class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN
    }
}

const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
]

// adding ghosts onto grid
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
})

//move the ghosts
ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost) {
    
    const directions = [-1, +1, -width, +width]

    let direction = directions[Math.floor(Math.random() * directions.length)]
    
    
    ghost.timerId = setInterval(function() {
       
        //if the next square does not contain a wall and a ghost
        if (
            !squares[ghost.currentIndex + direction].classList.contains('wall') &&
            !squares[ghost.currentIndex + direction].classList.contains('ghost')
        ) 
        {
            //remove any ghost
            squares[ghost.currentIndex].classList.remove(ghost.className)
            squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')

            //add direction to current Index
            ghost.currentIndex += direction

            //add ghost class
            squares[ghost.currentIndex].classList.add(ghost.className)  
            squares[ghost.currentIndex].classList.add('ghost')  

        } 
        else 
          direction = directions[Math.floor(Math.random() * directions.length)]

        //if the ghost is currently scared 
        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost')
        }
        
        //if the ghost is current scared AND pacman is on it
        if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')) {
            //remove classnames - ghost.className, 'ghost', 'scared-ghost'
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
           
            // change ghosts currentIndex back to its startIndex
            ghost.currentIndex = ghost.startIndex
            
            //add a score of 100
            score +=100
           
            //re-add classnames of ghost.className and 'ghost' to the ghosts new postion  
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')

        }

        checkForGameOver()

    }, ghost.speed )

}

/* check for game over and win */
 
function checkForGameOver() {
    //if the square pacman is in contains a ghost 
    //AND the square does NOT contain a scared ghost 
    if (
        squares[pacmanCurrentIndex].classList.contains('ghost') && 
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost') 
     ) 
    {
        //for each ghost - we need to stop it moving
        ghosts.forEach(ghost => clearInterval(ghost.timerId))

        //remove eventlistener from our control function
        document.removeEventListener('keyup', control)

        //display gameover   
        scoreDisplay.innerHTML = 'You LOSE'
     }
}


function checkForWin() {
    if (score === 10) {

        //stop each ghost
        ghosts.forEach(ghost => clearInterval(ghost.timerId))

        //remove the eventListener for the control
        document.removeEventListener('keyup', control)

        scoreDisplay.innerHTML = 'You WON!'
    }
}