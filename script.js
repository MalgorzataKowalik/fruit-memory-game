let fruits = ['Apple', 'Apple', 'Avocado', 'Avocado', 'Grapes', 'Grapes', 'Lemon', 'Lemon', 'Mango', 'Mango', 'Orange', 'Orange', 'Pineapple', 'Pineapple', 'Strawberries', 'Strawberries', 'Watermelon', 'Watermelon']
let cards = [...document.querySelectorAll('div.wrap>div')];
const activeCards = [];
const numberOfPairs = fruits.length / 2;
let guessedPairs = 0;
const popup = document.querySelector('.popup');
const xButton = document.querySelector('div.x');
const againButton = document.querySelector('.again');
const header = document.querySelector('header');



function drawFruits () {
    cards.forEach(card => {
        const index = Math.floor(Math.random() * fruits.length);
        card.innerHTML = `<img src="imgs/${fruits[index]}.png" alt="${fruits[index]}"></img>`;
        fruits.splice(index, 1)
    })
}
drawFruits()

function showFruit () {

    header.classList.add('gameStarted');

    this.classList.remove('hidden');

    if (this == activeCards[0]) return; //makes it impossible to select the same item again

    //actions for the first item:
    if (activeCards.length == 0) {
        activeCards[0] = this;
        return
    }

    //actions for the second item:
    else {
        activeCards[1] = this;
        cards.forEach((card) => card.removeEventListener('click', showFruit))

    }
    
    setTimeout(() => {
        if (activeCards[0].innerHTML == activeCards[1].innerHTML) {
            activeCards.forEach(card => card.classList.add('guessed'))
            guessedPairs++;

            cards = cards.filter(card => !card.classList.contains('guessed'))  //removes guessed elements from squares array

            if (guessedPairs == numberOfPairs) {
                popup.classList.add('active');
                againButton.addEventListener('click', () => location.reload());
                xButton.addEventListener('click', () => {
                    popup.classList.remove('active');
                })
                
            }
            else {
                cards.forEach((card) => card.addEventListener('click', showFruit))
            }
        }
        else {
            activeCards.forEach(card => card.classList.add('hidden'))
            cards.forEach((card) => card.addEventListener('click', showFruit))
        }
        activeCards.length = 0;
        
    }, 500);

}

cards.forEach((card) => card.addEventListener('click', showFruit))