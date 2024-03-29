import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { DELAY_IN_MS } from "../../constants/delays";
import { pause } from "../../utils/utils";
import { TSortingArrayElement } from "./type";

const MIN_LENGTH = 3;
const MAX_LENGTH = 17;
const MIN_NUMBER = 0;
const MAX_NUMBER = 100;

const getInteger = (minNumber: number, maxNumber: number) => {
  return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
}

export const getRandomArray = (): Array<TSortingArrayElement> => {
  let array: Array<TSortingArrayElement> = [];
  const arrayLength = getInteger(MIN_LENGTH, MAX_LENGTH);

  for (let i = 0; i < arrayLength; i++) {
    array.push({value: getInteger(MIN_NUMBER, MAX_NUMBER), state: ElementStates.Default});
  }
  return array;
}

const swap = (array: Array<TSortingArrayElement>, firstIndex: number, lastIndex: number) => {
  const temp = array[firstIndex];
  array[firstIndex] = array[lastIndex];
  array[lastIndex] = temp;
}

export const makeBubbleSort = async (arr: Array<TSortingArrayElement>,
  sortDirection: Direction,
  setCurrentArray: (currentArray: Array<TSortingArrayElement>) => void) => {
  
  const arrLength = arr.length;
  for (let i = 0; i < arrLength; i++) {
    for (let j = 0; j < (arrLength - i - 1); j++) {
      arr[j].state = ElementStates.Changing;
      arr[j + 1].state = ElementStates.Changing;
      setCurrentArray([...arr]);
      await pause(DELAY_IN_MS);

      (sortDirection === Direction.Ascending) && (arr[j].value > arr[j + 1].value) && swap(arr, j, j + 1);
      (sortDirection === Direction.Descending) && (arr[j].value < arr[j + 1].value) && swap(arr, j, j + 1);
      arr[j].state = ElementStates.Default;
    }
    arr[arrLength - i - 1].state = ElementStates.Modified;
    setCurrentArray([...arr]);
    await pause(DELAY_IN_MS);
  }

}    

export const makeSelectionSort = async (arr: Array<TSortingArrayElement>,
  sortDirection: Direction, 
  setCurrentArray: (currentArray: Array<TSortingArrayElement>) => void) => {

  const arrLength = arr.length;
  for (let i = 0; i < arrLength; i++) {
    let maxElementIndex = i;
    for (let j = i + 1; j < arrLength; j++) {
      arr[i].state = ElementStates.Changing;
      arr[j].state = ElementStates.Changing;
      setCurrentArray([...arr]);
      await pause(DELAY_IN_MS);

      if (((sortDirection === Direction.Ascending) && (arr[maxElementIndex].value > arr[j].value)) || 
          ((sortDirection === Direction.Descending) && (arr[maxElementIndex].value < arr[j].value))) {
        maxElementIndex = j;
        swap(arr, j, maxElementIndex);
        setCurrentArray([...arr]);
      }
      arr[j].state = ElementStates.Default;
      arr[i].state = ElementStates.Default;
      setCurrentArray([...arr]);
    }
    arr[maxElementIndex].state = ElementStates.Modified;
    swap(arr, i, maxElementIndex);
    setCurrentArray([...arr]);
  }

}