function hideSelf() {
  let button = document.querySelector('.hide-self-button');
  button.addEventListener('click', (event) =>{
    event.target.setAttribute('hidden', true);
  }, {once : true})
}
