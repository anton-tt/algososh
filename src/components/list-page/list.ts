export class Node<T> {
  value: T
  next: Node<T> | null
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}
  
interface ILinkedList<T> {
  append: (element: T) => void;
  getSize: () => number;
  print: () => void;
}
  
export default class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  
  append(element: T) {
      const node = new Node(element);
      // ваш код
      this.size++;
  }
  
    getSize() {
      return this.size;
    }
  
    print() {
      let curr = this.head;
      let res = '';
      while (curr) {
        res += `${curr.value} `;
        curr = curr.next;
      }
      console.log(res);
    }
  }
  