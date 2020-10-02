class MorseCodeTranslator {
    constructor(latinTextArea,morseTextArea){
        this.latinTextArea = latinTextArea;
        this.morseCodeArea = morseTextArea;
        this.latinTextArea.addEventListener('input',()=>{this.morseCodeArea.value = this.latinToMorse(this.latinTextArea.value)});
        this.morseCodeArea.addEventListener('input',()=>{this.latinTextArea.value = this.morseToLatin(this.morseCodeArea.value)});
        
        this.errorsInLatin = [];
        this.errorsInMorse = [];

        //create error text elements
        this.latinErrorTextElement = document.createElement('p');
        this.latinErrorTextElement.classList.add('translator-container__error-text');
        this.latinTextArea.parentElement.append(this.latinErrorTextElement);

        this.morseErrorTextElement = document.createElement('p');
        this.morseErrorTextElement.classList.add('translator-container__error-text');
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
            });
            
            return morseLetters.join('   ');
        });
        return morseWords.join('       ');
    }

    morseToLatin(sentence){

        this.clearErrors();

        //error regexs for, 2 spaces, 4-6space, 8 or more spaces, any character that isnt a . - or space
        let errorRegexs = [
        {regex: /(?:[.-][.-])/, message: 'Spacing incorrect - dots and dashes must be space separated'},
        {regex: /(?:[.-] {2}[.-])/, message: 'Spacing incorrect - 2 space gap detected'},
        {regex:/(?:[.-] {4,6}[.-])/, message: 'Spacing incorrect - 4 - 6 space gap detected'},
        {regex:/(?:[.-] {8,}[.-])/, message: 'Spacing incorrect - 8+ space gap detected'},
        {regex:/[^.\- ]/, message: 'Only . / and spaces are allowed'}];

        //test morse string against each regex and write errors
        errorRegexs.forEach(r => {
            if(r.regex.test(sentence)){
                this.errorsInMorse.push(r.message);
            }
        })

        
        let words = sentence.split('       ');
        let latinWords = words.map(word => {
            let letters = word.split('   ');
            let latinLetters = letters.map(letter => Object.keys(this.morseEnglishDictionay).find(key => this.morseEnglishDictionay[key]===letter));
            return latinLetters.join('');
        });

        this.errorsInMorse.forEach(error => {
            this.morseErrorTextElement.innerText += `${error}\n`
        });

        return latinWords.join(' ');
    }

    clearErrors(){
        this.errorsInLatin = [];
        this.errorsInMorse = [];
        this.latinErrorTextElement.innerText = '';
        this.morseErrorTextElement.innerText = '';
    }
}


latinText = document.getElementById('latin-chars');
morseCode = document.getElementById('morse-code');

let translator = new MorseCodeTranslator(latinText,morseCode);






