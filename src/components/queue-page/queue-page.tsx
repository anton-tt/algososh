import { FC, useState, useRef, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { EMPTY_STRING, SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { pause } from "../../utils/utils";
import Queue from "./queue";
import { TStackElement } from "./type";
import styles from "./queue.module.css";

export const QueuePage: FC = () => {

  const MAX_STRING_LENGTH = 4;
  const MAX_QUEUE_SIZE = 7;
  const ADD_ELEMENT = "Добавить";
  const DELETE_ELEMENT = "Удалить";

  const [inputValue, setInputValue] = useState(EMPTY_STRING);
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const queueRef = useRef(new Queue<TStackElement>(MAX_QUEUE_SIZE));
  const queue = queueRef.current;
  const [container, setContainer] = useState(queue.getElements());
  
  const [loader, setLoader] = useState<string>(EMPTY_STRING);

  const isEmptyString = inputValue.length === 0;
  const isEmptyQueue = queue.getHead() === undefined;
  const addElementLoader = loader === ADD_ELEMENT;
  const deleteElementLoader = loader === DELETE_ELEMENT;
  const isOverflowing = container[MAX_QUEUE_SIZE - 1] !== undefined;

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
    if (!isEmptyQueue) {
    setLoader(DELETE_ELEMENT);
    queue.getHead()!.state = ElementStates.Changing;
    await pause(SHORT_DELAY_IN_MS);
    queue.dequeue();
    setContainer(queue.getElements());
    setLoader(EMPTY_STRING);
    }
  }

  const onClickClear = () => {
    queue.clear(MAX_QUEUE_SIZE);
    setContainer(queue.getElements());
  }

  return (

    <SolutionLayout title="Очередь">
      <div className={styles.box}>

        <div className={styles.container}>
          <Input
            extraClass={styles.input}
            maxLength={MAX_STRING_LENGTH}
            isLimitText={true}
            value={inputValue}
            onChange={onChange}
          />

          <Button
            text={ADD_ELEMENT}
            disabled={isEmptyString || deleteElementLoader || isOverflowing}
            isLoader={addElementLoader}
            onClick={onClickAdd}
          />

          <Button
            text={DELETE_ELEMENT}
            disabled={!isEmptyString || isEmptyQueue || addElementLoader}
            isLoader={deleteElementLoader}
            onClick={onClickDelete}
          />
        </div>

        <Button
          text={"Очистить"}
          isLoader={loader === null}
          disabled={isEmptyQueue || !isEmptyString || addElementLoader || deleteElementLoader}
          onClick={onClickClear}
        />
      </div>

      <div className={styles.line}>
      { container.map((item, index) => {
        return <Circle 
                state={item?.state}
                letter={item?.value}
                key={index}
                head={(item !== undefined) && (item === queue.getHead()) ? "head" : EMPTY_STRING}
                tail={(item !== undefined) && (item === queue.getTail()) ? "tail" : EMPTY_STRING}
               />
        })
      }
      </div>

    </SolutionLayout>
  );

};