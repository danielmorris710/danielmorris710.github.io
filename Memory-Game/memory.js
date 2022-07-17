let cards = document.querySelectorAll('.memory-card')

let flippedCard = false
let gameTable = false
let firstCard, secondCard
let counter = 1 
let playerOneScore = 0
let playerTwoScore = 0
let playerOne = document.getElementById('player-score')
let playerTwo = document.getElementById('player-two-score')
playerOne.innerHTML = playerOneScore
playerTwo.innerHTML = playerTwoScore
let whosTurn = document.getElementById('turns')
 
whosTurn.innerHTML = "Home Team's Turn"


// flip card function
function flipCards() {
  if (gameTable) return
  if (this === firstCard) return

  this.classList.toggle('flip')

  if (!flippedCard) {
    flippedCard = true
    firstCard = this

    return
  }
  
  flippedCard = false
  secondCard = this
  checkCardMatch()
}

// check if the cards match if not flip them back 
function checkCardMatch() {
  
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework
  if(!isMatch){
    counter++
  } 

  isMatch ? disableCards() : unflipCards()

  if(counter % 2 === 1 && isMatch){
    playerOneScore++
    playerOne.innerHTML = playerOneScore
  }else if (counter % 2 === 0 && isMatch){
    playerTwoScore++ 
    playerTwo.innerHTML = playerTwoScore
  }
  
}

// dont let them flip back if they match
function disableCards() {
  firstCard.removeEventListener('click', flipCards)
  secondCard.removeEventListener('click', flipCards)

  resetCards()
}

// flip cards back if they don't match
function unflipCards() {
  gameTable = true

  setTimeout(() => {
    firstCard.classList.remove('flip')
    secondCard.classList.remove('flip')

    resetCards()
  }, 1500)

  if(counter % 2 === 1 ){
    whosTurn.innerHTML = "Home Team's Turn "

  }else if (counter % 2 === 0){
    whosTurn.innerHTML = "Away Team's Turn "
  }
}

// random shuffling cards
(function shuffle() {
  cards.forEach(card => {
    let arrangeCards = Math.floor(Math.random() * 20)
    card.style.order = arrangeCards
  })
})()

// able to flip cards again after non match
function resetCards() {
  [flippedCard, gameTable] = [false, false]
  [firstCard, secondCard] = [null, null]
}

cards.forEach(card => card.addEventListener('click', flipCards))

// make two players take turns 
function takeTurns(){
  let counter = 0 
  let playerOneScore = 0
  let playerTwoScore = 0
  if(counter % 2 === 1){

  }
}

