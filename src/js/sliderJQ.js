$(function(){
  const container = $(".wrap");
  const list = $(".maincontent");
  const items = container.find('.section');
  var activeItem = items.filter('.active');
  const pointsContainer = $('.points__list');
  const duration = 1000;


  container.css({
    overflow: 'hidden'
  });

  list.css({
    position: 'absolute',
    top: 0,
    left: 0
  });

  var slide = function(slideID){
    var reqItem = items.filter('#'+slideID);
    var reqIndex = reqItem.index();
  
    if(reqItem.length){
      list.animate({
        'top': -reqIndex * 100 + '%'
      },duration, ()=>{
        activeItem.removeClass('active');
        reqItem.addClass('active');

        dotsItems.removeClass('active');
        dotsItems.eq(reqIndex).addClass('active');
      });  
    }  
  }

  var dots = function(){
    const points = $('<div class="points"></div>').appendTo('body');
    const ulPoints = $('<ul class="points__list"></ul>').appendTo(points);

    items.each(function(){
      var attrId = $(this).prop('id');
      var active = $(this).hasClass('active') ? 'active' : '';
      
      var dot = $('<li>', {
        attr: {
          class: 'points__item'
        },
        html: '<a href="#'+attrId+'" class="points__link scroll-to '+active+'"></a>'
      });
      ulPoints.append(dot);
    });
  }

  dots();

  const dotsItems = $('.points__link');

  slide(activeItem.prop('id'));

  $(document).on('click', '.scroll-to', function(e){
    e.preventDefault();
    slide($(this).prop('href').split('#')[1]);
  })


  list.on('wheel', e=>{
    console.log(e.wheelDelta);
  });
})