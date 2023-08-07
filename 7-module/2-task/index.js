import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  elem = null
  constructor() {
    this.elem = this.#render()
  }

  #render(){
    this.elem = createElement(this.#template());
    this.#closeButton()
    this.#closeEsc()
    return this.elem
  }

  #template(){
    return `  <div class="modal">
    <!--Прозрачная подложка перекрывающая интерфейс-->
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
        <!--Кнопка закрытия модального окна-->
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title">

        </h3>
      </div>

      <div class="modal__body">

      </div>
    </div>

  </div>

      `
  }

  open(){
    let bodyContainer = document.querySelector('body');
    bodyContainer.append(this.elem)
    bodyContainer.classList.add('is-modal-open')
  }

  setTitle(title){
    let modalTitle = this.elem.querySelector('.modal__title');
    modalTitle.innerHTML = String(title)
  }
  setBody(body){
    let modalBody = this.elem.querySelector('.modal__body');
    modalBody.innerHTML = ''
    modalBody.append(body)
  }

  closeModal = (container) => {
    this.elem.remove()
    container.classList.remove('is-modal-open')
  }
  close = () => {
    let bodyContainer = document.querySelector('body');
    this.closeModal(bodyContainer)
  }

  #closeButton = () => {
    let buttonClose = this.elem.querySelector('.modal__close');
    let bodyContainer = document.querySelector('body');
    buttonClose.addEventListener('click', () => {
      this.closeModal(bodyContainer)
    })
  }

  #closeEsc = () => {
    let bodyContainer = document.querySelector('body');
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        this.elem.remove()
        bodyContainer.classList.remove('is-modal-open')
      }
    });

  }

}
