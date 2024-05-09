import {render, screen, fireEvent} from "@testing-library/react";
import { Button } from "./button";

describe("Проверка компонента Кнопка", function() {
  
  it("кнопка без текста", () => {
    const { container } = render(<Button text="" />);
    expect(container).toMatchSnapshot();
  });

  it("кнопка с текстом", () => {
    const { container } = render(<Button text="Добавить" />);
    expect(screen.getByText("Добавить")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  }); 

  it("кнопка заблокирована", () => {
    const { container } = render(<Button text="Добавить" disabled={true} />);
    expect(container).toMatchSnapshot();
  });
   
  it("кнопка при загрузке", () => {
    const { container } = render(<Button isLoader={true} />);
    expect(screen.getByAltText("Загрузка.")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("клик по кнопке", () => {
    const callback = jest.fn();
    render(<Button text="Добавить" onClick={callback} />);
    fireEvent.click(screen.getByText("Добавить"));
    expect(callback).toHaveBeenCalled();
  });
  
});