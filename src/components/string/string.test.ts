import { ElementStates } from "../../types/element-states";
import reverseArray from "./utils";

describe("Проверка вариантов разворота строки", function() {
  const setCurrentArray = jest.fn(); 
  const setLoader = jest.fn();

  it("строка с чётным количеством элементов", async () => {
    const array = [
      {value: "п",
      state: ElementStates.Default}, 
      {value: "о",
      state: ElementStates.Default},
      {value: "л",
      state: ElementStates.Default},
      {value: "к",
      state: ElementStates.Default},       
    ];
    const newArray = [
      {value: "к",
      state: ElementStates.Modified}, 
      {value: "л",
      state: ElementStates.Modified},
      {value: "о",
      state: ElementStates.Modified},
      {value: "п",
      state: ElementStates.Modified},       
    ];
    await reverseArray(array, setCurrentArray, setLoader);
    expect(setCurrentArray).toHaveBeenCalledWith(newArray);
  });

  it("строка с нечётным количеством элементов", async () => {
    const array = [
        {value: "к",
        state: ElementStates.Default}, 
        {value: "о",
        state: ElementStates.Default},
        {value: "т",
        state: ElementStates.Default}       
    ];
    const newArray = [
      {value: "т",
      state: ElementStates.Modified}, 
      {value: "о",
      state: ElementStates.Modified},
      {value: "к",
      state: ElementStates.Modified}      
    ];
    await reverseArray(array, setCurrentArray, setLoader);
    expect(setCurrentArray).toHaveBeenCalledWith(newArray);
  });

  it("строка с одним элементом", async () => {
    const array = [
        {value: "а",
        state: ElementStates.Default}      
    ];
    await reverseArray(array, setCurrentArray, setLoader);
    expect(setCurrentArray).toHaveBeenCalledWith(array);
  });

  it("строка пустая", async () => {
    const array = [
        {value: "",
        state: ElementStates.Default}      
    ];
      await reverseArray(array, setCurrentArray, setLoader);
      expect(setCurrentArray).toHaveBeenCalledWith(array);
  });

});