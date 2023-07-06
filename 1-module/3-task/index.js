function ucFirst(str) {
  let ucLetter;
  if(str === ''){
    ucLetter = '';
    return ucLetter;
  } else {
    ucLetter = str[0].toUpperCase();
    return ucLetter + str.slice(1);
  }
}

ucFirst('')
