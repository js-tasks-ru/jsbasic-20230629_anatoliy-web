function initCarousel() {
  let arrowPrev = document.querySelector('.carousel__arrow_left'),
      arrowNext = document.querySelector('.carousel__arrow_right'),
      slideWidth = document.querySelector('.carousel__slide').offsetWidth,
      slideInner = document.querySelector('.carousel__inner'),
      slideItems = Array.from(document.querySelectorAll('.carousel__slide')),
      slideWidthTotal = 0;
  arrowPrev.style.display = 'none';
  slideInner.style.transform += `translateX(0px)`;
  arrowNext.addEventListener('click', () => {
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


