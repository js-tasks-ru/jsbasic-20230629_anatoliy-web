function toggleText() {
  let button = document.querySelector('.toggle-text-button'),
      text = document.getElementById('text');
  button.addEventListener('click', () => {
    text.toggleAttribute('hidden');
  })
}
