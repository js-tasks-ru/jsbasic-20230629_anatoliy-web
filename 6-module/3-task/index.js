import createElement from '../../assets/lib/create-element.js';
export default class Carousel {
  elem = null
  constructor(slides) {
    this.slides = slides
    this.elem = this.#render()
  }
  #template(){
    return `
        <div class="carousel">
    <!--Кнопки переключения-->
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>

      <div class="carousel__inner">
      ${
        this.slides.map((slide) => {
          return `
              <div class="carousel__slide" data-id=${slide.id}>
                <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
                <div class="carousel__caption">
                  <span class="carousel__price">€${slide.price.toFixed(2)}</span>
                  <div class="carousel__title">${slide.name}</div>
                  <button type="button" class="carousel__button">
                    <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                  </button>
                </div>
              </div>`
        }).join('\n')
      }
      </div>
      </div>
    `
  }
  #render(){
    this.elem = createElement(this.#template());
    const buttons = this.elem.querySelectorAll('.carousel__button');
    this.#changeSlide()

    buttons.forEach(button => {
      button.addEventListener('click', this.#addProduct)
    })
    return this.elem
  }
  #addProduct = (e) => {
    const button = e.currentTarget
    const slide = button.closest('.carousel__slide');
    const event = new CustomEvent("product-add", {
      detail: slide.dataset.id,
      bubbles: true
    })
    console.log('this', this);
    this.elem.dispatchEvent(event)

  }
  #changeSlide = () => {
    let arrowPrev = this.elem.querySelector('.carousel__arrow_left'),
        arrowNext = this.elem.querySelector('.carousel__arrow_right'),
        slideInner = this.elem.querySelector('.carousel__inner'),
        slideItems = Array.from(this.elem.querySelectorAll('.carousel__slide')),
        slideWidth ,
        slideWidthTotal = 0;
    arrowPrev.style.display = 'none';
    slideInner.style.transform += `translateX(0px)`;


    arrowNext.addEventListener('click', () => {
      slideWidth = this.elem.querySelector('.carousel__slide').offsetWidth;
        slideWidthTotal += slideWidth;
      if(slideWidthTotal == slideWidth * (slideItems.length - 1)){
        arrowNext.style.display = 'none';
      }
      if(slideWidthTotal > 0){
        arrowPrev.style.display = '';
      }
      slideInner.style.transform = `translateX(-${slideWidthTotal + 'px'})`;
    })

    arrowPrev.addEventListener('click', () => {
      slideWidth = this.elem.querySelector('.carousel__slide').offsetWidth;
      slideWidthTotal -= slideWidth;
      if(slideWidthTotal == slideWidth * (slideItems.length - 1) || slideWidthTotal == 0){
        arrowPrev.style.display = 'none';
      }
      if(slideWidthTotal > 0){
        arrowNext.style.display = '';
      }
      slideInner.style.transform = `translateX(-${slideWidthTotal + 'px'})`;
    })
  }
}
document.body.addEventListener('product-add', (event) => {
  console.log(event);
})

