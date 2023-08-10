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
        windowWidth = window.innerWidth,
        iconWidth = document.querySelector('.cart-icon').offsetWidth,
        left = ((windowWidth - containerWidth) / 2) + containerWidth,
        part = (windowWidth - containerWidth) / 2;
    if(this.elem.offsetWidth && this.elem.offsetHeight){
      this.elem.style.zIndex = '1000'
      this.elem.style.left = left + 20 + 'px'
      if(windowWidth >= 767){
        this.elem.style.top = '50px'
      } else {
        this.elem.style.top = '15px'
      }
      if(currentScroll < 50){
        this.elem.style.left = 'auto'
        if(windowWidth >= 767){
          this.elem.style.position = 'absolute'
        } else {
          this.elem.style.position = 'fixed'
        }
      }else {
        this.elem.style.position = 'fixed'
      }
      if(part < (iconWidth + 30)) {
        this.elem.style.left = 'auto'
        this.elem.style.right = '10px'
      }
    }



  }
}
