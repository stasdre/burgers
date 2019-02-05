const div = document.createElement('div');
div.textContent = 'Этот элемент создан при помощи DOM API'
document.body.append(div);


const divInner = document.createElement('div');
divInner.classList.add('inner');
divInner.textContent = 'Этот элемент тоже создан при помощи DOM API';
div.append(divInner);


divInner.style.color = 'red';


div.addEventListener('click', function(){
  console.log('Этот текст говорит о том, что я всё сделал правильно');
})


const link = document.createElement('a');
link.setAttribute('href', 'https://loftschool.com');
link.textContent = 'https://loftschool.com';
link.addEventListener('click', function(e){
  e.preventDefault();
  console.log('Я кликнул на ссылку ' + link.getAttribute('href'));
});
document.body.append(link);


const input = document.createElement('input');
input.setAttribute('type', 'text');
input.setAttribute('name', 'name');

const button = document.createElement('button');
button.textContent = 'View in console';
button.addEventListener('click', function(e){
  e.preventDefault();
  console.log(input.value);
  input.value = '';
})

document.body.append(input);
document.body.append(button);



//Link for Task 7 https://codepen.io/stasdre/pen/gqxQNz