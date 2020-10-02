const morseEnglishDictionay ={
    'A':'. -',
    'B':'- . . .',
    'C':'- . - .',	
    'D':'- . .',
    'E':'.',
    'F':'. . - .',	
    'G':'- - .',	
    'H':'. . . .',	
    'I':'. .',	
    'J':'. - - -',	
    'K':'- . -',	
    'L':'. - . .',
    'M':'- -',

    'N':'- .',
    'O':'- - -',
    'P':'. - - .',
    'Q':'- - . -',
    'R':'. - .',
    'S':'. . .',
    'T':'-',
    'U':'. . -',
    'V':'. . . -',
    'W':'. - -',
    'X':'- . . -',
    'Y':'- . - -',
    'Z':'- - . .',

    'Ä':'. - . -',
    'Á':'. - - . -',
    'Å':'. - - . -',
    'É':'. . - . .',
    'Ñ':'- - . - -',
    'Ö':'- - - .',
    'Ü':'. . - -',

    '0':'- - - - -',	
    '1':'. - - - -',	
    '2':'. . - - -',	
    '3':'. . . - -',	
    '4':'. . . . -',	
    '5':'. . . . .',	
    '6':'- . . . .',	
    '7':'- - . . .',	
    '8':'- - - . .',	
    '9':'- - - - .',

    '.':'. - . - . -',
    ',':'- - . . - -',
    ':':'- - - . . .',
    '?':'. . - - . .',
    '\'':'. - - - - .',
    '-':'- . . . . -',
    '\/':'- . . - .',
    '\(':'- . - - . -',
    '\)':'- . - - .',
    "\"":'. - . . - .',
    '@':'. - - . - .',
    '=':'- . . . -',

    '':''
}



const latinToMorse = sentence => {
    let words = sentence.split(' ');
    let morseWords = words.map(word => {
        let letters = word.split('');
        let morseLetters = letters.map(letter => morseEnglishDictionay[letter.toUpperCase()]);
        return morseLetters.join('   ');
    });
    return morseWords.join('       ');
};

const morseToLatin = sentence => {
    let words = sentence.split('       ');
    let latinWords = words.map(word => {
        let letters = word.split('   ');
        let latinLetters = letters.map(letter => Object.keys(morseEnglishDictionay).find(key => morseEnglishDictionay[key]===letter));
        return latinLetters.join('');
    });
    return latinWords.join(' ');

}

latinText = document.getElementById('latin-chars');
morseCode = document.getElementById('morse-code');


latinText.addEventListener('input',()=>{morseCode.value = latinToMorse(latinText.value)});
morseCode.addEventListener('input',()=>{latinText.value = morseToLatin(morseCode.value)});



