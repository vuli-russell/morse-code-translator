import MorseCodeTranslator from "./MorseCodeTranslator";
import morseEnglishDictionary from "../data/data";


//valid inputs
it ("Should translate a to . -", () => {
    const translator = new MorseCodeTranslator(morseEnglishDictionary);
    expect(translator.latinToMorse("A").text).toBe(". -")
})

it("Should translate . - to a", () => {
    const translator = new MorseCodeTranslator(morseEnglishDictionary);
    expect(translator.morseToLatin(". -").text).toBe("A")
})

it("Should translate latin sentence to morse", () => {
    const translator = new MorseCodeTranslator(morseEnglishDictionary);
    expect(translator.latinToMorse("AYY LMAO").text).toBe(". -   - . - -   - . - -       . - . .   - -   . -   - - -")
})

it("Should morse sentence to latin", () => {
    const translator = new MorseCodeTranslator(morseEnglishDictionary);
    expect(translator.morseToLatin(". -   - . - -   - . - -       . - . .   - -   . -   - - -").text).toBe("AYY LMAO")
})

//invalid inputs
it("Should return with an error if an invalid character is in the latin text", () => {
    const translator = new MorseCodeTranslator(morseEnglishDictionary);
    expect(translator.latinToMorse("$").errors).toBe("Character not represented in morse: $")
    expect(translator.latinToMorse("%").errors).toBe("Character not represented in morse: %")
    expect(translator.latinToMorse("$$").errors).toBe("Character not represented in morse: $\nCharacter not represented in morse: $")
})

it("Should return with an error if an invalid character or characters is in the morse code", () => {
    const translator = new MorseCodeTranslator(morseEnglishDictionary);
    expect(translator.morseToLatin(".-").errors).toBe("Spacing incorrect - dots and dashes must be space separated")
    expect(translator.morseToLatin(".  -").errors).toBe("Spacing incorrect - 2 space gap detected")
    expect(translator.morseToLatin(".     -").errors).toBe("Spacing incorrect - 4 - 6 space gap detected")
    expect(translator.morseToLatin(".          -").errors).toBe("Spacing incorrect - 8+ space gap detected")
    expect(translator.morseToLatin("ayy lmao").errors).toBe("Only . / and spaces are allowed")

})

//Null/No Inputs
it("Should return empty string when input is empty string", () => {
    const translator = new MorseCodeTranslator(morseEnglishDictionary);
    expect(translator.morseToLatin("").text).toBe("")
})