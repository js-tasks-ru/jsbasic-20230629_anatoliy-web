import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    let currentScroll = document.documentElement.scrollTop,
        containerWidth = document.querySelector('.container').offsetWidth,
        // windowWidth = document.documentElement.clientWidth,
        windowWidth = window.innerWidth,
        iconWidth = document.querySelector('.cart-icon').offsetWidth,
        left = ((windowWidth - containerWidth) / 2) + containerWidth;

    if(windowWidth > 767){
      if(this.elem.offsetWidth && this.elem.offsetHeight){
        this.elem.style.zIndex = '1000'
        // console.log('currentScroll', currentScroll);
        // console.log('containerWidth', containerWidth);
        // console.log('windowWidth', windowWidth);
        // console.log('left', left);
        // console.log('iconWidth', iconWidth);
        if(currentScroll === 0){
          this.elem.style.position = 'absolute'
        }
        if(this.elem.getBoundingClientRect().y <= 0){
          this.elem.style.position = 'fixed'
          this.elem.style.left = left + 20 + 'px'
        }
        if(windowWidth < (left + iconWidth + 30)) {
          this.elem.style.left = 'auto'
          this.elem.style.right = '10px'

        }

      }

    }
  }
}
