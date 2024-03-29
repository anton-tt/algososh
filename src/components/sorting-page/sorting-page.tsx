import { FC, useState, useEffect, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { Direction } from "../../types/direction";
import { getRandomArray, makeSelectionSort, makeBubbleSort } from "./utils";
import { TSortingArrayElement } from "./type";
import styles from "./sorting.module.css";

export const SortingPage: FC = () => {
  
  const RADIO_SELECT = "Выбор";
  const RADIO_BUBBLE = "Пузырёк";
  
  useEffect(() => {
    setCurrentArray(getRandomArray());
  }, []);

  const [radioValue, setRadioValue] = useState<string>(RADIO_SELECT);
  const [currentArray, setCurrentArray] = useState<Array<TSortingArrayElement>>([]);
  const [loader, setLoader] = useState(false);  
  
  const onChangeRadio = (event: ChangeEvent<HTMLInputElement>) => {
    setRadioValue(event.target.value);
  };

  const onClickNewArr = () => {
    setCurrentArray(getRandomArray());
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
};
