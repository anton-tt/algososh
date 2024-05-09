import { render } from "@testing-library/react";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe("Проверка компонента Circle", function() {
  
  it("отрисовка без буквы", () => {
    const { container } = render(<Circle letter="" />);
    expect(container).toMatchSnapshot();
  });

  it("отрисовка с буквой", () => {
    const { container } = render(<Circle letter="A" />);
    expect(container).toMatchSnapshot();
  });

  it("отрисовка с head", () => {
    const { container } = render(<Circle head="head" />)
    expect(container).toMatchSnapshot();
  });

  it("отрисовка с react-элементом в head", () => {
    const { container } = render(<Circle head={<Circle isSmall={true} />} />);
    expect(container).toMatchSnapshot();
  });

  it("отрисовка с tail", () => {
    const { container } = render(<Circle tail="tail" />);
    expect(container).toMatchSnapshot();
  });

  it("отрисовка с react-элементом в tail", () => {
    const { container } = render(<Circle tail={<Circle isSmall={true} />} />);
    expect(container).toMatchSnapshot();
  });
  
  it("отрисовка с index", () => {
    const { container } = render(<Circle index={45} />);
    expect(container).toMatchSnapshot();
  });

  it("отрисовка с пропом isSmall ===  true", () => {
    const { container } = render(<Circle isSmall={true} />);
    expect(container).toMatchSnapshot();
  });

  it("отрисовка в состоянии default", () => {
    const { container } = render(<Circle state={ElementStates.Default} />);
    expect(container).toMatchSnapshot();
  });

  it("отрисовка в состоянии changing", () => {
    const { container } = render(<Circle state={ElementStates.Changing} />);
    expect(container).toMatchSnapshot();
  });

  it("отрисовка в состоянии modified", () => {
    const { container } = render(<Circle state={ElementStates.Modified} />);
    expect(container).toMatchSnapshot();
  });
  
}); 