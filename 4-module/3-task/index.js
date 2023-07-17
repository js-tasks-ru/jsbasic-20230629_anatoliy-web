function highlight(table) {
  const rows = table.rows
  for(let i = 0; i < rows.length; i++){
    if(rows[i].cells[3].dataset.available == 'true'){
      rows[i].classList.add('available')
    } else{
      rows[i].classList.add('unavailable')
    }
    if(!rows[i].cells[3].hasAttribute('data-available')){
      rows[i].setAttribute('hidden', true)
    }
    if(rows[i].cells[2].innerText == 'm'){
      rows[i].classList.add('male')
    }
    if(rows[i].cells[2].innerText == 'f'){
      rows[i].classList.add('female')
    }
    if(Number(rows[i].cells[1].innerText) < 18){
      rows[i].style.textDecoration = 'line-through'
    }
  }
}
