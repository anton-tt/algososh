import { FC, useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";



export const SortingPage: FC = () => {
  
  const RADIO_SELECT = "RADIO_SELECT";
  const RADIO_BUBBLE = "RADIO_BUBBLE";

  const [radioValue, setRadioValue] = useState<string>(RADIO_SELECT);  
  
  const onClickRadio = (event: ChangeEvent<HTMLInputElement>) => {
    setRadioValue(event.target.value);
  };
  
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.box}>

        <RadioInput
          label="Выбор"
          value={RADIO_SELECT}
          onChange={onClickRadio}
          checked={radioValue === RADIO_SELECT}
        />

        <RadioInput
          label="Пузырёк"
          value={RADIO_BUBBLE}
          onChange={onClickRadio}
          checked={radioValue === RADIO_BUBBLE}
        />

        <Button
          text={"По возрастанию"}
        />

        <Button
          text={"По убыванию"}
        />

        <Button
          text={"Новый массив"}
        />
       
      </div>





    </SolutionLayout>
  );
};
