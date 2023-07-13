function getMinMax(str) {
  let result = {},
      arr = str
            .split(' ')
            .map(item => Number(item))
            .filter(item => !isNaN(item))

  let min = Math.min( ...arr ),
      max = Math.max( ...arr );
  result = {
    min: min,
    max: max
  }
  return result;
}



