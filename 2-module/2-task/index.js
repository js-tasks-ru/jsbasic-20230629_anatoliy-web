function isEmpty(obj) {
  for (let key in obj){
    if (typeof obj[key] !== 'undefined' || obj !== null) {
     return false;
   }
 }
  return true;
}

