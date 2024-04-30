import { ElementStates } from "../types/element-states";
import { TNumberArrayElement } from "../types/structure-element";

export const pause = (interval: number) => {
  return new Promise(resolve => setTimeout(resolve, interval));
}

const getInteger = (minNumber: number, maxNumber: number) => {
  return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
}

export const getRandomArray = (minLength: number, maxLength: number, minNumber: number, 
  maxNumber: number): Array<TNumberArrayElement> => {

  let array: Array<TNumberArrayElement> = [];
  const arrayLength = getInteger(minLength, maxLength);

  for (let i = 0; i < arrayLength; i++) {
    array.push({value: getInteger(minNumber, maxNumber), state: ElementStates.Default});
  }
  return array;
}