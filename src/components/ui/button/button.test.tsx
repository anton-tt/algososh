import React from 'react';
import renderer from "react-test-renderer";
import {render, screen, fireEvent} from "@testing-library/react";
import { Button } from "./button";

describe("Проверка компонента Кнопка", function() {
  
  it("кнопка без текста", () => {
    const tree = renderer
    .create(<Button text="" />)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  it("кнопка с текстом", () => {
    const tree = renderer
    .create(<Button text="Добавить" />)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("кнопка заблокирована", () => {
    const tree = renderer
    .create(<Button text="Добавить" disabled={true} />)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });
   
  it("кнопка при загрузке", () => {
    const tree = renderer
    .create(<Button text="Добавить" isLoader={true} />)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("клик по кнопке", () => {
    const callback = jest.fn();
    render(<Button text="Добавить" onClick={callback} />);
    fireEvent.click(screen.getByText("Добавить"));
    expect(callback).toHaveBeenCalled();
  });
  
});