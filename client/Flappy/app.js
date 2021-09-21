document.addEventListener('DOMContentLoaded' , () => {
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.gmae-container')
    const ground = document.querySelector('.ground')

    let birdLeft = 220
    let birdBottom = 100

    function startGame() {
        bird.style.bottom = birdBottom  + 'px'

    }
    startGame()
})