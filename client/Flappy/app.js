document.addEventListener('DOMContentLoaded' , () => {
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')

    let birdLeft = 220
    let birdBottom = 200
    let gravity = 2


    function StartGame() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'

    }
    let timerID = setInterval(StartGame, 20)

    function control(e) {
        if (e.keyCode === 32) {
            jump()
        } 
    }

    function jump(){
        if (birdBottom < 650) birdBottom += 50
        bird.style.bottom = birdBottom + 'px'
        console.log(birdBottom)

    }
    document.addEventListener('keyup', control)


    function generateObtacle()  {
        let obstacleLeft = 500
        let obstacleBottom = 150 
        const obstacle = document.createElement('div') 
        obstacle.classList.add('obstacle')
        gameDisplay.appendChild(obstacle)
        obstacle.style.left = obstacleLeft +  'px'
        obstacle.style.bottom = obstacleBottom + 'px'
    }

    generateObtacle()
       
}) 