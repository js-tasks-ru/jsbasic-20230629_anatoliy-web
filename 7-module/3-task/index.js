import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  elem = null
  constructor({ steps, value = 0 }) {
    this.value = value
    this.steps = steps
    this.elem = this.#render()

  }



  #template(){
    return `
      <div class="slider">

      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb" style="left: 0%;">
        <span class="slider__value">${this.value}</span>
      </div>

      <!--Заполненная часть слайдера-->
      <div class="slider__progress" style="width: 0%;"></div>

      <!--Шаги слайдера-->
      <div class="slider__steps">
        <span class="slider__step-active"></span>
      </div>
    </div>

      `
  }
  #render(){
    this.elem = createElement(this.#template());
    this.elem.addEventListener('click', this.#sliderChange)
    this.#stepsCount()
    return this.elem
  }



  #sliderChange = (e) => {
    let left = e.clientX - this.elem.getBoundingClientRect().left,
        leftRelative = left / this.elem.offsetWidth,
        segments = this.steps - 1,
        approximateValue = leftRelative * segments,
        value = Math.round(approximateValue),
        valuePercents = value / segments * 100,
        thumb = this.elem.querySelector('.slider__thumb'),
        progress = this.elem.querySelector('.slider__progress'),
        valueBlock = this.elem.querySelector('.slider__value'),
        stepsSelect = Array.from(this.elem.querySelectorAll('.slider__steps > span'));


    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
    valueBlock.innerHTML = value

    stepsSelect.forEach((step, index) => {
      if(index === value ){
        step.classList.add('slider__step-active');
      }else {
        step.classList.remove('slider__step-active');
      }
    })
    const event = new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
      detail: value, // значение 0, 1, 2, 3, 4
      bubbles: true // событие всплывает - это понадобится в дальнейшем
    })
    this.elem.dispatchEvent(event)
  }



  #stepsCount = () => {
    let container = this.elem.querySelector('.slider__steps');
    let step;
    for(let i = 0; i <  this.steps - 1; i++){
      step = document.createElement('span')
      container.appendChild(step);
    }
    return container
  }







}

document.body.addEventListener('slider-change', (event) => {
  console.log(event);
})
