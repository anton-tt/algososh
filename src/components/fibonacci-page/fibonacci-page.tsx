import { FC, useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { EMPTY_STRING, FIBONACCI_MAX_NUMBER } from "../../constants/const";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { pause } from "../../utils/utils";
import getFibonacciNumbers from "./utils";
import styles from "./fibonacci.module.css";

export const FibonacciPage: FC = () => {

  const [inputValue, setInputValue] = useState(EMPTY_STRING);
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const [loader, setLoader] = useState(false);

  const [currentArray, setCurrentArray] = useState<Array<number>>([]);

  const renderFibonacciNumbers = async () => {
    setLoader(true);
    const sourceArray = getFibonacciNumbers(Number(inputValue));
    for (let i = 0; i <= sourceArray.length; i++) {
      await pause(SHORT_DELAY_IN_MS);
      setCurrentArray(sourceArray.slice(0, i + 1));
    }
    setLoader(false);
  }

  const onClick = () => {
    renderFibonacciNumbers();
    setInputValue(EMPTY_STRING);
  }

  const isInvalidNumber = (inputValue.length === 0) || (+inputValue < 1) || (+inputValue > 19);

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
     <div className={styles.box}>
        <Input
          placeholder="Введите число"
          type="number" 
          max={FIBONACCI_MAX_NUMBER}
          isLimitText={true}
          value={inputValue}
          onChange={onChange}
        />
        <Button
          text={"Рассчитать"}
          isLoader={loader}
          disabled={isInvalidNumber}
          onClick={onClick} 
        />
      </div>

      <div className={styles.line}>
      { currentArray.map((item, index) => {
        return <Circle 
                index={index}
                letter={item.toString()}
                key={index}
               />
        })
      }
      </div>
    </SolutionLayout>
  );
};