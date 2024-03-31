interface IQueue<T> {
  getElements: () => (T | null)[];
  isEmpty: () => boolean;
  enqueue: (item: T) => void;
    dequeue: () => void;
    
  clear: (size: number) => void;  
  
    getHead: () => T | null;
    getTail: () => T | null;
    
  }
  
export default class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;
  
  constructor(size: number) {
    this.size = size;
    this.container = Array(size).fill(undefined);
  }
  
  getElements = () => [...this.container];

  isEmpty = () => this.length === 0;

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this.tail % this.size] = item;
    this.tail++; 
    this.length++; 
  };
  
  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    delete this.container[this.head];
    this.head++;
    this.length--;
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

    getHeadIndex = () => { 
      if (this.isEmpty()) {
        throw new Error("No elements in the queue");
      } 
      return this.head;
    };

      getTail = () => {
        return this.container[this.tail - 1];
      };

  

}