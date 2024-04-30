import { FC, useState, useRef, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { EMPTY_STRING, ELEMENT_MAX_LENGTH, QUEUE_MAX_SIZE, ADD_ELEMENT, DELETE_ELEMENT, DELETE_ALL } from "../../constants/const";
import { ElementStates } from "../../types/element-states";
import { TDataStructureElement } from "../../types/structure-element";
import { pause } from "../../utils/utils";
import Queue from "./queue";
import styles from "./queue.module.css";

export const QueuePage: FC = () => {

  const [inputValue, setInputValue] = useState(EMPTY_STRING);
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const queueRef = useRef(new Queue<TDataStructureElement>(QUEUE_MAX_SIZE));
  const queue = queueRef.current;
  const [container, setContainer] = useState(queue.getElements());
  
  const [loader, setLoader] = useState<string>(EMPTY_STRING);

  const onClickAdd = async () => {
    setLoader(ADD_ELEMENT);
    queue.enqueue({ value: inputValue, state: ElementStates.Changing });
    setContainer(queue.getElements());
    await pause(SHORT_DELAY_IN_MS);
    queue.getTail()!.state = ElementStates.Default; 
    setContainer(queue.getElements());
    setInputValue(EMPTY_STRING);
    setLoader(EMPTY_STRING); 
  }

  const onClickDelete = async () => {
    setLoader(DELETE_ELEMENT);
    queue.getHead()!.state = ElementStates.Changing;
    await pause(SHORT_DELAY_IN_MS);
    queue.dequeue(QUEUE_MAX_SIZE);
    setContainer(queue.getElements());
    setLoader(EMPTY_STRING);
}

  const onClickClear = () => {
    setLoader(DELETE_ALL);
    queue.clear(QUEUE_MAX_SIZE);
    setContainer(queue.getElements());
    setLoader(EMPTY_STRING);
  }

  const isEmptyString = inputValue.length === 0;
  const isEmptyQueue = queue.getHead() === undefined;
  const addElementLoader = loader === ADD_ELEMENT;
  const deleteElementLoader = loader === DELETE_ELEMENT;
  const deleteAllLoader = loader === DELETE_ALL; 
  const isOverflowing = container[QUEUE_MAX_SIZE - 1] !== undefined;

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.box}>

        <div className={styles.container}>
          <Input
            extraClass={styles.input}
            maxLength={ELEMENT_MAX_LENGTH}
            isLimitText={true}
            value={inputValue}
            onChange={onChange}
          />

          <Button
            text={ADD_ELEMENT}
            isLoader={addElementLoader}
            disabled={isEmptyString || isOverflowing || deleteElementLoader || deleteAllLoader}
            onClick={onClickAdd}
          />

          <Button
            text={DELETE_ELEMENT}
            isLoader={deleteElementLoader}
            disabled={!isEmptyString || isEmptyQueue || addElementLoader || deleteAllLoader}
            onClick={onClickDelete}
          />
        </div>

        <Button
          text={DELETE_ALL}
          isLoader={deleteAllLoader}
          disabled={!isEmptyString || isEmptyQueue || addElementLoader || deleteElementLoader}
          onClick={onClickClear}
        />
      </div>

      <div className={styles.line}>
      { container.map((item, index) => {
        return <Circle 
                state={item?.state}
                letter={item?.value}
                key={index}
                index={index}
                head={(item !== undefined) && (item === queue.getHead()) ? "head" : EMPTY_STRING}
                tail={(item !== undefined) && (item === queue.getTail()) ? "tail" : EMPTY_STRING}
               />
        })
      }
      </div>
    </SolutionLayout>
  );

};