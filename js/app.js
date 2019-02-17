////-----hamburger menu----/////
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

////-----Accordion----/////
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

////-----Slider----/////
class Slider{
  constructor(container, options){
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

    this.components.forEach(component=>{
      const product = component.querySelector('.carusel__products');
      const closeIcon = product.querySelector('.product__close');

      component.addEventListener('click', e=>{
        if(e.target.classList.contains('.carusel__components')){
          product.classList.add('carusel__products_open');
        }
      });  

      component.addEventListener('mouseover', ()=>{
        product.classList.add('carusel__products_open');
      });  

      component.addEventListener('mouseout', ()=>{
        product.classList.remove('carusel__products_open');
      });  

      closeIcon.addEventListener('click', ()=>{
        product.classList.remove('carusel__products_open');
      });
    });

  }

  scroll(direction){
    if(direction === 'right'){
      this.curItem ++;
      this.changePoition(direction);
      //this.listContainer.insertBefore(this.listContainer.lastElementChild, this.listContainer.firstElementChild);      
      // setInterval(()=>{
      //   console.log(this.position);
      // },1000);
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
      if( this.position < (this.items.length * this.step)-this.step ){
        this.position += this.step;
      }
    }
  }
}
let = new Slider('.carusel', {});

////-----Modal----/////
class Modal{
  constructor(container, options){
    this.modal = document.querySelector(container);
    this.modalTitle = this.modal.querySelector('.modal__subtitle');
    this.modalContent = this.modal.querySelector('.modal__text');
    this.modalCloseButton = this.modal.querySelector('.modal__close-button .btn');
    this.modalCloseIcon = this.modal.querySelector('.modal__close');
    this.options = options;

    this.modal.addEventListener('click', e=>{
      if(e.target == this.modal){
        this.close();
      }
    });

    this.modalCloseButton.addEventListener('click', e=>{
      this.close();
    });

    this.modalCloseIcon.addEventListener('click', e=>{
      this.close();
    });
  }

  setTitle(title){
    this.modalTitle.textContent = title;
  }

  setContent(text){
    this.modalContent.textContent = text;
  }

  open(){
    if(this.isMessage()){
      this.modal.classList.add('modal_message');
    }else{
      this.modal.classList.remove('modal_message');
    }
    this.modal.classList.add('modal_active');
  }

  close(){
    this.modal.classList.remove('modal_active');
    this.clear();
  }

  isMessage(){
    if(this.options.type == 'message'){
      return true;      
    }else{
      return false;
    }
  }

  clear(){
    this.modalTitle.textContent = '';
    this.modalTitle.textContent = '';
  }
}

////-----Form----/////
const orderForm = document.querySelector('#order_form');
var formModal = new Modal('.modal', {
  type: 'message'
});
orderForm.addEventListener('submit', e=>{
  e.preventDefault();
  let formData = new FormData(orderForm);
  formData.append('to', 'mail@mail.com');
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
  xhr.send(formData);
  xhr.addEventListener('load', ()=>{
    if(xhr.status >= 400){
      formModal.setContent('Что-то пошло не так!');
    }else{
      const data = JSON.parse(xhr.responseText);
      formModal.setContent(data.message);
    }
    formModal.open();
  });  
});

////-----Reviews----/////
const revList = document.querySelector('.reviews__list');
var revModal = new Modal('.modal', {
  type: 'content'
});
revList.addEventListener('click', e=>{
  e.preventDefault();
  if(e.target.classList.contains('btn')){
    let textContent = e.target.parentElement.parentElement.querySelector('.reviews__modal').textContent;
    let textTitle = e.target.parentElement.parentElement.querySelector('.reviews__subtitle').textContent;
    revModal.setTitle(textTitle);
    revModal.setContent(textContent);
    revModal.open();
  }
});