function sumSalary(salaries) {
  let sum = 0;
  for (let key in salaries) {
    let valueNumber = salaries[key];
    if (Number.isFinite(valueNumber)){
      sum += valueNumber;
    }
  }
  return sum;
}

