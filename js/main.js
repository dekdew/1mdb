class Game {
  constructor(totalTime) {
    this.totalTime = totalTime
    this.timeRemaining = 0
    this.score = 0
    this.round = 0
    this.servers = Array.from(document.getElementsByClassName('server'))
    this.app = document.getElementById('app')
    this.color = 'white'
    this.scoreDisplay = document.getElementById('score')
    this.startBtn = document.getElementById('startBtn')
    this.s1 = document.getElementById('s1')
    this.s2 = document.getElementById('s2')
    this.s3 = document.getElementById('s3')
    this.s4 = document.getElementById('s4')
  }

  startGame() {
    let self = this
    this.score = 0
    this.round = 0
    this.color = 'white'
    this.scoreDisplay.innerHTML = this.score
    this.s1.className = ''
    this.s2.className = ''
    this.s3.className = ''
    this.s4.className = ''

    this.s1.classList.add('server')
    this.s2.classList.add('server')
    this.s3.classList.add('server')
    this.s4.classList.add('server')

    this.reset()

    this.startBtn.classList.remove('show')
    this.startBtn.classList.add('hide')
  }

  startCountdown() {
    return setInterval(() => {
      this.timeRemaining++
      this.app.style.boxShadow = `inset 0 0 ${this.timeRemaining}px ${this.color}`
      if (this.timeRemaining >= this.totalTime * 0.85)
        if (this.timeRemaining % 2 == 0)
          this.color = 'white'
      else
        this.color = 'red'
      if (this.timeRemaining >= this.totalTime)
        this.gameOver()
    }, 100)
  }

  gameOver() {
    this.startBtn.classList.add('show')
    this.startBtn.classList.remove('hide')

    this.app.style.boxShadow = `inset 0 0 200px red`

    clearInterval(this.countdown)

    this.servers.forEach(server => {
      server.childNodes[1].style.pointerEvents = 'none'
    })
  }

  victory() {
    clearInterval(this.countdown)
  }

  reset() {
    clearInterval(this.countdown)
    this.randomKey()

    this.s1.childNodes[1].setAttribute('src', '../img/server/server-nothing.svg')
    this.s2.childNodes[1].setAttribute('src', '../img/server/server-nothing.svg')
    this.s3.childNodes[1].setAttribute('src', '../img/server/server-nothing.svg')
    this.s4.childNodes[1].setAttribute('src', '../img/server/server-nothing.svg')

    this.s1.childNodes[1].style.pointerEvents = 'auto'
    this.s2.childNodes[1].style.pointerEvents = 'auto'
    this.s3.childNodes[1].style.pointerEvents = 'auto'
    this.s4.childNodes[1].style.pointerEvents = 'auto'

    this.s1.className = 'server'
    this.s2.className = 'server'
    this.s3.className = 'server'
    this.s4.className = 'server'

    if (this.round % 4 == 0) {
      this.s4.classList.add('server-bottom')
      this.s2.classList.add('server-top')
    } else if (this.round % 4 == 1) {
      this.s3.classList.add('server-bottom')
      this.s1.classList.add('server-top')
    } else if (this.round % 4 == 2) {
      this.s2.classList.add('server-bottom')
      this.s4.classList.add('server-top')
    } else if (this.round % 4 == 3) {
      this.s1.classList.add('server-bottom')
      this.s3.classList.add('server-top')
    }

    this.s1.classList.add(`s${ (((this.round+1)%4)+1)%5 }`)
    this.s2.classList.add(`s${ (((this.round+2)%4)+1)%5 }`)
    this.s3.classList.add(`s${ (((this.round+3)%4)+1)%5 }`)
    this.s4.classList.add(`s${ (((this.round+4)%4)+1)%5 }`)

    this.countdown = this.startCountdown()

    this.timeRemaining = 0

    this.round += 1
  }

  hackServer(server) {
    server.style.pointerEvents = 'none'
    if (server.id[1] == this.wrong) {
      server.childNodes[1].setAttribute('src', '../img/server/server-caught.svg')
      this.gameOver()
    } else if (server.id[1] == this.correct) {
      this.score += 1
      this.scoreDisplay.innerHTML = this.score
      server.childNodes[1].setAttribute('src', '../img/server/server-hacked.svg')

      setTimeout(() => {
        this.reset()
      }, 300);
    } else {
      server.childNodes[1].setAttribute('src', '../img/server/server-clicked.svg')
    }
  }

  randomKey() {
    let correct = Math.floor(Math.random() * (5 - 1) + 1)
    let wrong = Math.floor(Math.random() * (5 - 1) + 1)

    while (wrong == correct) {
      wrong = Math.floor(Math.random() * (5 - 1) + 1)
    }

    this.correct = correct
    this.wrong = wrong
  }
}

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function ready() {
  let game = new Game(200)
  let servers = Array.from(document.getElementsByClassName('server'))
  let button = document.getElementById('startBtn')

  button.addEventListener('click', () => {
    game.startGame()
  })

  servers.forEach(server => {
    server.addEventListener('click', function _listener() {
      game.hackServer(server)
    }, true)
  })
}