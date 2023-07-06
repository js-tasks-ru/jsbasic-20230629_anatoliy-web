function checkSpam(str) {
  let string = str.toLowerCase();
  let wordOne = '1xBet'.toLowerCase();
  let wordTwo = 'XXX'.toLowerCase();

  if (string.includes(wordOne) || string.includes(wordTwo)){
    return true;
  } else {
    return false;
  }
}
