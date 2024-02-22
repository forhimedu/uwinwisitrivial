const listOfWords = [
  
    ["FeS\u2082", "пирит, темір колчеданы"],
    ["CaCO\u2083*MgCO\u2083", "доломит"],
    ["NaCl", "галит/тас тұзы"],
    ["NaHCO\u2083", "ас содасы"],
    ["CaSO\u2084*2H\u2082O", "гипс"],
    ["FeCO\u2083", "сидерит"],
    ["CuCO\u2083*Cu(OH)\u2082", "малахит"],
    ["FeSO\u2084*7H\u2082O", "темір купоросы"],
    ["PbS", "галенит"],
    ["KOH","күйдіргіш калий"],
    ["Al\u2084C\u2083","алюминий карбиді"],
    ["MgCO\u2083", "магнезит"],
    ["Ca(OH)\u2082 (сұй)", "әк суы"],
    ["K\u2082CO\u2083", "поташ/сақар"],
    ["MgCl\u2082*6H\u2082O","бишофит"],
    ["SiC", "карборунд"],
    ["HgS", "киноварь"],
    ["Na\u2082SO\u2084*10H\u2082O", "глаубер тұзы, мирабилит"],
    ["Ca(OH)\u2082", "сөндірілген әк"],
    ["CuSO\u2084*5H\u2082O", "мыс купоросы/көк-мыс тотияйын"],
    ["NH\u2084OH/NH\u2083*H\u2082O","мүсәтір спирті"],
    ["KCl", "сильвин"],
    ["Na\u2082CO\u2083", "сода/кальциленген сода"],
    ["ZnS", "сфалерит"],
    ["KCl*MgCl\u2082*6H\u2082O", "карналлит"]
    ["CaO", "сөндірілмеген әк"],
    ["CaCO\u2083", "әктас,мәрмәр,бор,кальцит,ізбес тасы"],
    ["SiO\u2082","кварц, кремнезем"],
    ["CO", "тұншықтырғыш газ/иіс газ"],
    ["PH\u2083", "фосфин"],
    ["NH\u2083", "аммиак"],
    ["Ca\u2083(PO\u2084)\u2082", "фосфорит"],
    ["HCN","көгерткіш қышқыл/циансутек қышқылы"],
    ["NaNO\u2083","чили селитрасы"],
    ["KNO\u2083","үнді селитрасы"],
    ["MgSO\u2084*7H\u2082O","ағылшын тұзы"],
    ["Al\u2082O\u2083","глинозем/корунд/боксит"],
    ["HCl*3HNO\u2083", "патша сұйықтығы"],
    ["H\u2082SO\u2084*SO\u2083", "олеум"],
    ["BaSO\u2084", "барит"],
    ["Ca(OH)\u2082 (конц)", "әк сүті"],
    ["NaOH","күйдіргіш натрий"],
    ["Na\u2082CO\u2083*10H\u2082O", "кристалды сода"],
    ["Fe\u2083O\u2084","темір қағы"],
    ["CaC\u2082","кальций карбиді"],
    ["N\u2082O","шаттандырғыш газ"],
    ["KCl*NaCl", "сильвинит"],
    ["MgO", "күйдірілген магнезия"],
    ["H\u2082O\u2082","сутек пероксиді"],
   

   
];

function getRandomArrays(arr, numArrays) {
    // Shuffle the input array to randomize the selection
    const shuffled = arr.sort(() => 0.5 - Math.random());
    // Get sub-array of first numArrays elements after shuffling
    const selectedArrays = shuffled.slice(0, numArrays);
    return selectedArrays;
}






let words = [];
let definitions = [];
let score = 0;
let isPlaying = false;
let matchedWords = [];



// Create a map of Spanish words to English definitions


function startGame() {
  let reviewContainer = document.getElementById('review-container');
  reviewContainer.innerHTML = "";
  reviewContainer.style.display = "none";
  const wordsData = getRandomArrays(listOfWords, 10);
  matchedWords = [...wordsData];
  if (isPlaying) return; // Prevent starting a new game while one is already in progress
  const wordMap = new Map(wordsData);


  isPlaying = true;
  score = 0;
  document.getElementById('score').textContent = score;
  document.getElementById('play-again-button').disabled = true;
  document.getElementById('message-container').textContent = "";

  // Shuffle the words data
  wordsData.sort(() => Math.random() - 0.5);

  // Select 10 random words (Spanish) and definitions (English)
  words = wordsData.slice(0, 10).map(word => word[0]);
  definitions = wordsData.slice(0, 10).map(word => word[1]);

  // Shuffle the definitions (English)
  definitions.sort(() => Math.random() - 0.5);

  // Display words and definitions
  const wordsContainer = document.getElementById('words-container');
  const definitionsContainer = document.getElementById('definitions-container');

  wordsContainer.innerHTML = "";
  definitionsContainer.innerHTML = "";

  words.forEach((word, index) => {
    const wordElement = document.createElement('span');
    wordElement.textContent = word;
    wordElement.setAttribute('draggable', true);
    wordElement.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text', word); // Use the Spanish word itself
    });
    wordsContainer.appendChild(wordElement);
  });

  definitions.forEach((definition, index) => {
    const definitionElement = document.createElement('span');
    definitionElement.textContent = definition;
    definitionElement.addEventListener('dragover', (event) => {
      event.preventDefault(); // Allow dropping
    });
    definitionElement.addEventListener('drop', (event) => {
      const draggedWord = event.dataTransfer.getData('text'); // Get the dragged Spanish word

      // Find the index of the matching word in the words array
      const wordIndex = words.findIndex(word => wordMap.get(word) === definition);

      // Check if the dragged word matches the definition and wordIndex was found
      if (wordIndex !== -1 && wordMap.get(draggedWord) === definition) {
        score++;
        document.getElementById('score').textContent = score;
        // Ensure the word element exists before removing
        const wordElementToRemove = wordsContainer.children[wordIndex];
        if (wordElementToRemove) {
          wordsContainer.removeChild(wordElementToRemove);
        } else {
          console.warn("Word element already removed or invalid index.");
        }

        // Remove the matching definition element from the definitions container
        definitionsContainer.removeChild(definitionElement);

        definitionElement.style.backgroundColor = 'green'; // This line might not be needed anymore

        // Update the wordMap to reflect the removed word
        wordMap.delete(draggedWord);

        // Update the words array (optional)
        words.splice(wordIndex, 1); // Remove the matched word from the array

        if (wordsContainer.children.length === 0) {
          gameOver();
        }
      } else {
        definitionElement.style.backgroundColor = '#ff1d58';
        score--;
        document.getElementById('score').textContent = score;
      }
    });
    definitionsContainer.appendChild(definitionElement);
  });
}
// function gameOver() {
//   isPlaying = false;
//   document.getElementById('play-again-button').disabled = false;
//   document.getElementById('message-container').textContent = `Songy upay ${score}.`;
// }


function gameOver() {
  isPlaying = false;
  // Use the existing #review-container element if already created
  let reviewContainer = document.getElementById('review-container');
  if (!reviewContainer) {
    reviewContainer = document.createElement('div');
    reviewContainer.id = 'review-container';
    document.body.appendChild(reviewContainer);
  }
  console.log(matchedWords);
  // Clear existing review elements before adding new ones
  reviewContainer.innerHTML = "";
  // matchedWords.forEach((word, index) => {
  //   const reviewElement = document.createElement('div');
  //   reviewElement.textContent = word + " - " + definitions[index]; // Use definitions array
  //   reviewContainer.appendChild(reviewElement);
  // });


  matchedWords.forEach(pair => {
    const wordPairDiv = document.createElement('div');
    wordPairDiv.classList.add('word-pair'); // Add a class for styling
  
    // Create span elements for each word
    const formulas = document.createElement('div');
    formulas.textContent = pair[0];
    formulas.classList.add('formula-word'); // Add a class for styling
  
    const names = document.createElement('div');
    names.textContent = pair[1];
    names.classList.add('name-word'); // Add a class for styling
  
    // Append spans to the div in desired order
    wordPairDiv.appendChild(names);
    wordPairDiv.appendChild(formulas);
  
    // Append the word pair div to the container
    reviewContainer.appendChild(wordPairDiv);
  });

  // Show the review container (make sure it's visible)
  reviewContainer.style.display = 'flex'; // Assuming it's hidden initially

  // Use the existing play-again-button instead of creating a new one
  const restartButton = document.getElementById('play-again-button');
  restartButton.disabled = false; // Enable the button
  matchedWords = [];
  // Optionally, set different text for the button:
  // restartButton.textContent = 'Review & Restart';
  
}


// Event listener for play again button
document.getElementById('play-again-button').addEventListener('click', startGame);

// Start the game on page load
startGame();
