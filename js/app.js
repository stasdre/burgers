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
    initAccordion(e, teamItems, {
      type: 'vertical',
      linkClass: 'team__link',
      wrapClass: 'team__wrap',
      activeClass: 'team__item_active'
    });
  });
}

const menuItems = document.querySelectorAll('.menu-accordion__item');
for(const item of menuItems){
  
  item.addEventListener('click', e => {
    initAccordion(e, menuItems, {
      type: 'horizontal',
      linkClass: 'menu-accordion__link',
      wrapClass: 'menu-accordion__wrap',
      activeClass: 'menu-accordion__item_active'
    });
  });
}

function initAccordion(e, items, options)
{
  e.preventDefault();

  if(e.target.className != options.linkClass){
    return;
  }

  const curItem = e.currentTarget;
  const isClosedItem = curItem.classList.contains(options.activeClass);

  if(isClosedItem){
    closeItems(items, options);
  }else{
    closeItems(items, options);
    openItem(curItem, options);
  }
}

function closeItems(items, options)
{
  items.forEach(element => {
    element.classList.remove(options.activeClass);
    if(options.type == 'vertical'){
      element.querySelector('.'+options.wrapClass).style.height = 0;
    }else if(options.type == 'horizontal'){
      element.querySelector('.'+options.wrapClass).style.width = 0;
    }
  });
}

function openItem(item, options)
{
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