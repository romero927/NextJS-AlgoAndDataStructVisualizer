// app/data-structures/linked-list/page.tsx
'use client';

import Pseudocode from '../../components/Pseudocode';
const pseudocodeExample = `class Node:
    value
    next

class LinkedList:
    head

    function append(value):
        newNode = new Node(value)
        if head is null:
            head = newNode
        else:
            current = head
            while current.next is not null:
                current = current.next
            current.next = newNode
        visualize()

    function prepend(value):
        newNode = new Node(value)
        newNode.next = head
        head = newNode
        visualize()

    function delete(value):
        if head is null:
            return
        if head.value == value:
            head = head.next
            visualize()
            return
        current = head
        while current.next is not null:
            if current.next.value == value:
                current.next = current.next.next
                visualize()
                return
            current = current.next`;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Node<T> {
  value: T;
  next: Node<T> | null;
}

class LinkedList<T> {
  head: Node<T> | null = null;

  append(value: T): void {
    const newNode: Node<T> = { value, next: null };
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }

  prepend(value: T): void {
    const newNode: Node<T> = { value, next: this.head };
    this.head = newNode;
  }

  delete(value: T): void {
    if (!this.head) return;
    if (this.head.value === value) {
      this.head = this.head.next;
      return;
    }
    let current = this.head;
    while (current.next) {
      if (current.next.value === value) {
        current.next = current.next.next;
        return;
      }
      current = current.next;
    }
  }

  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }
}

const LinkedListNode: React.FC<{ value: number; isLast: boolean }> = ({ value, isLast }) => (
  <>
    <motion.div
      className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
    >
      {value}
    </motion.div>
    {!isLast && (
      <motion.div
        className="w-8 h-2 bg-blue-300"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        exit={{ scaleX: 0 }}
      />
    )}
  </>
);

const LinkedListVisualization: React.FC = () => {
  const [list] = useState(() => new LinkedList<number>());
  const [, forceUpdate] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [operation, setOperation] = useState<'append' | 'prepend' | 'delete' | null>(null);

  useEffect(() => {
    // Initialize with some values
    list.append(5);
    list.append(10);
    list.append(15);
    forceUpdate({});
  }, [list]);

  const handleOperation = (op: 'append' | 'prepend' | 'delete') => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;

    setOperation(op);
    setTimeout(() => {
      switch (op) {
        case 'append':
          list.append(value);
          break;
        case 'prepend':
          list.prepend(value);
          break;
        case 'delete':
          list.delete(value);
          break;
      }
      forceUpdate({});
      setInputValue('');
      setOperation(null);
    }, 500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Linked List Visualization</h1>
      
      <div className="mb-8">
        <input 
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter value"
          className="input mr-4"
        />
        <button 
          onClick={() => handleOperation('append')}
          className="btn-primary mr-4"
        >
          Append
        </button>
        <button 
          onClick={() => handleOperation('prepend')}
          className="btn-secondary mr-4"
        >
          Prepend
        </button>
        <button 
          onClick={() => handleOperation('delete')}
          className="btn-secondary"
        >
          Delete
        </button>
      </div>

      <div className="flex items-center justify-start overflow-x-auto p-4 bg-gray-100 rounded-lg">
        <AnimatePresence>
          {list.toArray().map((value, index, array) => (
            <LinkedListNode key={`${index}-${value}`} value={value} isLast={index === array.length - 1} />
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">How Linked List Works</h2>
        <p className="text-gray-700">
          A Linked List is a linear data structure where elements are stored in nodes. Each node 
          contains a data field and a reference (or link) to the next node in the sequence. 
          Unlike arrays, linked list elements are not stored at contiguous memory locations. 
          This structure allows for efficient insertion or removal of elements from any position 
          in the sequence during iteration.

          <Pseudocode code={pseudocodeExample} />
        </p>
      </div>
    </div>
  );
};

export default LinkedListVisualization;