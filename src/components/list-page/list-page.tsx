import { FC, useState, useRef, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import {ArrowIcon} from "../ui/icons/arrow-icon";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { EMPTY_STRING, ELEMENT_MAX_LENGTH, ARRAY_MIN_LENGTH, ARRAY_MIN_NUMBER, ARRAY_MAX_NUMBER, ADD_TO_HEAD, ADD_HEAD, 
  ADD_TO_TAIL, ADD_TAIL, DELETE_HEAD, DEL_HEAD, DELETE_TAIL, DEL_TAIL, ADD_BY_INDEX, ADD_INDEX, DELETE_BY_INDEX, DEL_INDEX, 
  BASIC_INPUT, ADDITIONAL_INPUT } from "../../constants/const";
import { TDataStructureElement } from "../../types/structure-element";
import { ElementStates } from "../../types/element-states";
import { getRandomArray, pause } from "../../utils/utils";
import LinkedList from "./list";
import {TContainerElement} from "./type";
import styles from "./list.module.css";

export const ListPage: FC = () => {

  const ARRAY_MAX_LENGTH = 7;
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

  const onClickAddToHead = async () => {
    setLoader(ADD_TO_HEAD);
    list.prepend({ value: inputValue, state: ElementStates.Default });
    const newElementData = list.getHeadValue();

    if (container.length > 0) {
      container[0] = { ...container[0],
                       topCircle: true,
                       optionalCircle: {value: newElementData!.value,
                                        state: ElementStates.Changing }                         
                      };
      setContainer([...container]);
      await pause(SHORT_DELAY_IN_MS);

      container[0] = { ...container[0],
                       topCircle: false
                                              
                      };
    }                  
 
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

  const onClickDeleteHead = async () => {
    setLoader(DELETE_HEAD);
    list.deleteHead();

    container[0] = { ...container[0],
                     bottomCircle: true,
                     optionalCircle: {value: container[0].value,
                                      state: ElementStates.Changing },
                     value: EMPTY_STRING                        
                    };
    setContainer([...container]);
    await pause(SHORT_DELAY_IN_MS);

    container.shift();                
    setContainer([...container]);
    setLoader(EMPTY_STRING); 
  }

  const onClickDeleteTail = async () => {
    setLoader(DELETE_TAIL);
    list.deleteTail();

    const endIndex = container.length - 1;
    container[endIndex] = { ...container[endIndex],
                     bottomCircle: true,
                     optionalCircle: {value: container[endIndex].value,
                                      state: ElementStates.Changing },
                     value: EMPTY_STRING                        
                    };
    setContainer([...container]);
    await pause(SHORT_DELAY_IN_MS);

    container.pop();                
    setContainer([...container]);
    setLoader(EMPTY_STRING); 
  }

  const onClickAddByIndex = async () => {
    setLoader(ADD_BY_INDEX);
    const index = +inputIndex;
    list.addByIndex({ value: inputValue, state: ElementStates.Default }, index);

    container[0] = { ...container[0],
                     topCircle: true,
                     optionalCircle: { value: inputValue,
                                       state: ElementStates.Changing }                         
                    };
    setContainer([...container]);
    await pause(SHORT_DELAY_IN_MS);

    for (let i = 1; i <= index; i++) {
      container[i] =  { ...container[i],
                        topCircle: true,
                        optionalCircle: { value: inputValue,
                                          state: ElementStates.Changing }                         
                      };
      container[i - 1] =  { ...container[i - 1],
                            topCircle: false,
                            state: ElementStates.Changing 
                          };                         
      setContainer([...container]);
      await pause(SHORT_DELAY_IN_MS);                                
    };
    container[index] =  { ...container[index],
                          topCircle: false,
                          state: ElementStates.Changing 
                        };       
    container.splice(index, 0, { value: inputValue, state: ElementStates.Modified });
    setContainer([...container]);
    await pause(SHORT_DELAY_IN_MS);
  
    container.map(element => element.state = ElementStates.Default);
    setContainer([...container]);
    await pause(SHORT_DELAY_IN_MS);

    setInputValue(EMPTY_STRING);
    setInputIndex(EMPTY_STRING);
    setLoader(EMPTY_STRING); 
  }

  const onClickDeleteByIndex = async () => {
    setLoader(DELETE_BY_INDEX);
    const index = +inputIndex;
    list.deleteByIndex(+inputIndex);

    for(let i = 0; i < index; i++) {
      container[i] =  { ...container[i],
                        state: ElementStates.Changing }
      setContainer([...container]);
      await pause(SHORT_DELAY_IN_MS);
    }
    container[index] = { ...container[index],
                         state: ElementStates.Changing,
                         bottomCircle: true,
                         optionalCircle: { value: container[index].value,
                                           state: ElementStates.Changing }, 
                         value: EMPTY_STRING                        
                        };
    setContainer([...container]);
    await pause(SHORT_DELAY_IN_MS);
     
    container.splice(index, 1);
    setContainer([...container]);
    await pause(SHORT_DELAY_IN_MS);
  
    container.map(element => element.state = ElementStates.Default);
    setContainer([...container]);
    await pause(SHORT_DELAY_IN_MS);

    setInputIndex(EMPTY_STRING);
    setLoader(EMPTY_STRING); 
  }

  const isEmptyValue = inputValue.length === 0;
  const isEmptyIndex = inputIndex.length === 0;
  const addToHeadLoader = loader === ADD_TO_HEAD;
  const addToTailLoader = loader === ADD_TO_TAIL;
  const deleteHeadLoader = loader === DELETE_HEAD;
  const deleteTailLoader = loader === DELETE_TAIL;
  const addByIndexLoader = loader === ADD_BY_INDEX;
  const deleteByIndexLoader = loader === DELETE_BY_INDEX;
  const isInvalidIndex = (+inputIndex < 0) || (+inputIndex > list.getSize() - 1);
  const isEmptyList = list.getSize() === 0;

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
            data-test={BASIC_INPUT}
          />
          <Button
            text={ADD_TO_HEAD}
            linkedList="small"
            isLoader={addToHeadLoader}
            onClick={onClickAddToHead}
            disabled={isEmptyValue || addToTailLoader || deleteHeadLoader || deleteTailLoader || addByIndexLoader 
              || deleteByIndexLoader || !isEmptyIndex}
            data-test={ADD_HEAD}  
          />

          <Button
            text={ADD_TO_TAIL}
            linkedList="small"
            isLoader={addToTailLoader}
            onClick={onClickAddToTail}
            disabled={isEmptyValue || addToHeadLoader || deleteHeadLoader || deleteTailLoader || addByIndexLoader 
              || deleteByIndexLoader || !isEmptyIndex}
            data-test={ADD_TAIL}  
          />

          <Button
            text={DELETE_HEAD}
            linkedList="small"
            isLoader={deleteHeadLoader}
            onClick={onClickDeleteHead}
            disabled={!isEmptyValue || isEmptyList || addToHeadLoader || addToTailLoader || deleteTailLoader || addByIndexLoader 
              || deleteByIndexLoader || !isEmptyIndex}
            data-test={DEL_HEAD}
          />

          <Button
            text={DELETE_TAIL}
            linkedList="small"
            isLoader={deleteTailLoader}
            onClick={onClickDeleteTail}
            disabled={!isEmptyValue || isEmptyList || addToHeadLoader || addToTailLoader || deleteHeadLoader || addByIndexLoader 
              || deleteByIndexLoader || !isEmptyIndex}
            data-test={DEL_TAIL}
          />
        </div>

        <div className={styles.box}>
          <Input
            extraClass={styles.input}
            placeholder="Введите индекс"
            type="number"
            value={inputIndex}
            onChange={onChangeIndex}
            data-test={ADDITIONAL_INPUT}
          />

          <Button
            text={ADD_BY_INDEX}
            linkedList="big"
            isLoader={addByIndexLoader}
            onClick={onClickAddByIndex}
            disabled={isEmptyIndex || isInvalidIndex || addToHeadLoader || addToTailLoader || deleteHeadLoader || deleteTailLoader 
              || deleteByIndexLoader || isEmptyValue}
            data-test={ADD_INDEX}  
          />

          <Button
            text={DELETE_BY_INDEX}
            linkedList="big"
            isLoader={deleteByIndexLoader}
            onClick={onClickDeleteByIndex}
            disabled={isEmptyIndex || isInvalidIndex || isEmptyList || addToHeadLoader || addToTailLoader || deleteHeadLoader 
              || deleteTailLoader || addByIndexLoader || !isEmptyValue}
            data-test={DEL_INDEX}  
          />
        </div>
      </div>

      <div className={styles.line}>
      { container.map((item, index) => {
        return (
          <div className={styles.circle} key={index}>

            <Circle 
              extraClass={styles.circle}
              state={item?.state}
              letter={`${item.value}`}
              index={index}
              head={ item.topCircle ? 
                <Circle 
                  state={item.optionalCircle?.state}
                  letter={item.optionalCircle?.value}
                  isSmall={true}
                 /> : (index === 0 ? "head" : EMPTY_STRING) }
              tail={item.bottomCircle ? 
                <Circle 
                  state={item.optionalCircle?.state}
                  letter={item.optionalCircle?.value}
                  isSmall={true}
                /> : (index === list.getSize() - 1 ? "tail" : EMPTY_STRING)}
            />
            {(index < list.getSize()) && 
                <ArrowIcon fill={item.state === ElementStates.Changing ? "#D252E1" : "none"}/>}
          </div>     
        )
      })}

      </div>
    </SolutionLayout>
  );

};