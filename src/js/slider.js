class Slider {
  constructor(container, options) {
    this.container = document.querySelector(container);
    this.buttonLeft = this.container.querySelector('.arrow_left');
    this.buttonRight = this.container.querySelector('.arrow_right');
    this.itemsContainer = this.container.querySelector('.carusel__slider');
    this.listContainer = this.container.querySelector('.carusel__list');
    this.items = this.container.querySelectorAll('.carusel__item');
    this.components = this.container.querySelectorAll('.carusel__components');
    this.step = this.itemsContainer.getBoundingClientRect().width;

    this.position = 0;
    this.curItem = 0;


    window.addEventListener('resize', () => {
      this.step = this.itemsContainer.getBoundingClientRect().width;
    });


    this.buttonLeft.addEventListener('click', e => {
      e.preventDefault();
      this.scroll('left');
    });

    this.buttonRight.addEventListener('click', e => {
      e.preventDefault();
      this.scroll('right');
    });

    this.components.forEach(component => {
      const product = component.querySelector('.carusel__products');
      const closeIcon = product.querySelector('.product__close');

      component.addEventListener('click', e => {
        if (e.target.classList.contains('.carusel__components')) {
          product.classList.add('carusel__products_open');
        }
      });

      component.addEventListener('mouseover', () => {
        product.classList.add('carusel__products_open');
      });

      component.addEventListener('mouseout', () => {
        product.classList.remove('carusel__products_open');
      });

      closeIcon.addEventListener('click', () => {
        product.classList.remove('carusel__products_open');
      });
    });

  }

  scroll(direction) {
    if (direction === 'right') {
      this.curItem++;
      this.changePoition(direction);
      //this.listContainer.insertBefore(this.listContainer.lastElementChild, this.listContainer.firstElementChild);      
      // setInterval(()=>{
      //   console.log(this.position);
      // },1000);
    } else {
      this.curItem--;
      this.changePoition(direction);
      //this.listContainer.appendChild(this.listContainer.firstElementChild);
    }

    this.listContainer.style.right = this.position + 'px';

  }

  changePoition(direction) {
    if (direction === 'right') {
      if (this.position > 0) {
        this.position -= this.step;
      }
    } else {
      if (this.position < (this.items.length * this.step) - this.step) {
        this.position += this.step;
      }
    }
  }
}
let slider = new Slider('.carusel', {});