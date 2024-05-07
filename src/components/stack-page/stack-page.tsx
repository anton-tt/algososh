import { FC, useState, useRef, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { EMPTY_STRING, ELEMENT_MAX_LENGTH, ADD_ELEMENT, DELETE_ELEMENT, DELETE_ALL, STACK_INPUT } from "../../constants/const";
import { ElementStates } from "../../types/element-states";
import { TDataStructureElement } from "../../types/structure-element";
import { pause } from "../../utils/utils";
import Stack from "./stack";
import styles from "./stack.module.css";

export const StackPage: FC = () => {

  const [inputValue, setInputValue] = useState(EMPTY_STRING);
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const [loader, setLoader] = useState(EMPTY_STRING);
  
  const stackRef = useRef(new Stack<TDataStructureElement>());
  const stack = stackRef.current;
  const [container, setContainer] = useState(stack.getElements);

  const onClickAdd = async () => {
    setLoader(ADD_ELEMENT);
    stack.push({ value: inputValue, state: ElementStates.Changing });
    setContainer(stack.getElements);
    await pause(SHORT_DELAY_IN_MS);
    stack.peak()!.state = ElementStates.Default; 
    setContainer(stack.getElements);
    setInputValue(EMPTY_STRING);
    setLoader(EMPTY_STRING);
  }

  const onClickDelete = async () => {
    setLoader(DELETE_ELEMENT);
    stack.peak()!.state = ElementStates.Changing;
    await pause(SHORT_DELAY_IN_MS);
    stack.pop();
    setContainer(stack.getElements);
    setLoader(EMPTY_STRING);
  }

  const onClickClear = () => {
    setLoader(DELETE_ALL);
    stack.clear();
    setContainer(stack.getElements);
    setLoader(EMPTY_STRING);
  }

  const isEmptyString = inputValue.length === 0;
  const isEmptyStack = stack.getSize() === 0;
  const addElementLoader = loader === ADD_ELEMENT;
  const deleteElementLoader = loader === DELETE_ELEMENT;
  const deleteAllLoader = loader === DELETE_ALL; 

  return (
    <SolutionLayout title="Стек">
      <div className={styles.box}>

        <div className={styles.container}>
          <Input
            extraClass={styles.input}
            maxLength={ELEMENT_MAX_LENGTH}
            isLimitText={true}
            value={inputValue}
            onChange={onChange}
            data-test={STACK_INPUT}
          />

          <Button
            text={ADD_ELEMENT}
            isLoader={addElementLoader}
            disabled={isEmptyString || deleteElementLoader || deleteAllLoader}
            onClick={onClickAdd}
            data-test={ADD_ELEMENT}
          />

          <Button
            text={DELETE_ELEMENT}
            isLoader={deleteElementLoader}
            disabled={!isEmptyString || isEmptyStack || addElementLoader || deleteAllLoader}
            onClick={onClickDelete}
            data-test={DELETE_ELEMENT}
          />
        </div>

        <Button
          text={DELETE_ALL}
          isLoader={deleteAllLoader}
          disabled={!isEmptyString || isEmptyStack || addElementLoader || deleteElementLoader}
          onClick={onClickClear}
          data-test={DELETE_ALL}
        />
      </div>

      <div className={styles.line}>
      { container.map((item, index) => {
        return <Circle 
                state={item.state}
                letter={item.value}
                key={index}
                index={index}
                head={(index === stack.getSize() - 1) ? "top" : EMPTY_STRING}
               />
        })
      }
      </div>
    </SolutionLayout>
  );

};