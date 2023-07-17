function makeFriendsList(friends) {
  const ul = document.createElement('ul');
  const items = friends
          .map(item => `<li>${item.firstName} ${item.lastName}</li>`)
          .join(' ')
  ul.innerHTML = items
  return ul;
}

