import inputReader from "./inputReader.js";
import { HTMLCommentToken, HTMLTagToken, Token } from "./tokenTypes.js";

let {
    consume: inputConsume,
    peek: inputPeek,
    getCurrentPos,
} = inputReader("<test >");
const numbersLetters = "1234567890abcdefghijklmnopqrstuvwxyz";

let history: Array<Token<any>> = [];
let openTags = false;

