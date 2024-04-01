export class Node<T> {
  value: T
  next: Node<T> | null
  
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}
  
interface ILinkedList<T> {
  prepend: (element: T) => void;
  getHeadValue: () => T | undefined;
  append: (element: T) => void;
  getTailValue: () => T | undefined;
  toArray: () => Array<T>;
  getSize: () => number;
}
  
export default class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;
  
  constructor(elements: Array<T>) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    elements.forEach(element => this.append(element));
  }
  
  prepend(element: T) {
    const node = new Node(element, this.head);
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
    this.size++;
  }

  getHeadValue() {
    return this.head?.value;
  }

  append(element: T) {
    const node = new Node(element);
    if (!this.head) {
      this.head = node;
    }
    if (this.tail) {
      this.tail.next = node;
    }
    this.tail = node
    this.size++;
  }

  getTailValue() {
    return this.tail?.value;
  }

  toArray = () => {
    let arr = [];
    let currentElement = this.head;
    while(currentElement) {
      arr.push(currentElement.value);
      currentElement = currentElement.next;
    }
    return arr;
  }
  
    getSize() {
      return this.size;
    }

  }