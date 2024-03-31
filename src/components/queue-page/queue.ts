interface IQueue<T> {
  getElements: () => (T | null | undefined)[];
  isEmpty: () => boolean;
  enqueue: (item: T) => void;
  dequeue: (size: number) => void; 
  clear: (size: number) => void;  
  getHead: () => T | null | undefined;
  getTail: () => T | null | undefined;  
}
  
export default class Queue<T> implements IQueue<T> {
  private container: (T | null | undefined)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;
  
  constructor(size: number) {
    this.size = size;
    this.container = Array(size).fill(undefined);
  }
  
  getElements = () => [...this.container];;

  isEmpty = () => this.length === 0;

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    if (this.isEmpty()) {
      this.container[0] = item;
      this.length++;
    } else {
      this.tail++;
      this.container[this.tail] = item;
      this.length++; 
    }  
  };
  
  dequeue = (size: number) => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    this.container[this.head] = undefined;
    this.length--;
    if (this.head < this.tail) {
      this.head++;
    } else {
      this.clear(size);
    }
  };

  clear = (size: number) => {
    this.container = Array(size).fill(undefined);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  };   
    
  getHead = () => {  
    return this.container[this.head];
  };

  getTail = () => {
    return this.container[this.tail];
  };

};