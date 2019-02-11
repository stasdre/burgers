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
    //console.log(height);
  });
}