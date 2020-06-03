'use strict';

var NAMES = [
  'Иван',
  'Хуан',
  'Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

// Amount of similar characters
var CHARACTER_AMOUNT = 4;

// Get random index from any array
var getRandomIndex = function (array) {
  return Math.floor(Math.random() * array.length);
};

// Generate random name
var generateName = function (names, surnames) {
  // Generate numbers from 0 to 1
  var swap = Math.floor(Math.random() * 2);
  // Get random name
  var randomName = names[getRandomIndex(names)];
  // Get random surname
  var randomSurname = surnames[getRandomIndex(surnames)];

  // Random swap name for surname
  if (swap) {
    return randomName + ' ' + randomSurname;
  } else {
    return randomSurname + ' ' + randomName;
  }
};

// Generate array of objects with random characters data
var generateCharData = function (number) {
  // Define empty array
  var characters = [];

  for (var i = 0; i < number; i++) {
    characters.push({
      name: generateName(NAMES, SURNAMES),
      coatColor: COAT_COLORS[getRandomIndex(COAT_COLORS)],
      eyesColor: EYES_COLORS[getRandomIndex(EYES_COLORS)]
    });
  }

  return characters;
};

// Create wizard like an HTML block
var generateWizardBlock = function (template, wizardData) {
  // Clone template
  var wizardBlock = template.cloneNode(true);
  // Find name, coat color, eyes color elements into template
  var name = wizardBlock.querySelector('.setup-similar-label');
  var coatColor = wizardBlock.querySelector('.wizard-coat');
  var eyesColor = wizardBlock.querySelector('.wizard-eyes');

  // Set characteristics
  name.textContent = wizardData.name;
  coatColor.style.fill = wizardData.coatColor;
  eyesColor.style.fill = wizardData.eyesColor;

  return wizardBlock;
};

// Fill list of wizards
var fillList = function (fragment, dataArray, template, charList) {

  // Iterate throw data array and create wizard HTML blocks
  for (var i = 0; i < dataArray.length; i++) {
    var wizardBlock = generateWizardBlock(template, dataArray[i]);
    // Append wizard HTML block to fragment
    fragment.appendChild(wizardBlock);
  }
  // Append fragment to list of wizards
  charList.appendChild(wizardFragment);
};

// Main popup window
var userDialog = document.querySelector('.setup');
// Similar character container
var charListContainer = document.querySelector('.setup-similar');
// Similar character list
var charList = document.querySelector('.setup-similar-list');
// Wizard template
var template = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');


// Show characters main popup window
userDialog.classList.remove('hidden');
// Create array of wizards data
var wizardDataArray = generateCharData(CHARACTER_AMOUNT);
// Create empty fragment
var wizardFragment = document.createDocumentFragment();

// Fill list of wizards
fillList(wizardFragment, wizardDataArray, template, charList);

// Show list of wizards
charListContainer.classList.remove('hidden');
