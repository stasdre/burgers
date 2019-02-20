class Modal {
  constructor(container, options) {
    this.modal = document.querySelector(container);
    this.modalTitle = this.modal.querySelector('.modal__subtitle');
    this.modalContent = this.modal.querySelector('.modal__text');
    this.modalCloseButton = this.modal.querySelector('.modal__close-button .btn');
    this.modalCloseIcon = this.modal.querySelector('.modal__close');
    this.options = options;

    this.modal.addEventListener('click', e => {
      if (e.target == this.modal) {
        this.close();
      }
    });

    this.modalCloseButton.addEventListener('click', e => {
      this.close();
    });

    this.modalCloseIcon.addEventListener('click', e => {
      this.close();
    });
  }

  setTitle(title) {
    this.modalTitle.textContent = title;
  }

  setContent(text) {
    this.modalContent.textContent = text;
  }

  open() {
    if (this.isMessage()) {
      this.modal.classList.add('modal_message');
    } else {
      this.modal.classList.remove('modal_message');
    }
    this.modal.classList.add('modal_active');
  }

  close() {
    this.modal.classList.remove('modal_active');
    this.clear();
  }

  isMessage() {
    if (this.options.type == 'message') {
      return true;
    } else {
      return false;
    }
  }

  clear() {
    this.modalTitle.textContent = '';
    this.modalContent.textContent = '';
  }
}

const orderForm = document.querySelector('#order_form');
var formModal = new Modal('.modal', {
  type: 'message'
});
orderForm.addEventListener('submit', e => {
  e.preventDefault();
  let formData = new FormData(orderForm);
  formData.append('to', 'mail@mail.com');
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
  xhr.send(formData);
  xhr.addEventListener('load', () => {
    if (xhr.status >= 400) {
      formModal.setContent('Что-то пошло не так!');
    } else {
      const data = JSON.parse(xhr.responseText);
      formModal.setContent(data.message);
      orderForm.reset();
    }
    formModal.open();
  });
});

const revList = document.querySelector('.reviews__list');
var revModal = new Modal('.modal', {
  type: 'content'
});
revList.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.classList.contains('btn')) {
    let textContent = e.target.parentElement.parentElement.querySelector('.reviews__modal').textContent;
    let textTitle = e.target.parentElement.parentElement.querySelector('.reviews__subtitle').textContent;
    revModal.setTitle(textTitle);
    revModal.setContent(textContent);
    revModal.open();
  }
});