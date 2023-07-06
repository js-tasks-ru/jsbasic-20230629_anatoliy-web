function checkSpam(str) {
  let string = str.toLowerCase();
  let wordOne = '1xBet'.toLowerCase();
  let wordTwo = 'XXX'.toLowerCase();

  return string.includes(wordOne) || string.includes(wordTwo)

}
