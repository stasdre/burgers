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


const teamItems = document.querySelectorAll('.team__item');

for(const item of teamItems){
  item.addEventListener('click', e => {
    e.preventDefault();
    const curItem = e.currentTarget;
    const wrap = curItem.querySelector('.team__wrap');
    const textBlock = wrap.firstElementChild;
    const height = textBlock.getBoundingClientRect().height;

    if(curItem.classList.contains('team__item_active')){
      wrap.style.height = 0;
      curItem.classList.remove('team__item_active');  
    }else{

      teamItems.forEach(element => {
        element.classList.remove('team__item_active');
        element.querySelector('.team__wrap').style.height = 0;
      });

      wrap.style.height = `${height}px`;
      curItem.classList.add('team__item_active');  
    }
  });
}

const menuItems = document.querySelectorAll('.menu-accordion__item');

for(const item of menuItems){
  
  item.addEventListener('click', e => {
    e.preventDefault();

    if(e.target.className != 'menu-accordion__link'){
      return;
    }

    const curItem = e.currentTarget;
    const wrap = curItem.querySelector('.menu-accordion__wrap');
    const closeLink = wrap.querySelector('.menu-accordion__close');
    let width = 0;

    if(window.innerWidth <= 480){
      width = 100+'%';
    }else if(window.innerWidth <= 768){
      width = 529+'px';
    }else{
      width = 540+'px';
    }

    if(curItem.classList.contains('menu-accordion__item_active')){
      wrap.style.width = 0;
      curItem.classList.remove('menu-accordion__item_active');  
    }else{

      menuItems.forEach(element => {
        element.classList.remove('menu-accordion__item_active');
        element.querySelector('.menu-accordion__wrap').style.width = 0;
      });

      wrap.style.width = width;
      curItem.classList.add('menu-accordion__item_active');  
    }


    closeLink.addEventListener('click', e => {
      e.preventDefault();
      wrap.style.width = 0;
      curItem.classList.remove('menu-accordion__item_active');        
    })
  });
}