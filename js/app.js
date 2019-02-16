const header = document.querySelector('.header');
const menu = document.querySelector('#hamburger-menu');
const closeHamburger = document.querySelector('#hamburger-close');

menu.addEventListener('click', function(e){
  e.preventDefault();
  header.classList.add('header_active');
});

closeHamburger.addEventListener('click', function(e){
  e.preventDefault();
  header.classList.remove('header_active');
});


class Accordion{

  constructor(container, options){
    this.container = document.querySelector(container);
    this.options = options;

    this.items = this.container.querySelectorAll('.'+this.options.itemsClass);

    this.container.addEventListener('click', e => {
      e.preventDefault();

      if(e.target.classList.contains(this.options.linkClass)){
        let item;
        if(e.target.parentElement.classList.contains(this.options.itemsClass)){
          item = e.target.parentElement;
        }else{
          item = e.target.parentElement.parentElement;
        }
        
        if(this.isClosed(item)){
          this.close();
        }else{
          this.close();
          this.open(item);
        }
      }

      if(this.options.closeClass){
        if(e.target.classList.contains(this.options.closeClass)){
          this.close();
        }  
      }
    });
  }

  isClosed(item){
    return item.classList.contains(this.options.activeClass);
  }

  close(){
    this.items.forEach(element => {
      element.classList.remove(this.options.activeClass);
      if(this.options.type == 'vertical'){
        element.querySelector('.'+this.options.wrapClass).style.height = 0;
      }else if(this.options.type == 'horizontal'){
        element.querySelector('.'+this.options.wrapClass).style.width = 0;
      }
    });      
  }

  open(item){
    const wrap = item.querySelector('.'+this.options.wrapClass);
    if(this.options.type == 'vertical'){
      const textBlock = wrap.firstElementChild;
      const height = textBlock.getBoundingClientRect().height;      
      wrap.style.height = `${height}px`;
    }else if(this.options.type == 'horizontal'){
      let width = 0;
  
      if(window.innerWidth <= 480){
        width = 100+'%';
      }else if(window.innerWidth <= 768){
        width = 529+'px';
      }else{
        width = 540+'px';
      }   
      
      wrap.style.width = width;
    }
  
    item.classList.add(this.options.activeClass);        
  }
}

class Slider{
  constructor(container, options){
    this.container = document.querySelector(container);
    this.buttonLeft = this.container.querySelector('.arrow_left');
    this.buttonRight = this.container.querySelector('.arrow_right');
    this.itemsContainer = this.container.querySelector('.carusel__slider');
    this.listContainer = this.container.querySelector('.carusel__list');
    this.items = this.container.querySelectorAll('.carusel__item');
    this.step = this.itemsContainer.getBoundingClientRect().width;
    
    this.position = 0;
    this.curItem = 0;


    window.addEventListener('resize', ()=>{
      this.step = this.itemsContainer.getBoundingClientRect().width;
    });


    this.buttonLeft.addEventListener('click', e=>{
      e.preventDefault();
      this.scroll('left');
    });

    this.buttonRight.addEventListener('click', e=>{
      e.preventDefault();
      this.scroll('right');
    });
  }

  scroll(direction){
    if(direction === 'right'){
      this.curItem ++;
      this.changePoition(direction);
      //this.listContainer.insertBefore(this.listContainer.lastElementChild, this.listContainer.firstElementChild);      
    }else{
      this.curItem --;
      this.changePoition(direction);
      //this.listContainer.appendChild(this.listContainer.firstElementChild);
    }

    this.listContainer.style.right = this.position+'px';

  }

  changePoition(direction){
    if(direction === 'right'){
      if(this.position > 0){
        this.position -= this.step;
      }
    }else{
      console.log(this.items.length * this.step);
      if( this.position < (this.items.length * this.step)-this.step ){
        this.position += this.step;
      }
    }
  }
}

let = new Slider('.carusel', {

});

let teamAcco = new Accordion('.team', {
  type: 'vertical',
  itemsClass: 'team__item',
  linkClass: 'team__link',
  wrapClass: 'team__wrap',
  activeClass: 'team__item_active'
});

let menuAcco = new Accordion('.menu-accordion', {
  type: 'horizontal',
  itemsClass: 'menu-accordion__item',
  linkClass: 'menu-accordion__link',
  wrapClass: 'menu-accordion__wrap',
  activeClass: 'menu-accordion__item_active',
  closeClass: 'close'
});

const sliderMenu = document.querySelector('.carusel__slider');

sliderMenu.addEventListener('click', e=>{
  e.preventDefault();
  console.log(e.currentTarget);
})