const els = {
    score: null,
    answer: null,
    choices: null
};

// const words = [
//     'JAVASCRIPT', // words[0]
//     'STYLESHEET', // words[1]
//     'LANGUAGE' // words[2]
// ];
let choices = [];
let word = '';
let wordMapping = [];
let choicesMapping = [];
let scoreCount = 0;
let maxScore = 8;


const init = () => {
    // console.log('>> #init');

    // Attacher des éléments
    els.score = document.querySelector('#score');
    els.answer = document.querySelector('#answer');
    els.choices = document.querySelector('#choices');

    // Choisissez un mot
    word = pickWord();
    // console.log('word', word);
    //  - créer un mappage de mots
    wordMapping = getWordMapping(word);
    console.log('wordMapping', wordMapping);
    // Generate choices
    choices = generateChoices();
    // console.log(choices);
    //  - créer une cartographie des choix
    choicesMapping = getChoicesMapping(choices);
    // console.log(choicesMapping);
    // Mot d'affichage
    displayWord(wordMapping);
    // Choix d'affichage
    displayChoices(choicesMapping);
    //// Afficher la note
    // displayScore();
    // Écouter les événements
    // - événements souris
    
    els.choices.addEventListener('click', ({ target }) => {
        // evt:MouseEvent evt.target => { target }
        if (target.matches('li')) {
            checkLetter(target.innerHTML);
        } 
    });
    //    - keyboard events
    document.addEventListener('keydown', ({ keyCode }) => {
        // evt:KeyboardEvent evt.keyCode => { keyCode }
        // console.log('keyCode', keyCode);
        const letter = String.fromCharCode(keyCode);
        // console.log('letter', letter);
        if (keyCode >= 65 && keyCode <= 90) {
            checkLetter(letter);
        }
    });


};
    // lettre de contrôle
    // - sinon dans word : ajouter le score
    // - si dans le mot : afficher la lettre
    //  - fin du jeu
    // - si score == max : loseGame
    // - si les lettres sont visibles : winGame

    
const checkLetter = (letter) => {
    console.log(letter);
    let isLetterInWord = false;
    let isAllLettersFound = true;
    // console.log('isLetterWord before loop', isLetterInWord);
    wordMapping.forEach((letterMapping) => {
        // console.log('letterMapping.letter', letterMapping.letter);
        if (letterMapping.letter === letter) {
            letterMapping.isVisible = true;
            isLetterInWord = true;
        }
        if (!letterMapping.isVisible) {
            isAllLettersFound = false;
        }
    });
    choicesMapping.forEach((letterMapping) => {
        if (letterMapping.letter === letter) {
            letterMapping.isChosen = true;
        }
    });
    displayChoices(choicesMapping);
    if (isLetterInWord === true) {
        displayWord(wordMapping);
    } else {
        scoreCount++;
        displayScore();
    }

    if (scoreCount === maxScore) {
        endGame();
    }
    if (isAllLettersFound) {
        winGame();
    }
    // console.log('isLetterWord after loop', isLetterInWord);
};

const endGame = () => {
    wordMapping.forEach(w => w.isVisible = true);
    displayWord(wordMapping);
    document.querySelector('body').style.backgroundColor = 'red';
    els.choices.innerHTML = `<h1>You dead, bro!</h1>`;
};
const winGame = () => {
    els.choices.innerHTML = `<h1>You live!</h1>`;
}


window.addEventListener('load', () => {
    init();
});
//Identique au #1
// window.onload = init;
// Identique au #2
// window.addEventListener('load', init);
// Identique au #3
// window.onload = () => {
// init();
// };

/**
 * Renvoie un entier aléatoire compris entre min (inclus) et max (inclus).
 * La valeur n'est pas inférieure à min (ou le prochain entier supérieur à min
 * si min n'est pas un entier) et pas plus grand que max (ou l'entier suivant
 * inférieur à max si max n'est pas un entier).
 * L'utilisation de Math.round() vous donnera une distribution non uniforme !
 */
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};