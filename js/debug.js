try {
  var array = [12, 100, 34, 65, 10];
  var result = filter(array, 60);
  console.log(result);
  
  result = filter(array, 20);
  console.log(result); // [100, 34, 65];    
} catch (e) {
  console.log(e.message);
}


function filter(input, than){
  let newArr = [];

  if(input.length == 0){
    throw new Error('Пустой массив');
  }

  for(let i=0; i<input.length; i++){
    if( !isFinite(input[i]) ){
      throw new Error('Только число');
    }

    if( input[i] < 0 ){
      throw new Error('Только положительные число');
    }

    if(input[i] > than){
      newArr.push(input[i]);
    }
  }
  return newArr;
}