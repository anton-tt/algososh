import { FC, useState, useEffect, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RADIO_SELECT, RADIO_BUBBLE, ARRAY_MIN_LENGTH, ARRAY_MAX_LENGTH, ARRAY_MIN_NUMBER, ARRAY_MAX_NUMBER } from "../../constants/const";
import { Direction } from "../../types/direction";
import { getRandomArray } from "../../utils/utils";
import { makeSelectionSort, makeBubbleSort } from "./utils";
import { TNumberArrayElement } from "../../types/structure-element";
import styles from "./sorting.module.css";

export const SortingPage: FC = () => {
   
  useEffect(() => {
    setCurrentArray(getRandomArray(ARRAY_MIN_LENGTH, ARRAY_MAX_LENGTH, ARRAY_MIN_NUMBER, ARRAY_MAX_NUMBER));
  }, []);

  const [radioValue, setRadioValue] = useState<string>(RADIO_SELECT);
  const [currentArray, setCurrentArray] = useState<Array<TNumberArrayElement>>([]);
  const [loader, setLoader] = useState(false);  
  
  const onChangeRadio = (event: ChangeEvent<HTMLInputElement>) => {
    setRadioValue(event.target.value);
  };

  const onClickNewArr = () => {
    setCurrentArray(getRandomArray(ARRAY_MIN_LENGTH, ARRAY_MAX_LENGTH, ARRAY_MIN_NUMBER, ARRAY_MAX_NUMBER));
  };

  const onClickAscending = () => {
    setLoader(true);
    (radioValue === RADIO_SELECT) && makeSelectionSort(currentArray, Direction.Ascending, setCurrentArray);
    (radioValue === RADIO_BUBBLE) && makeBubbleSort(currentArray, Direction.Ascending, setCurrentArray);
    setLoader(false);
  }

  const onClickDescending = () => {
    setLoader(true);
    (radioValue === RADIO_SELECT) && makeSelectionSort(currentArray, Direction.Descending, setCurrentArray);
    (radioValue === RADIO_BUBBLE) && makeBubbleSort(currentArray, Direction.Descending, setCurrentArray);
    setLoader(false);
  }
  
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.box}>
        
        <div className={styles.radio}>
          <RadioInput
            label={RADIO_SELECT}
            value={RADIO_SELECT}
            onChange={onChangeRadio}
            checked={radioValue === RADIO_SELECT}
          />

          <RadioInput
            label={RADIO_BUBBLE}
            value={RADIO_BUBBLE}
            onChange={onChangeRadio}
            checked={radioValue === RADIO_BUBBLE}
          />
        </div>

        <div className={styles.buttons}>
          <Button
            text={"По возрастанию"}
            isLoader={loader}
            sorting={Direction.Ascending}
            disabled={loader}
            onClick={onClickAscending}
          />

          <Button
            text={"По убыванию"}
            isLoader={loader}
            disabled={loader}
            sorting={Direction.Descending}
            onClick={onClickDescending}
          />
        </div>

        <Button
          text={"Новый массив"}
          isLoader={loader}
          disabled={loader}
          onClick={onClickNewArr}
        />
       
      </div>

      <div className={styles.line}>
      { currentArray.map((item, index) => {
        return <Column 
                index={item.value}
                state={item.state}
                key={index}
               />
        })
      }
      </div>

    </SolutionLayout>
  );
  
}