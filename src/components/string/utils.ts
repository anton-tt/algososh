import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { pause } from "../../utils/utils";
import { TStringArrayElement } from "./type";

const swap = (array: Array<TStringArrayElement>, firstIndex: number, lastIndex: number) => {
  const temp = array[firstIndex];
  array[firstIndex] = array[lastIndex];
  array[lastIndex] = temp;
}

const reverseArray = async (stringArray: Array<TStringArrayElement>, 
                            setCurrentArray: (currentArray: Array<TStringArrayElement>) => void) => {
  const stringArrayLength = stringArray.length;

  for (let firstIndex = 0; firstIndex < Math.ceil(stringArrayLength / 2); firstIndex++) {
    const lastIndex = stringArrayLength - 1 - firstIndex;

    if (firstIndex !== lastIndex) {
      stringArray[firstIndex].state = ElementStates.Changing;
      stringArray[lastIndex].state = ElementStates.Changing;
      setCurrentArray([...stringArray]);
      await pause(DELAY_IN_MS);
    }

    swap(stringArray, firstIndex, lastIndex);
    stringArray[firstIndex].state = ElementStates.Modified;
    stringArray[lastIndex].state = ElementStates.Modified;
    setCurrentArray([...stringArray]);
  }
};

export default reverseArray;