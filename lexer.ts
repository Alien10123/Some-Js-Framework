import inputReader from "./inputReader.js";
import { AttrStringToken, Token } from "./tokenTypes.js";

let { consume, peek, getCurrentPos, isEnd } = inputReader(`<test class="test" >`);
const numbersLetters = "1234567890abcdefghijklmnopqrstuvwxyz";

let history: Array<Token<any>> = [];
let openTags = false;

let main = () => {
    if (isEnd()) {
        return
    }
    if (peek(0) === "<" && numbersLetters.includes(peek(1))) {
        history.push({
            type: 'syntax',
            raw: "<",
            pos: {
                start: getCurrentPos(),
                end: getCurrentPos() + 1
            }
        })
        consume(1);
        tag();
    }
};

let tag = () => {
    let tagName = "";

    let currentLetter = consume(0);

    while (currentLetter !== " ") {
        tagName = tagName + currentLetter;
        currentLetter = consume(1);
    }

    history.push({
        pos: {
            start: getCurrentPos() - tagName.length,
            end: getCurrentPos()
        },
        raw: tagName,
        type: 'tag name'
    })

    attrubutes()
};

let attrubutes = () => {
    let firstLetter = consume(1)
    let name = ""
    let raw = ""
    let value = ""
    
    if (firstLetter === ">") {
        history.push({
            type: 'syntax',
            raw: ">",
            pos: {
                start: getCurrentPos(),
                end: getCurrentPos() + 1
            }
        })
        consume(1)
        openTags = true
        main()
        return
    } else if (numbersLetters.includes(firstLetter)) {
        while (firstLetter !== "=") {
            name = name + firstLetter
            raw = raw + firstLetter
            firstLetter = consume(1)
        }
    }

    console.log(firstLetter)

    raw = raw + "="

    let letter = consume(1)

    if (letter === `"`) {
        raw = raw + `"`
        letter = consume(1)

        while (letter !== `"`) {
            value = value + letter;
            letter = consume(1)
        }

        raw = raw + value + `"`;
    } else if (letter === "{") {
        
    }

    console.log(raw, name, value)

    console.log(peek(0))

    history.push({
        type: 'attr',
        raw,
        pos: {
            start: getCurrentPos() - raw.length,
            end: getCurrentPos()
        },
        extra: {
            name,
            value
        }
    } as Token<AttrStringToken>)
}
main();

console.log(history)
