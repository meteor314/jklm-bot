// read the dictionary file
import fs from 'fs';
import ncp from 'copy-paste';
const dictionary = fs.readFileSync('./dic.json', 'utf8');
import readline from 'readline';
var words = JSON.parse(dictionary);
var allReadyUsed = [];
words.sort((a, b) => {
  return b.length - a.length;
}).filter((word) => {
  return !word.includes('-');
});
const findWords = (letters) => {
  for (let i = 0; i < words.length; i++) {
    if (words[i].includes(letters) && !allReadyUsed.includes(words[i])) {
      allReadyUsed.push(words[i]);
      return words[i];
    }
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = () => {
  rl.question('Enter a word (or "q" to quit): ', (answer) => {
    if (answer === 'q') {
      return process.exit(0);
    }
    console.log('letters', answer);
    var newWord = findWords(answer);
    console.log("The word is", newWord);
    // copy to clipboard
    ncp.copy(newWord, () => {
    });
    ask();
  });
};
ask();


