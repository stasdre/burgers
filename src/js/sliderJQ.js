$(function () {
  const header = $('.header');
  const container = $(".wrap");
  const list = $(".maincontent");
  const items = container.find('.section');
  let inscroll = false;

  const md = new MobileDetect(window.navigator.userAgent);
  const isMobile = md.mobile();

  var dots = () => {
    const points = $('<div class="points"></div>').appendTo('body');
    const ulPoints = $('<ul class="points__list"></ul>').appendTo(points);

    items.each(function () {
      var attrId = $(this).prop('id');
      var active = $(this).hasClass('active') ? 'active' : '';

      var dot = $('<li>', {
        attr: {
          class: 'points__item ' + active
        },
        html: '<a href="#' + attrId + '" class="points__link scroll-to"></a>'
      });
      ulPoints.append(dot);
    });
  }
  dots();
  const dotsItems = $('.points__item');

  const setActiveNoActive = indexEq => {

    items.eq(indexEq)
      .addClass('active')
      .siblings()
      .removeClass('active');

    dotsItems
      .eq(indexEq)
      .addClass('active')
      .siblings()
      .removeClass('active');
  }

  const slideTransition = slideID => {
    if (inscroll) return;

    inscroll = true;

    const reqItem = items.filter('#' + slideID);
    const reqIndex = reqItem.index();
    const translate = -reqIndex * 100 + '%';

    if (reqItem.length) {
      list.css({
        'transform': `translateY(${translate})`
      });

      setActiveNoActive(reqIndex);
    }

    setTimeout(() => {
      inscroll = false;
    }, 1000 + 300);
  }

  const scrollTo = direction => {
    const activeItem = items.filter('.active');
    const next = activeItem.next();
    const prev = activeItem.prev();

    if (direction === 'next') {
      slideTransition(next.prop('id'));
    } else if (direction === 'prev') {
      slideTransition(prev.prop('id'));
    }
  }

  container.on('wheel', e => {
    const deltaY = e.originalEvent.deltaY;
    if (deltaY > 0) {
      scrollTo('next');
    } else if (deltaY < 0) {
      scrollTo('prev');
    }
  });

  container.on('touchmove', e=>{
    e.preventDefault();
  });

  $(document).on("keydown", e => {
    if (e.keyCode == 38) {
      scrollTo('prev');
    } else if (e.keyCode == 40) {
      scrollTo('next');
    }
  });

  $(document).on('click', '.scroll-to', function (e) {
    e.preventDefault();
    header.removeClass('header_active');
    slideTransition($(this).prop('href').split('#')[1]);
  });

  if (isMobile) {
    $(window).swipe({
      swipe: function (event, direction) {
        const dir = direction === 'up' ? 'next' : 'prev';
        scrollTo(dir);
      }
    });
  }
});