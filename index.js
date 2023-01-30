// read the dictionary file
import fs from 'fs';
import puppeteer from 'puppeteer';
const dictionary = fs.readFileSync('./dic.json', 'utf8');
import readline from 'readline';
var words = JSON.parse(dictionary);
// sort by biggest word first
words.sort((a, b) => b.length - a.length);
var allReadyUsed = [];

const settings = {
  "version": 2,
  "volume": 0.5,
  "muted": false,
  "chatFilter": [],
  "nickname": "Bot"
}


async function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

const findWords = (letters) => {
  const regex = new RegExp(`[${letters}]{2,}`);
  const word = words.find((word) => {
    return word.match(regex) && !allReadyUsed.includes(word);
  })
  allReadyUsed.push(word);
  return word;
}

// ask user for the link of the game jklm
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the link of the game: ', async (link) => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(link);
    // set jklmSettings local storage 
    await page.evaluate((settings) => {
      localStorage.setItem('jklmSettings', JSON.stringify(settings));
      window.location.reload();
    }, settings);
    await wait(10 * 1000);
    await page.waitForSelector('.join');
    await page.click('.join button');

  } catch (e) {
    console.log(e);
  }
});


///html/body/div[2]/div[2]/div[2]/div[2]/div
