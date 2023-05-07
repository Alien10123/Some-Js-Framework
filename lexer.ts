import inputReader from "./inputReader.js";
import { HTMLCommentToken, HTMLTagToken, Token } from "./tokenTypes.js";

let {
    consume: inputConsume,
    peek: inputPeek,
    getCurrentPos,
} = inputReader("<test <!-- fsdjf -->");
const numbersLetters = "1234567890abcdefghijklmnopqrstuvwxyz";

let history: Array<Token<any>> = [];
let openTags = false;

const tags: () => Token<HTMLTagToken> = () => {
    let allChacters: string[] = [];
    let currentTagChacter = inputConsume(0);
    while (currentTagChacter !== " ") {
        allChacters.push(currentTagChacter);
        currentTagChacter = inputConsume(1);
    }
    let tagName = allChacters.join("").substring(1);
	openTags = true
    return {
        raw: allChacters.join(""),
        pos: {
            start: getCurrentPos() - allChacters.length,
            end: getCurrentPos() - 1,
        },
        extra: { tagName },
    };
};

const comments: () => Token<HTMLCommentToken> = () => {
    let allChacters: string[] = [];
    let currentTagChacter = inputConsume();
    let commentEnd = false;
    while (commentEnd === false) {
        allChacters.push(currentTagChacter);
        if (currentTagChacter === ">") {
            if (
                allChacters[allChacters.length - 2] === "-" &&
                allChacters[allChacters.length - 3] === "-"
            ) {
                commentEnd = true;
            }
        }
        currentTagChacter = inputConsume(1);
    }
    let comment = allChacters.join("").substring(4).slice(0, -3);
    return {
        raw: allChacters.join(""),
        pos: {
            start: getCurrentPos() - allChacters.length,
            end: getCurrentPos() - 1,
        },
        extra: { comment },
    };
};

export const attrubutes = () => {
    let allChacters: string[] = [];
    let currentChacter = inputConsume();
	let name = ""

	while(currentChacter !== "=") {
		allChacters.push(currentChacter)
		currentChacter = inputConsume(1)
	}

	name = allChacters.join()
	allChacters.push("=")
	currentChacter = inputConsume(1)

	if (currentChacter === "\"") {
		
	}
};

export const peek = () => {
    let returnToken: Token<{}> | null = null;
    const firstLetter = inputConsume();
    console.log(firstLetter, inputPeek(1));

	if (openTags) {
		if (firstLetter !== "/" && inputPeek(1) !== ">") {
			attrubutes()
		} else {

		}
	} else if (firstLetter === "<") {
        if (numbersLetters.includes(inputPeek(1))) {
            returnToken = tags();
            history.push(returnToken);
        } else if (inputPeek(1) === "!") {
            returnToken = comments();
            history.push(returnToken);
        }
    } else {
    }
    inputConsume(1);
    return returnToken;
};

console.log(peek(), peek(), peek());
