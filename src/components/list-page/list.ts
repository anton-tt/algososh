export class Node<T> {
  value: T
  next: Node<T> | null
  
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
};
  
interface ILinkedList<T> {
  prepend: (element: T) => void;
  getHeadValue: () => T | undefined;
  append: (element: T) => void;
  getTailValue: () => T | undefined;
  deleteHead: () => void;
  deleteTail: () => void;
  addByIndex: (element: T, index: number)  => void;
  deleteByIndex: (index: number)  => void;
  toArray: () => Array<T>;
  getSize: () => number;
};
  
export default class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;
  
  constructor(elements: Array<T>) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    elements.forEach(element => this.append(element));
  };
  
  prepend(element: T) {
    const node = new Node(element, this.head);
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
    this.size++;
  };

  getHeadValue() {
    return this.head?.value;
  };

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
  };

  getTailValue() {
    return this.tail?.value;
  };

  deleteHead() {
    if (this.head) {
      if (this.head.next) {
        this.head = this.head.next;
      } else {
        this.head = null;
        this.tail = null;
      }
      this.size--;
    }
  };

  deleteTail() {
    if (this.tail) {
      if (this.tail === this.head) {
        this.head = null;
        this.tail = null;
      } else {
        let node = this.head;
        while(node?.next) {
          if (node.next.next) {
            node = node.next
          } else {
            node.next = null;
            this.tail = node;  
          }
        }
      }  
      this.size--;
    }
  };

  addByIndex(element: T, index: number) {
    if (index < 0 || index > this.getSize()) {
      throw new Error("Задан индекс несуществующего элемента");
    } else if (index === 0) {
      this.prepend(element);
    } else {
      const newNode = new Node(element);
      let node = this.head;
      let prevNode = null;
      let currentIndex = 0;
      while (currentIndex < index) {
        currentIndex++;
        prevNode = node;
        prevNode?.next && (node = prevNode.next);
      }
      prevNode && (prevNode.next = newNode);
      newNode.next = node;
    }
    this.size++;
  };

  deleteByIndex(index: number) {
    if (index < 0 || index > this.getSize()) {
      throw new Error("Задан индекс несуществующего элемента");
    } else if (index === 0) {
      this.deleteHead();
    } else if (index === this.getSize()) {
      this.deleteTail();
    } else {
      let currentIndex = 0;
      let node = this.head;
      let prevNode = null;
      let nextNode = null;
      while (currentIndex < index) {
        currentIndex++;
        prevNode = node;
        prevNode?.next && (node = prevNode.next);
        node?.next && (nextNode = node.next);
      }
      prevNode && (prevNode.next = nextNode);
      node = null;
    }
    this.size--;
  };

  toArray = () => {
    let arr = [];
    let currentElement = this.head;
    while(currentElement) {
      arr.push(currentElement.value);
      currentElement = currentElement.next;
    }
    return arr;
  };
  
  getSize() {
    return this.size;
  };

}