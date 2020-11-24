class MorseCodeTranslator {
    constructor(morseEnglishDictionay){
        this.errorsInLatin = [];
        this.errorsInMorse = [];
        this.morseEnglishDictionay = morseEnglishDictionay;
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
                return this.morseEnglishDictionay[letter.toUpperCase()];
            });
    
            return morseLetters.join('   ');
        });
        return {text: morseWords.join('       '), errors : this.errorsInLatin.join("\n")};
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

        return {text: latinWords.join(' '), errors : this.errorsInMorse.join("\n")};
    }

    clearErrors(){
        this.errorsInLatin = [];
        this.errorsInMorse = [];
    }
}

export default MorseCodeTranslator
