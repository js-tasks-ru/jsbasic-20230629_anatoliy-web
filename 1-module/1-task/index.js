function factorial(n) {
  let result = 1;
  if (n === 0 || n === 1){
    return 1
  }
  for (let i = 1; i < n+1; i++){
    result =  result * i;
  }
  return result;
}


