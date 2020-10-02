const morseEnglishDictionay ={
    'A':'• −',
    'B':'− • • •',
    'C':'− • − •',	
    'D':'− • •',
    'E':'•',
    'F':'• • − •',	
    'G':'− − •',	
    'H':'• • • •',	
    'I':'• •',	
    'J':'• − − −',	
    'K':'− • −',	
    'L':'• − • •',
    'M':'− −',

    'N':'− •',
    'O':'− − −',
    'P':'• − − •',
    'Q':'− − • −',
    'R':'• − •',
    'S':'• • •',
    'T':'−',
    'U':'• • −',
    'V':'• • • −',
    'W':'• − −',
    'X':'− • • −',
    'Y':'− • − −',
    'Z':'− − • •',

    'Ä':'• − • −',
    'Á':'• − − • −',
    'Å':'• − − • −',
    'É':'• • − • •',
    'Ñ':'− − • − −',
    'Ö':'− − − •',
    'Ü':'• • − −',

    '0':'− − − − −',	
    '1':'• − − − −',	
    '2':'• • − − −',	
    '3':'• • • − −',	
    '4':'• • • • −',	
    '5':'• • • • •',	
    '6':'− • • • •',	
    '7':'− − • • •',	
    '8':'− − − • •',	
    '9':'− − − − •',

    '.':'• − • − • −',
    ',':'− − • • − −',
    ':':'− − − • • •',
    '?':'• • − − • •',
    '\'':'• − − − − •',
    '-':'− • • • • −',
    '\/':'− • • − •',
    '\(':'− • − − • −',
    '\)':'− • − − •',
    "\"":'• − • • − •',
    '@':'• − − • − •',
    '=':'− • • • −',

    '':''
}


const characterToMorse = char => morseEnglishDictionay[char.toUpperCase()];


const wordToMorse = word => {
    let letters = word.split('');
    let morseLetters = letters.map(letter => characterToMorse(letter))
    return morseLetters.join('   ');
};

const sentenceToMorse = sentence => {
    let words = sentence.split(' ');
    let morseWords = words.map(word => wordToMorse(word))
    return morseWords.join('       ');
};

latinText = document.getElementById('latin-chars');
morseCode = document.getElementById('morse-code');

document.querySelector('button').addEventListener('click',()=>{
    morseCode.value = sentenceToMorse(latinText.value);
})


