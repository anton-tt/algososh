interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
  clear: () => void;
}
  
export default class Stack<T> implements IStack<T> {
  private container: T[] = [];
  
  push = (item: T): void => {
    this.container.push(item);
  };
  
  pop = (): void => {
    this.container.pop();
  };
  
  peak = (): T | null => {
    if (this.container.length > 0) {
      return this.container[this.container.length - 1];
    } else {
      return null;
    }  
  };
  
  getSize = () => this.container.length;

  getElements = () => [...this.container];

  clear = () => this.container.length && (this.container = []);

}