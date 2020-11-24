import morseEnglishDictionary from "./assets/data/data.js";
import MorseCodeTranslator from "./assets/scripts/MorseCodeTranslator.js"

let translator = new MorseCodeTranslator(morseEnglishDictionary);

const latinTextArea = document.getElementById('latin-chars');
const latinErrorElement = document.getElementById('latin-errors')
const morseTextArea = document.getElementById('morse-code');
const morseErrorElement = document.getElementById('morse-errors')

latinTextArea.addEventListener('input',()=>{
    const translation = translator.latinToMorse(latinTextArea.value);
    morseTextArea.value = translation.text;
    latinErrorElement.innerText = translation.errors;
});

morseTextArea.addEventListener('input',()=>{
    const translation = translator.morseToLatin(morseTextArea.value);
    latinTextArea.value = translation.text;
    morseErrorElement.innerText = translation.errors;
});
