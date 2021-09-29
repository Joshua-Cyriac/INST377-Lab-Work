document.addEventListener('DOMContentLoaded', () => {
  // pick out the grid element from the HTML
    const grid = document.querySelector('.grid')
    // create a div within the javascript file to make the doodler
    const doodler = document.createElement('div')
    let isGameOver = false
    let speed = 3
    let platformCount = 5
    let platforms = []
    let score = 0
    let doodlerLeftSpace = 50
    let startPoint = 150
    let doodlerBottomSpace = startPoint
    const gravity = 0.9
    let upTimerId
    let downTimerId
    let isJumping = true
    let isGoingLeft = false
    let isGoingRight = false
    let leftTimerId
    let rightTimerId
  
    // construct 
    class Platform {
      constructor(newPlatBottom) {
        // subtract the grid width from the platform width to make the platforms be in the area within the grid
        this.left = Math.random() * 315
        this.bottom = newPlatBottom
        // this will generate a div in each platform
        this.visual = document.createElement('div')
        // This will create a new viual for the platform that we are going to make
        const visual = this.visual
        visual.classList.add('platform')
        visual.style.left = this.left + 'px'
        visual.style.bottom = this.bottom + 'px'
        grid.appendChild(visual)
      }
    }
  
  // Generate Platforms and make it display 5 platforms at a time on the screen 
    function createPlatforms() {
      for(let i =0; i < platformCount; i++) {
        //Make a gap between each platform and give each platform a new incriment in height so they are not stack near each other
        // 600 being the height of the container
        let platGap = 600 / platformCount
        let newPlatBottom = 100 + i * platGap
        let newPlatform = new Platform (newPlatBottom)
        // push platforms to see platforms 
        platforms.push(newPlatform)
        console.log(platforms)
      }
    }
  
    function movePlatforms() {
      if (doodlerBottomSpace > 200) {
          platforms.forEach(platform => {
            platform.bottom -= 4
            let visual = platform.visual
            visual.style.bottom = platform.bottom + 'px'
  
            if(platform.bottom < 10) {
              let firstPlatform = platforms[0].visual
              firstPlatform.classList.remove('platform')
              platforms.shift()
              console.log(platforms)
              score++
              var newPlatform = new Platform(600)
              platforms.push(newPlatform)
            }
        }) 
      }
      
    }
    // make a function to pull the doodler into the grid so it will be presented
    function createDoodler() {
      grid.appendChild(doodler)
      // Add the doodler to class
      doodler.classList.add('doodler')
      doodlerLeftSpace = platforms[0].left
      // Move the doodler to the right and then shift it to the bottom for the inital position
      doodler.style.left = doodlerLeftSpace + 'px'
      doodler.style.bottom = doodlerBottomSpace + 'px'
    }
  
  function fall() {
    isJumping = false
      clearInterval(upTimerId)
      downTimerId = setInterval(function () {
        doodlerBottomSpace -= 5
        doodler.style.bottom = doodlerBottomSpace + 'px'
        if (doodlerBottomSpace <= 0) {
          gameOver()
        }
        platforms.forEach(platform => {
          if (
            (doodlerBottomSpace >= platform.bottom) &&
            (doodlerBottomSpace <= (platform.bottom + 15)) &&
            ((doodlerLeftSpace + 60) >= platform.left) && 
            (doodlerLeftSpace <= (platform.left + 85)) &&
            !isJumping
            ) {
              console.log('tick')
              startPoint = doodlerBottomSpace
              jump()
              console.log('start', startPoint)
              isJumping = true
            }
        })
  
      },20)
  }
  // Create a function which allows the doodler to jump
    function jump() {
      clearInterval(downTimerId)
      isJumping = true
      upTimerId = setInterval(function () {
        console.log(startPoint)
        console.log('1', doodlerBottomSpace)
        doodlerBottomSpace += 20
        doodler.style.bottom = doodlerBottomSpace + 'px'
        console.log('2',doodlerBottomSpace)
        console.log('s',startPoint)
        if (doodlerBottomSpace > (startPoint + 200)) {
          fall()
          isJumping = false
        }
      },30)
    }
  
    function moveLeft() {
      if (isGoingRight) {
          clearInterval(rightTimerId)
          isGoingRight = false
      }
      isGoingLeft = true
      leftTimerId = setInterval(function () {
          if (doodlerLeftSpace >= 0) {
            console.log('going left')
            doodlerLeftSpace -=5
             doodler.style.left = doodlerLeftSpace + 'px'
          } else moveRight()
      },20)
    }
  
    function moveRight() {
      if (isGoingLeft) {
          clearInterval(leftTimerId)
          isGoingLeft = false
      }
      isGoingRight = true
      rightTimerId = setInterval(function () {
        //changed to 313 to fit doodle image
        if (doodlerLeftSpace <= 313) {
          console.log('going right')
          doodlerLeftSpace +=5
          doodler.style.left = doodlerLeftSpace + 'px'
        } else moveLeft()
      },20)
    }
    
    function moveStraight() {
      isGoingLeft = false
      isGoingRight = false
      clearInterval(leftTimerId)
      clearInterval(rightTimerId)
    }
  
    //assign functions to keyCodes for the direction of where the doodler is moving
    function control(e) {
      doodler.style.bottom = doodlerBottomSpace + 'px'
      if(e.key === 'ArrowLeft') {
        moveLeft()
      } else if (e.key === 'ArrowRight') {
        moveRight()
      } else if (e.key === 'ArrowUp') {
        moveStraight()
      }
    }
  
    function gameOver() {
      isGameOver = true
      while (grid.firstChild) {
        console.log('remove')
        grid.removeChild(grid.firstChild)
      }
      grid.innerHTML = score
      clearInterval(upTimerId)
      clearInterval(downTimerId)
      clearInterval(leftTimerId)
      clearInterval(rightTimerId)
    }
  
  // call the whole program and run all the functions throught the start function
    function start() {
      if (!isGameOver) {
        createPlatforms()
        createDoodler()
        // set the platforms to move at ___ seconds
        setInterval(movePlatforms,30)
        jump(startPoint)
        document.addEventListener('keyup', control)
      } 
    }
    start()
  })