import { FC, useState, useEffect, useRef, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { EMPTY_STRING, ELEMENT_MAX_LENGTH, ARRAY_MIN_LENGTH, ARRAY_MIN_NUMBER, ARRAY_MAX_NUMBER, ADD_ELEMENT, DELETE_ELEMENT, DELETE_ALL } from "../../constants/const";
import { TDataStructureElement } from "../../types/structure-element";
import { ElementStates } from "../../types/element-states";
import { getRandomArray, pause } from "../../utils/utils";
import LinkedList from "./list";
import {TContainerElement} from "./type";
import styles from "./list.module.css";

export const ListPage: FC = () => {

  const ARRAY_MAX_LENGTH = 5;
  const initialArray = getRandomArray(ARRAY_MIN_LENGTH, ARRAY_MAX_LENGTH, ARRAY_MIN_NUMBER, ARRAY_MAX_NUMBER)
    .map(element => {return {value: `${element.value}`, state: element.state}});
  const listRef = useRef(new LinkedList<TDataStructureElement>(initialArray));
  const list = listRef.current;

  const containerArray: Array<TContainerElement> = list.toArray()
    .map(element => {return {value: `${element.value}`, state: element.state}});
  const [container, setContainer] = useState(containerArray);
  
  const [inputValue, setInputValue] = useState(EMPTY_STRING);
  const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const [inputIndex, setInputIndex] = useState(EMPTY_STRING);
  const onChangeIndex = (event: ChangeEvent<HTMLInputElement>) => {
    setInputIndex(event.target.value);
  };

  const [loader, setLoader] = useState<string>(EMPTY_STRING);

  const ADD_TO_HEAD = "Добавить в head";
  const ADD_TO_TAIL = "Добавить в tail";

  const onClickAddToHead = async () => {
    setLoader(ADD_TO_HEAD);
    list.prepend({ value: inputValue, state: ElementStates.Default });

    const newElementData = list.getHeadValue();
    container[0] = { ...container[0],
                     topCircle: true,
                     optionalCircle: {value: newElementData!.value,
                                      state: ElementStates.Changing }                         
                    };
    setContainer([...container]);
    await pause(SHORT_DELAY_IN_MS);

    container[0] = { ...container[0],
                     topCircle: false,
                     optionalCircle: undefined                         
                    };
    container.unshift({ value: newElementData!.value,
                        state: ElementStates.Modified });                
    setContainer([...container]);
    await pause(SHORT_DELAY_IN_MS);

    container[0] = { ...container[0],
                     state: ElementStates.Default                 
                    };
    setContainer([...container]);
    
    setInputValue(EMPTY_STRING);
    setLoader(EMPTY_STRING); 
  }

  const onClickAddToTail = async () => {
    setLoader(ADD_TO_TAIL);
    list.append({ value: inputValue, state: ElementStates.Default });

    const newElementData = list.getTailValue();
    const endIndex = container.length - 1;
    container[endIndex] = { ...container[endIndex],
                     topCircle: true,
                     optionalCircle: {value: newElementData!.value,
                                      state: ElementStates.Changing }                         
                    };
    setContainer([...container]);
    await pause(SHORT_DELAY_IN_MS);

    container[endIndex] = { ...container[endIndex],
                     topCircle: false,
                     optionalCircle: undefined                         
                    };
    container.push({ value: newElementData!.value,
                     state: ElementStates.Modified });                
    setContainer([...container]);
    await pause(SHORT_DELAY_IN_MS);

    container[endIndex + 1] = { ...container[endIndex + 1],
                            state: ElementStates.Default                 
                    };
    setContainer([...container]);
    
    setInputValue(EMPTY_STRING);
    setLoader(EMPTY_STRING); 
  }

  const addToHeadLoader = loader === ADD_TO_HEAD;
  const addToTailLoader = loader === ADD_TO_TAIL;

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>

        <div className={styles.box}>
          <Input
            extraClass={styles.input}
            placeholder="Введите значение"
            maxLength={ELEMENT_MAX_LENGTH}
            isLimitText={true}
            value={inputValue}
            onChange={onChangeValue}
          />
          <Button
            text={ADD_TO_HEAD}
            linkedList="small"
            isLoader={addToHeadLoader}
            onClick={onClickAddToHead}
          />

          <Button
            text={ADD_TO_TAIL}
            linkedList="small"
            isLoader={addToTailLoader}
            onClick={onClickAddToTail}
          />

          <Button
            text={"Удалить из head"}
            linkedList="small"
            //isLoader={addElementLoader}
            //onClick={onClickAdd}
          />

          <Button
            text={"Удалить из tail"}
            linkedList="small"
            //isLoader={addElementLoader}
            //onClick={onClickAdd}
          />
        </div>

        <div className={styles.box}>
          <Input
            extraClass={styles.input}
            placeholder="Введите индекс"
            /*maxLength={MAX_STRING_LENGTH}
            isLimitText={true}*/
            value={inputIndex}
            onChange={onChangeIndex}
          />

          <Button
            text={"Добавить по индексу"}
            linkedList="big"
            //isLoader={addElementLoader}
            //onClick={onClickAdd}
          />

          <Button
            text={"Удалить по индексу"}
            linkedList="big"
            //isLoader={addElementLoader}
            //onClick={onClickAdd}
          />

        </div>

      </div>

      <div className={styles.line}>
      { container.map((item, index) => {
        return (
          <div className={styles.circles}>
            { item.topCircle && 
              <Circle 
                //extraClass={styles.topCircle}
                state={item.optionalCircle?.state}
                letter={item.optionalCircle?.value}
                isSmall={true}
               /> }

            <Circle 
             // extraClass={styles.circle}
              state={item?.state}
              letter={`${item.value}`}
              key={index}
              index={index}
            />

            { item.bottomCircle && 
              <Circle 
                //extraClass={styles.bottom}
                state={item.optionalCircle?.state}
                letter={item.optionalCircle?.value}
                isSmall={true}
              /> }
          </div>     
        )
      })}
      </div>
    
    </SolutionLayout>
  );

};