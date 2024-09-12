// app/data-structures/arraylist/page.tsx
'use client';

import Pseudocode from '../../components/Pseudocode';
const pseudocodeExample = `class ArrayList:
    array
    size
    capacity

    function add(element):
        if size == capacity:
            resize()
        array[size] = element
        size++
        visualize()

    function remove(index):
        if index < 0 or index >= size:
            return null
        element = array[index]
        for i from index to size - 2:
            array[i] = array[i + 1]
        size--
        if size <= capacity / 4:
            resize(capacity / 2)
        visualize()
        return element

    function resize(newCapacity):
        newArray = new array of size newCapacity
        copy elements from array to newArray
        array = newArray
        capacity = newCapacity
        visualize()`;

import React, { useState } from 'react';
import { motion } from 'framer-motion';

class ArrayList<T> {
  private array: T[];
  private size: number;
  private capacity: number;

  constructor(initialCapacity: number = 10) {
    this.array = new Array(initialCapacity);
    this.size = 0;
    this.capacity = initialCapacity;
  }

  private resize(newCapacity: number): void {
    const newArray = new Array(newCapacity);
    for (let i = 0; i < this.size; i++) {
      newArray[i] = this.array[i];
    }
    this.array = newArray;
    this.capacity = newCapacity;
  }

  add(element: T): void {
    if (this.size === this.capacity) {
      this.resize(this.capacity * 2);
    }
    this.array[this.size] = element;
    this.size++;
  }

  remove(index: number): T | undefined {
    if (index < 0 || index >= this.size) {
      return undefined;
    }
    const removedElement = this.array[index];
    for (let i = index; i < this.size - 1; i++) {
      this.array[i] = this.array[i + 1];
    }
    this.size--;
    if (this.size <= this.capacity / 4 && this.capacity > 10) {
      this.resize(Math.floor(this.capacity / 2));
    }
    return removedElement;
  }

  get(index: number): T | undefined {
    if (index < 0 || index >= this.size) {
      return undefined;
    }
    return this.array[index];
  }

  getSize(): number {
    return this.size;
  }

  getCapacity(): number {
    return this.capacity;
  }

  toArray(): T[] {
    return this.array.slice(0, this.size);
  }
}

const ArrayListVisualization: React.FC = () => {
  const [arrayList] = useState<ArrayList<number>>(new ArrayList<number>());
  const [inputValue, setInputValue] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [, forceUpdate] = useState<{}>();

  const handleAdd = () => {
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      arrayList.add(value);
      setInputValue('');
      setMessage(`Added ${value} to the ArrayList`);
      forceUpdate({});
    } else {
      setMessage('Please enter a valid number');
    }
  };

  const handleRemove = () => {
    const index = parseInt(inputValue);
    if (!isNaN(index)) {
      const removed = arrayList.remove(index);
      setInputValue('');
      setMessage(removed !== undefined ? `Removed ${removed} from index ${index}` : `Invalid index ${index}`);
      forceUpdate({});
    } else {
      setMessage('Please enter a valid index');
    }
  };

  const handleGet = () => {
    const index = parseInt(inputValue);
    if (!isNaN(index)) {
      const value = arrayList.get(index);
      setMessage(value !== undefined ? `Value at index ${index}: ${value}` : `Invalid index ${index}`);
    } else {
      setMessage('Please enter a valid index');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">ArrayList</h1>
      
      <div className="mb-8">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter value or index"
          className="border p-2 mr-2"
        />
        <button onClick={handleAdd} className="btn-primary mr-2">Add</button>
        <button onClick={handleRemove} className="btn-secondary mr-2">Remove</button>
        <button onClick={handleGet} className="btn-secondary">Get</button>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">ArrayList Contents:</h2>
        <div className="flex flex-wrap">
          {arrayList.toArray().map((value, index) => (
            <motion.div
              key={index}
              className="bg-blue-500 text-white p-2 m-1 rounded"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {value}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <p>Size: {arrayList.getSize()}</p>
        <p>Capacity: {arrayList.getCapacity()}</p>
      </div>

      {message && (
        <div className="mb-8 text-green-600 font-semibold">{message}</div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">How ArrayList Works</h2>
        <p className="text-gray-700">
          An ArrayList is a resizable array, which can grow and shrink dynamically. It provides 
          the benefits of an array while offering flexibility in size.
        </p>
        <p className="text-gray-700 mt-2">
          Key features:
          <ul className="list-disc list-inside mt-2">
            <li>Dynamic resizing: When the array is full, it creates a new, larger array and copies the elements</li>
            <li>Fast access: O(1) time complexity for get and set operations</li>
            <li>Efficient add to end: Amortized O(1) time complexity for adding to the end</li>
            <li>Inefficient insert/remove: O(n) time complexity for insert or remove operations not at the end</li>
          </ul>
        </p>
        <p className="text-gray-700 mt-2">
          Time complexities:
          <ul className="list-disc list-inside mt-2">
            <li>Access: O(1)</li>
            <li>Search: O(n)</li>
            <li>Insertion at end: Amortized O(1)</li>
            <li>Deletion at end: O(1)</li>
            <li>Insertion/Deletion at middle: O(n)</li>
          </ul>
        </p>
        <p className="text-gray-700 mt-2">
          ArrayLists are used when you need a dynamic size array with fast access and efficient 
          appending. They're commonly used in situations where the number of elements is unknown 
          or can change over time.
        </p>
        <Pseudocode code={pseudocodeExample} />
      </div>
    </div>
  );
};

export default ArrayListVisualization;