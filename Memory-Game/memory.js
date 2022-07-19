let cards = document.querySelectorAll('.memory-card')

let flippedCard = false
let gameTable = false
let firstCard, secondCard
let cardsLeft = 20
let counter = 1 
let playerOneScore = 0
let playerTwoScore = 0
let playerOne = document.getElementById('player-score')
let playerTwo = document.getElementById('player-two-score')
playerOne.innerHTML = playerOneScore
playerTwo.innerHTML = playerTwoScore
let whosTurn = document.getElementById('turns')
document.getElementById("reset").addEventListener('click',restart)
 
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

// check if the cards match if not flip them back add points for matches get final score
function checkCardMatch() {
  
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework
  if(!isMatch){
    counter++
  } 

  isMatch ? disableCards() : unflipCards()

  if (counter % 2 === 1 && isMatch){
    cardsLeft -=2
    playerOneScore++
    playerOne.innerHTML = playerOneScore
  }else if (counter % 2 === 0 && isMatch){
    cardsLeft -=2
    playerTwoScore++ 
    playerTwo.innerHTML = playerTwoScore
  }
  
  if (cardsLeft === 0 && playerOneScore > playerTwoScore){
    whosTurn.innerHTML = "Home Team Won"
  }else if (cardsLeft === 0 && playerOneScore < playerTwoScore){
    whosTurn.innerHTML = "Away Team Won"
  }else if (cardsLeft === 0 && playerOneScore === playerTwoScore){
    whosTurn.innerHTML = "Game ended in a tie"
  }

}

// dont let them flip back if they match
function disableCards() {
  firstCard.removeEventListener('click', flipCards)
  secondCard.removeEventListener('click', flipCards)

  resetCards()
}

// flip cards back if they don't match and take turns for non matches
function unflipCards() {
  gameTable = true

  setTimeout(() => {
    firstCard.classList.remove('flip')
    secondCard.classList.remove('flip')

    resetCards()
  }, 1500)

  if (counter % 2 === 1 ){
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


// restart game 
function restart(){
  window.location.reload();
  return false;
}