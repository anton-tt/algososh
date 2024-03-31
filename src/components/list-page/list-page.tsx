import { FC, useState, useRef, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { EMPTY_STRING, SHORT_DELAY_IN_MS } from "../../constants/delays";
import { TDataStructureElement } from "../../types/structure-element";
import LinkedList from "./list";
import styles from "./list.module.css";

export const ListPage: FC = () => {

  const MAX_STRING_LENGTH = 4;

  const [inputValue, setInputValue] = useState(EMPTY_STRING);
  const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const [inputIndex, setInputIndex] = useState(EMPTY_STRING);
  const onChangeIndex = (event: ChangeEvent<HTMLInputElement>) => {
    setInputIndex(event.target.value);
  };

  const listRef = useRef(new LinkedList<TDataStructureElement>());
  const list = listRef.current;
  //const [container, setContainer] = useState(list.getElements());


  return (
    
    <SolutionLayout title="Связный список">

      <div className={styles.container}>

        <div className={styles.box}>
          <Input
            extraClass={styles.input}
            placeholder="Введите значение"
            maxLength={MAX_STRING_LENGTH}
            isLimitText={true}
            value={inputValue}
            onChange={onChangeValue}
          />
          <Button
            text={"Добавить в head"}
            linkedList="small"
            //disabled={isEmptyString || deleteElementLoader || isOverflowing}
            //isLoader={addElementLoader}
            //onClick={onClickAdd}
          />

          <Button
            text={"Добавить в tail"}
            linkedList="small"
            //disabled={isEmptyString || deleteElementLoader || isOverflowing}
            //isLoader={addElementLoader}
            //onClick={onClickAdd}
          />

          <Button
            text={"Удалить из head"}
            linkedList="small"
            //disabled={isEmptyString || deleteElementLoader || isOverflowing}
            //isLoader={addElementLoader}
            //onClick={onClickAdd}
          />

          <Button
            text={"Удалить из tail"}
            linkedList="small"
            //disabled={isEmptyString || deleteElementLoader || isOverflowing}
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
            //disabled={isEmptyString || deleteElementLoader || isOverflowing}
            //isLoader={addElementLoader}
            //onClick={onClickAdd}
          />

          <Button
            text={"Удалить по индексу"}
            linkedList="big"
            //disabled={isEmptyString || deleteElementLoader || isOverflowing}
            //isLoader={addElementLoader}
            //onClick={onClickAdd}
          />

        </div>

      </div>
    
    </SolutionLayout>
  );

};