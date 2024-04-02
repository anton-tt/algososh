import { FC, useState, useEffect, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { EMPTY_STRING, RADIO_SELECT, RADIO_BUBBLE, ARRAY_MIN_LENGTH, ARRAY_MAX_LENGTH, ARRAY_MIN_NUMBER, 
  ARRAY_MAX_NUMBER } from "../../constants/const";
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
  const [loader, setLoader] = useState(Direction.Empty);  
  const [disabler, setDisabler] = useState(EMPTY_STRING);
  
  const onChangeRadio = (event: ChangeEvent<HTMLInputElement>) => {
    setRadioValue(event.target.value);
  };

  const onClickNewArr = () => {
    setCurrentArray(getRandomArray(ARRAY_MIN_LENGTH, ARRAY_MAX_LENGTH, ARRAY_MIN_NUMBER, ARRAY_MAX_NUMBER));
  };

  const onClickAscending = () => {
    (radioValue === RADIO_SELECT) && makeSelectionSort(currentArray, Direction.Ascending, setCurrentArray, setLoader);
    (radioValue === RADIO_BUBBLE) && makeBubbleSort(currentArray, Direction.Ascending, setCurrentArray, setLoader);
  }

  const onClickDescending = () => {
    (radioValue === RADIO_SELECT) && makeSelectionSort(currentArray, Direction.Descending, setCurrentArray, setLoader);
    (radioValue === RADIO_BUBBLE) && makeBubbleSort(currentArray, Direction.Descending, setCurrentArray, setLoader);
  }

  const loaderAscending = loader === Direction.Ascending;
  const loaderDescending = loader === Direction.Descending;
  
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
            isLoader={loaderAscending}
            sorting={Direction.Ascending}
            disabled={loaderDescending}
            onClick={onClickAscending}
          />

          <Button
            text={"По убыванию"}
            isLoader={loaderDescending}
            disabled={loaderAscending}
            sorting={Direction.Descending}
            onClick={onClickDescending}
          />
        </div>

        <Button
          text={"Новый массив"}
          disabled={loaderAscending || loaderDescending}
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