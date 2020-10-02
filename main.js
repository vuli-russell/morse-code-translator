class MorseCodeTranslator {
    constructor(latinTextArea,morseTextArea){
        this.latinTextArea = latinTextArea;
        this.morseCodeArea = morseTextArea;
        this.latinTextArea.addEventListener('input',()=>{this.morseCodeArea.value = this.latinToMorse(this.latinTextArea.value)});
        this.morseCodeArea.addEventListener('input',()=>{this.latinTextArea.value = this.morseToLatin(this.morseCodeArea.value)});
        
        this.errorsInLatin = [];
        this.errorsinMorse = [];

        //create error text elements
        this.latinErrorTextElement = document.createElement('p');
        this.latinErrorTextElement.classList.add('.translator-container__error-text');
        this.latinTextArea.parentElement.append(this.latinErrorTextElement);

        this.morseErrorTextElement = document.createElement('p');
        this.morseErrorTextElement.classList.add('.translator-container__error-text');
        this.morseCodeArea.parentElement.append(this.morseErrorTextElement);
        

        this.morseEnglishDictionay = {
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
        };
    }

    latinToMorse(sentence){

        this.clearErrors();

        let words = sentence.split(' ');
        let morseWords = words.map(word => {
            let letters = word.split('');
            let morseLetters = letters.map(letter => {
                if (!this.morseEnglishDictionay[letter.toUpperCase()]){
                    this.errorsInLatin.push(`Character not represented in morse: ${letter}`);
                };
                return this.morseEnglishDictionay[letter.toUpperCase()]
            });

            this.errorsInLatin.forEach(error => {
                this.latinErrorTextElement.innerText += `${error}\n`
            })
            
            return morseLetters.join('   ');
        });
        return morseWords.join('       ');
    }

    morseToLatin(sentence){

        this.clearErrors();

        let words = sentence.split('       ');
        let latinWords = words.map(word => {
            let letters = word.split('   ');
            let latinLetters = letters.map(letter => Object.keys(this.morseEnglishDictionay).find(key => this.morseEnglishDictionay[key]===letter));
            return latinLetters.join('');
        });
        return latinWords.join(' ');
    }

    clearErrors(){
        this.errorsInLatin = [];
        this.errorsinMorse = [];
        this.latinErrorTextElement.innerText = '';
        this.morseErrorTextElement.innerText = '';
    }
}


latinText = document.getElementById('latin-chars');
morseCode = document.getElementById('morse-code');

let t = new MorseCodeTranslator(latinText,morseCode);






