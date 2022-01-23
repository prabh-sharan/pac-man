
const width = 28
const grid = document.querySelector(".grid")

const scoreDisplay = document.getElementById("score")
const result = document.getElementById("result")
const playAgain= document.getElementById("play-again")

let squares = []
let score = 0


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

        
        const square = document.createElement("div")
        //putting square in grid 
        grid.appendChild(square)
        //putting square in squares array
        squares.push(square)

        if (layout[i] === 0)    // 0 - pacdots
            squares[i].classList.add("pac-dot")

        else if (layout[i] === 1)  // 1 - wall
            squares[i].classList.add("wall")

        else if (layout[i] === 2)  // 2 - ghost lair
            squares[i].classList.add("ghost-lair")

        else if (layout[i] === 3)  // 3 - powerpellets
            squares[i].classList.add("power-pellet")
        
        else if (layout[i] === 4) // 4 - empty
            squares[i].classList.add("empty")
        
    }
}
createBoard()



//starting position of pacman 
let pacmanCurrentIndex = 490
squares[pacmanCurrentIndex].classList.add("pacman")

function control(e) {

    squares[pacmanCurrentIndex].classList.remove("pacman")

    switch(e.key) {

        case "ArrowDown":
        if (
            !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair") &&
            !squares[pacmanCurrentIndex + width].classList.contains("wall") &&
            pacmanCurrentIndex + width < width * width
            ) 
            pacmanCurrentIndex += width
        break

        case "ArrowUp":
        if (
            !squares[pacmanCurrentIndex -width].classList.contains("ghost-lair") &&
            !squares[pacmanCurrentIndex - width].classList.contains("wall") &&
            pacmanCurrentIndex - width >=0
            ) 
            pacmanCurrentIndex -= width
        break

        case "ArrowLeft": 
        if( 
            !squares[pacmanCurrentIndex -1].classList.contains("ghost-lair") &&
            !squares[pacmanCurrentIndex -1].classList.contains("wall") &&
            pacmanCurrentIndex % width !==0
            ) 
            pacmanCurrentIndex -=1

        if (pacmanCurrentIndex % width === 0)   //364 position
               pacmanCurrentIndex += width-1  
        break

        case "ArrowRight":
        if(
            !squares[pacmanCurrentIndex +1].classList.contains("ghost-lair") &&
            !squares[pacmanCurrentIndex +1].classList.contains("wall") &&
            pacmanCurrentIndex % width < width -1
            ) 
              pacmanCurrentIndex +=1

        if (pacmanCurrentIndex % width === width -1 )   //391 
                   pacmanCurrentIndex -= width-1
        break

    }
    
    // adding pacman to new currentIndex
    squares[pacmanCurrentIndex].classList.add("pacman")

    pacDotEaten()
    powerPelletEaten()

    checkForWin()
    checkForGameOver()
}
document.addEventListener("keyup", control)

/* pacdot and  power-pellet eaten by pacman  */

function pacDotEaten() {

    if (squares[pacmanCurrentIndex].classList.contains("pac-dot")) {

        squares[pacmanCurrentIndex].classList.remove("pac-dot")

        squares[pacmanCurrentIndex].classList.add("empty")

        //incrementing score
        score++
        scoreDisplay.innerHTML = score
    }
}

function powerPelletEaten() {

    //if square pacman is in contains a power pellet
    if (squares[pacmanCurrentIndex].classList.contains("power-pellet")) {

        //removing power pellet class
        squares[pacmanCurrentIndex].classList.remove("power-pellet")

        score +=10
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

let ghosts = [
    new Ghost("blinky", 348, 250),
    new Ghost("pinky", 376, 400),
    new Ghost("inky", 351, 300),
    new Ghost("clyde", 379, 500)
]

// adding ghosts onto grid
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add("ghost")
})

//move the ghosts
ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost) {
    
    const directions = [-1, +1, -width, +width]

    let direction = directions[Math.floor(Math.random() * directions.length)]
    
    
    ghost.timerId = setInterval(function() {
       
        //if the next square does not contain a wall and a ghost
        if (
            !squares[ghost.currentIndex + direction].classList.contains("wall") &&
            !squares[ghost.currentIndex + direction].classList.contains("ghost")
        ) 
        {
            //removing any ghost
            squares[ghost.currentIndex].classList.remove(ghost.className)
            squares[ghost.currentIndex].classList.remove("ghost", "scared-ghost")

            //adding direction to current Index
            ghost.currentIndex += direction

            //adding ghost class
            squares[ghost.currentIndex].classList.add(ghost.className)  
            squares[ghost.currentIndex].classList.add("ghost")  

        } 
        else 
          direction = directions[Math.floor(Math.random() * directions.length)]

        //if the ghost is currently scared 
        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add("scared-ghost")
        }
        
        //if the ghost is current scared AND pacman is on it
        if (ghost.isScared && squares[ghost.currentIndex].classList.contains("pacman")) {

            //removining classnames - ghost.className, "ghost", "scared-ghost"
            squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost")
           
            // changining ghosts currentIndex back to its startIndex
            ghost.currentIndex = ghost.startIndex
            score +=100
           
            //re-add classnames of ghost.className and "ghost" to the ghosts new postion  
            squares[ghost.currentIndex].classList.add(ghost.className, "ghost")

        }

        checkForGameOver()

    }, ghost.speed )

}

/* check for game over and win */
 
function checkForGameOver() {
    //if the square pacman  contains a ghost 
    //AND the square does NOT contain a scared ghost 
    if (
        squares[pacmanCurrentIndex].classList.contains("ghost") && 
        !squares[pacmanCurrentIndex].classList.contains("scared-ghost") 
     ) 
    {
        //for each ghost -stop it moving
        ghosts.forEach(ghost => clearInterval(ghost.timerId))

        //removing eventlistener from control function
        document.removeEventListener("keyup", control)

        //displaying gameover and play again button 
        result.innerHTML= "GAME OVER!!"
        result.style.color= "red"
        playAgain.style.display = "inline-block"
     }
}


function checkForWin() {
    if (score === 290) {

        //stopping each ghost
        ghosts.forEach(ghost => clearInterval(ghost.timerId))

        //removing the eventListener for the control
        document.removeEventListener("keyup", control)

        result.innerHTML= "You WON!!"
        result.style.color= "greenyellow"
        playAgain.style.display = "inline-block";
    }
}

// starting new game when play again button clicked
function newGame(){

    // hiding button and removing pacman from current index
    playAgain.style.display = "none"
    squares[pacmanCurrentIndex].classList.remove("pacman")
    
    // changing the scoreboard back to 0 
    score = 0
    scoreDisplay.innerHTML = " "
    result.innerHTML= ""

    //changing pacmanCurrentIndex back to 490 and adding class pacman
    pacmanCurrentIndex = 490

    squares[pacmanCurrentIndex].classList.add("pacman")
    document.addEventListener("keyup", control)

    // adding pac-dots and power-pellet eaten again to grid 
    for (let i = 0; i < layout.length; i++){

        if (layout[i] === 0){ 
            squares[i].classList.remove("empty")
            squares[i].classList.add("pac-dot")
        }    

        if (layout[i] === 3) 
            squares[i].classList.add("power-pellet")    
    }
    
    // remove ghost from all current index
    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.remove(ghost.className)
        squares[ghost.currentIndex].classList.remove("ghost")
    })

    ghosts = [
        new Ghost("blinky", 348, 250),
        new Ghost("pinky", 376, 400),
        new Ghost("inky", 351, 300),
        new Ghost("clyde", 379, 500)
    ]

    // adding ghosts back onto grid
    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.add(ghost.className)
        squares[ghost.currentIndex].classList.add("ghost")
    })
    
    ghosts.forEach(ghost => moveGhost(ghost))

}
playAgain.addEventListener("click",newGame)