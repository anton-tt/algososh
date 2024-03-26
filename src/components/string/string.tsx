import { FC, useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { MAX_STRING_LENGTH, EMPTY_STRING } from "../../constants/const";
import { TStringArrayElement } from "./type";
import reverseArray from "./utils";
import styles from "./string.module.css";

export const StringComponent: FC = () => {
  
  const [inputValue, setInputValue] = useState(EMPTY_STRING);
  const [loader, setLoader] = useState(false);
  const [currentArray, setCurrentArray] = useState<Array<TStringArrayElement>>([]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const isEmptyString = inputValue.length === 0;

  const onClick = () => {
    setLoader(true);

    const sourceArray = inputValue.split(EMPTY_STRING).map((item) => {
      return { value: item,
               state: ElementStates.Default }
    });
    reverseArray(sourceArray, setCurrentArray);

    setInputValue(EMPTY_STRING);
    setLoader(false);
  }

  return (
    <SolutionLayout title="Строка">

      <div className={styles.box}>
        <Input
          maxLength={ MAX_STRING_LENGTH }
          isLimitText={true}
          onChange={onChange}
        />
        <Button
          text={"Развернуть"}
          isLoader={loader}
          disabled={isEmptyString}
          onClick={onClick} 
        />
      </div>

      <div className={styles.line}>
      { currentArray.map((item, index) => {
        return <Circle 
                state={item.state}
                letter={item.value}
                key={index}
               />
        })
      }
      </div>
     
    </SolutionLayout>
  );
};