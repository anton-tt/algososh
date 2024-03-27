const getFibonacciNumbers = (index: number) => {
  let array: Array<number> = [1, 1];     
  for (let i = 2; i < index + 1; i++) {
    array.push(array[i - 2] + array[i - 1]);
  }
  return array;      
}

export default getFibonacciNumbers;