var name = "Станислав";
console.log(name);
name = "Денис";
console.log(name);

//--------------------------------//
console.log('--------------------------');
if(true){
  console.log('Hello world!');
}else{
  console.log('Buy!!!');
}


//------------------------------//
console.log('--------------------------');
for(let i = 0; i<10; i++){
  console.log(i);
}


//-----------------------------//
console.log('--------------------------');
function sum(p1, p2, p3){
  let res = p1 + p2 + p3;
  return res;
}

var sumResult = sum(10, 20, 30);
console.log(sumResult);
console.log(sum(50, 54, 32));


//--------------------------------------------------Array&Oblects------------------------------//
console.log('--------------------------');
var arr = ['привет', 'loftschool'];
arr.push(', я изучаю');
arr.push('javascript');
console.log('Array length: ' + arr.length);

for(let i = 0; i < arr.length; i++){
  console.log(arr[i]);
}

//------------------------//
console.log('--------------------------');
const BIGER = 100;
var digArr = [100, 432, 43, 543, 23, 412, 12, 86, 96, 2];
for(let i = 0; i < digArr.length; i++){
  if (digArr[i] > BIGER) {
    console.log(digArr[i]);
  }
}


//------------------------//
console.log('--------------------------');
var obj = {
  name: 'Станислав',
  lastName: 'Дрегваль',
  age: 33
}
console.log(obj.name);
console.log(obj.lastName);
console.log(obj.age);

obj.study = 'JavaScript';
console.log(obj.study);

//------------------------//
console.log('--------------------------');
function hello(human) {
  return 'Привет, меня зовут ' +human.name+ ' ' +human.lastName+ ' и мне ' +human.age+ ' лет!';
}

var info = hello(obj);
console.log(info);