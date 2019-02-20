class Accordion {

  constructor(container, options) {
    this.container = document.querySelector(container);
    this.options = options;

    this.items = this.container.querySelectorAll('.' + this.options.itemsClass);

    this.container.addEventListener('click', e => {
      e.preventDefault();

      if (e.target.classList.contains(this.options.linkClass)) {
        let item;
        if (e.target.parentElement.classList.contains(this.options.itemsClass)) {
          item = e.target.parentElement;
        } else {
          item = e.target.parentElement.parentElement;
        }

        if (this.isClosed(item)) {
          this.close();
        } else {
          this.close();
          this.open(item);
        }
      }

      if (this.options.closeClass) {
        if (e.target.classList.contains(this.options.closeClass)) {
          this.close();
        }
      }
    });
  }

  isClosed(item) {
    return item.classList.contains(this.options.activeClass);
  }

  close() {
    this.items.forEach(element => {
      element.classList.remove(this.options.activeClass);
      if (this.options.type == 'vertical') {
        element.querySelector('.' + this.options.wrapClass).style.height = 0;
      } else if (this.options.type == 'horizontal') {
        element.querySelector('.' + this.options.wrapClass).style.width = 0;
      }
    });
  }

  open(item) {
    const wrap = item.querySelector('.' + this.options.wrapClass);
    if (this.options.type == 'vertical') {
      const textBlock = wrap.firstElementChild;
      const height = textBlock.getBoundingClientRect().height;
      wrap.style.height = `${height}px`;
    } else if (this.options.type == 'horizontal') {
      let width = 0;

      if (window.innerWidth <= 480) {
        width = 100 + '%';
      } else if (window.innerWidth <= 768) {
        width = 529 + 'px';
      } else {
        width = 540 + 'px';
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