import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { DELAY_IN_MS } from "../../constants/delays";
import { pause } from "../../utils/utils";
import { TNumberArrayElement } from "../../types/structure-element";

const swap = (array: Array<TNumberArrayElement>, firstIndex: number, lastIndex: number) => {
  const temp = array[firstIndex];
  array[firstIndex] = array[lastIndex];
  array[lastIndex] = temp;
}

export const makeBubbleSort = async (arr: Array<TNumberArrayElement>,
  sortDirection: Direction,
  setCurrentArray: (currentArray: Array<TNumberArrayElement>) => void) => {
  
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

export const makeSelectionSort = async (arr: Array<TNumberArrayElement>,
  sortDirection: Direction, 
  setCurrentArray: (currentArray: Array<TNumberArrayElement>) => void) => {

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