import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.#render()
  }

  #template() {
    return `<div class="ribbon">
    <!--Кнопка прокрутки влево-->
    <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>

    <!--Ссылки на категории-->
    <nav class="ribbon__inner">
     ${
      this.categories.map((category) => {
        return `
              <a href="#" class="ribbon__item" data-id=${category.id}>${category.name}</a>
          `
      }).join('\n')
    }
    </nav>

    <!--Кнопка прокрутки вправо-->
    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>
              `
  }

  #render(){
    this.elem = createElement(this.#template());
    const categories = this.elem.querySelectorAll('.ribbon__item');
    this.#changeCategories()
    categories.forEach(category => {
      category.addEventListener('click', this.#selectCategory)
    })
    return this.elem
  }

  #changeCategories = () => {
    let arrowPrev = this.elem.querySelector('.ribbon__arrow_left'),
        arrowNext = this.elem.querySelector('.ribbon__arrow_right'),
        ribbonInner = this.elem.querySelector('.ribbon__inner'),
        scrollCount = 350,
        scrollWidth,
        scrollLeft,
        clientWidth,
        scrollRight;
        scrollLeft = ribbonInner.scrollLeft;

    arrowNext.classList.add('ribbon__arrow_visible')
    arrowPrev.classList.remove('ribbon__arrow_visible')

    arrowNext.addEventListener('click', () => {
        scrollWidth = ribbonInner.scrollWidth,
        scrollLeft = ribbonInner.scrollLeft,
        clientWidth = ribbonInner.clientWidth;
      ribbonInner.addEventListener('scroll', function() {
          scrollLeft = ribbonInner.scrollLeft
          scrollRight = scrollWidth - scrollLeft - clientWidth;
        if(scrollLeft > 0){
          arrowPrev.classList.add('ribbon__arrow_visible')
        }
        if (scrollRight < 1){
          arrowNext.classList.remove('ribbon__arrow_visible')
        }

      });
      ribbonInner.scrollBy(scrollCount, 0); //
    })

    arrowPrev.addEventListener('click', () => {
      scrollWidth = ribbonInner.scrollWidth,
      clientWidth = ribbonInner.clientWidth;
      ribbonInner.scrollBy(-350, 0);
      ribbonInner.addEventListener('scroll', function() {
        scrollLeft = ribbonInner.scrollLeft
        scrollRight = scrollWidth - scrollLeft - clientWidth;
        console.log('scrollLeft set', scrollLeft);
        if(scrollLeft > 0){
          arrowPrev.classList.add('ribbon__arrow_visible')
        }

        if (scrollLeft ===  0 ){
          arrowPrev.classList.remove('ribbon__arrow_visible')

        }

      });

    })
  }
  #selectCategory = (e) => {
    e.preventDefault();
    const categoryCurrent = e.currentTarget
    categoryCurrent.classList.add('ribbon__item_active')
    const categories = this.elem.querySelectorAll('.ribbon__item');
    categories.forEach(category => {
      if(category.dataset.id !== categoryCurrent.dataset.id){
        category.classList.remove('ribbon__item_active')
      }
    })

    const event =  new CustomEvent('ribbon-select', { // имя события должно быть именно 'ribbon-select'
      detail: categoryCurrent.dataset.id, // уникальный идентификатора категории из её объекта
      bubbles: true // это событие всплывает - это понадобится в дальнейшем
    })
    this.elem.dispatchEvent(event)

  }

}
document.body.addEventListener('ribbon-select', (event) => {
  console.log(event);
})
