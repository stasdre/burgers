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


var teamAcco = new Accordion({
  type: 'vertical',
  itemsClass: 'team__item',
  linkClass: 'team__link',
  wrapClass: 'team__wrap',
  activeClass: 'team__item_active'
}).init();

var menuAcco = new Accordion({
  type: 'horizontal',
  itemsClass: 'menu-accordion__item',
  linkClass: 'menu-accordion__link',
  wrapClass: 'menu-accordion__wrap',
  activeClass: 'menu-accordion__item_active'
}).init();

function Accordion(options){
  const items = document.querySelectorAll('.'+options.itemsClass);      

  function create(e){
    e.preventDefault();

    if(e.target.className != options.linkClass){
      return;
    }
  
    const item = e.currentTarget;
    const isClosedItem = item.classList.contains(options.activeClass);
  
    if(isClosedItem){
      close();
    }else{
      close();
      open(item);
    }
  }

  function close(){
    items.forEach(element => {
      element.classList.remove(options.activeClass);
      if(options.type == 'vertical'){
        element.querySelector('.'+options.wrapClass).style.height = 0;
      }else if(options.type == 'horizontal'){
        element.querySelector('.'+options.wrapClass).style.width = 0;
      }
    });      
  }

  function open(item){
    const wrap = item.querySelector('.'+options.wrapClass);

    if(options.type == 'vertical'){
      const textBlock = wrap.firstElementChild;
      const height = textBlock.getBoundingClientRect().height;
      
      wrap.style.height = `${height}px`;
    }else if(options.type == 'horizontal'){
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
  
    item.classList.add(options.activeClass);        
  }

  return {
    init: function(){
      for(const item of items){
        item.addEventListener('click', e => {
          create(e);
        });      
      }
    }
  }
}