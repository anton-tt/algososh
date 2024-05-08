import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { TNumberArrayElement } from "../../types/structure-element";
import { makeSelectionSort, makeBubbleSort } from "./utils";

jest.setTimeout(10000);

const setCurrentArray = jest.fn(); 
const setLoader = jest.fn();

const array = [
  {value: 333,
  state: ElementStates.Default}, 
  {value: 1,
  state: ElementStates.Default},
  {value: 22,
  state: ElementStates.Default}       
];
const arrayOneElement = [
  {value: 100,
  state: ElementStates.Default}       
];
const emptyArray: Array<TNumberArrayElement> = [];

const newArrayAsk = [
  {value: 1,
  state: ElementStates.Modified}, 
  {value: 22,
  state: ElementStates.Modified},
  {value: 333,
  state: ElementStates.Modified}       
];
const newArrayDesk = [
  {value: 333,
  state: ElementStates.Modified}, 
  {value: 22,
  state: ElementStates.Modified},
  {value: 1,
  state: ElementStates.Modified}       
];
const newArrayOneElement = [
  {value: 100,
  state: ElementStates.Modified}       
];

describe("Проверка вариантов сортировки массива выбором", function() {
  
  it("массив с несколькими элементами, по возрастанию", async () => {
    await makeSelectionSort(array, Direction.Ascending, setCurrentArray, setLoader);
    expect(setCurrentArray).toHaveBeenCalledWith(newArrayAsk);
  });

  it("массив с несколькими элементами, по убыванию", async () => {
    await makeSelectionSort(array, Direction.Descending, setCurrentArray, setLoader);
    expect(setCurrentArray).toHaveBeenCalledWith(newArrayDesk);
  });

  it("массив с одним элементом, по возрастанию", async () => {
    await makeSelectionSort(arrayOneElement, Direction.Ascending, setCurrentArray, setLoader);
    expect(setCurrentArray).toHaveBeenCalledWith(newArrayOneElement);
  });

  it("массив с одним элементом, по убыванию", async () => {
    await makeSelectionSort(arrayOneElement, Direction.Descending, setCurrentArray, setLoader);
    expect(setCurrentArray).toHaveBeenCalledWith(newArrayOneElement);
  });

  it("пустой массив, по возрастанию", async () => {
    await makeSelectionSort(emptyArray, Direction.Ascending, setCurrentArray, setLoader);
  });

  it("пустой массив, по убыванию", async () => {
    await makeSelectionSort(emptyArray, Direction.Descending, setCurrentArray, setLoader);
  });

});

describe("Проверка вариантов сортировки массива пузырьком", function() {
  
  it("массив с несколькими элементами, по возрастанию", async () => {
    await makeBubbleSort(array, Direction.Ascending, setCurrentArray, setLoader);
    expect(setCurrentArray).toHaveBeenCalledWith(newArrayAsk);
  });
  
  it("массив с несколькими элементами, по убыванию", async () => {
    await makeBubbleSort(array, Direction.Descending, setCurrentArray, setLoader);
    expect(setCurrentArray).toHaveBeenCalledWith(newArrayDesk);
  });
  
  it("массив с одним элементом, по возрастанию", async () => {
    await makeBubbleSort(arrayOneElement, Direction.Ascending, setCurrentArray, setLoader);
    expect(setCurrentArray).toHaveBeenCalledWith(newArrayOneElement);
  });
  
  it("массив с одним элементом, по убыванию", async () => {
    await makeBubbleSort(arrayOneElement, Direction.Descending, setCurrentArray, setLoader);
    expect(setCurrentArray).toHaveBeenCalledWith(newArrayOneElement);
  });
  
  it("пустой массив, по возрастанию", async () => {
    await makeBubbleSort(emptyArray, Direction.Ascending, setCurrentArray, setLoader);
  });
  
  it("пустой массив, по убыванию", async () => {
    await makeBubbleSort(emptyArray, Direction.Descending, setCurrentArray, setLoader);
  });
  
});