// app/data-structures/array/page.tsx
'use client';
import Pseudocode from '../../components/Pseudocode';
const pseudocodeExample = `class Array:
    data
    size

    function get(index):
        if index < 0 or index >= size:
            return null
        return data[index]

    function set(index, value):
        if index < 0 or index >= size:
            return false
        data[index] = value
        visualize()
        return true

    function insert(index, value):
        if index < 0 or index > size:
            return false
        for i from size to index + 1:
            data[i] = data[i - 1]
        data[index] = value
        size++
        visualize()
        return true

    function remove(index):
        if index < 0 or index >= size:
            return null
        value = data[index]
        for i from index to size - 2:
            data[i] = data[i + 1]
        size--
        visualize()
        return value`;

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ArrayVisualization: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const addElement = () => {
    if (inputValue.trim() !== '') {
      setArray([...array, parseInt(inputValue)]);
      setInputValue('');
      setMessage('Element added to the end of the array.');
    }
  };

  const insertElement = () => {
    const value = parseInt(inputValue);
    const index = parseInt(inputIndex);
    if (!isNaN(value) && !isNaN(index) && index >= 0 && index <= array.length) {
      const newArray = [...array.slice(0, index), value, ...array.slice(index)];
      setArray(newArray);
      setInputValue('');
      setInputIndex('');
      setMessage(`Element ${value} inserted at index ${index}.`);
    } else {
      setMessage('Invalid input or index.');
    }
  };

  const removeElement = () => {
    const index = parseInt(inputIndex);
    if (!isNaN(index) && index >= 0 && index < array.length) {
      const newArray = array.filter((_, i) => i !== index);
      setArray(newArray);
      setInputIndex('');
      setMessage(`Element removed from index ${index}.`);
    } else {
      setMessage('Invalid index.');
    }
  };

  const updateElement = () => {
    const value = parseInt(inputValue);
    const index = parseInt(inputIndex);
    if (!isNaN(value) && !isNaN(index) && index >= 0 && index < array.length) {
      const newArray = [...array];
      newArray[index] = value;
      setArray(newArray);
      setInputValue('');
      setInputIndex('');
      setMessage(`Element at index ${index} updated to ${value}.`);
    } else {
      setMessage('Invalid input or index.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Array Data Structure</h1>
      
      <div className="mb-8">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter value"
          className="border p-2 mr-2"
        />
        <input
          type="number"
          value={inputIndex}
          onChange={(e) => setInputIndex(e.target.value)}
          placeholder="Enter index"
          className="border p-2 mr-2"
        />
        <button onClick={addElement} className="btn-primary mr-2">Add</button>
        <button onClick={insertElement} className="btn-primary mr-2">Insert</button>
        <button onClick={removeElement} className="btn-primary mr-2">Remove</button>
        <button onClick={updateElement} className="btn-primary">Update</button>
      </div>

      <div className="mb-8">
        {array.map((value, index) => (
          <motion.div
            key={index}
            className="inline-block bg-blue-500 text-white p-4 m-2 rounded"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {value}
          </motion.div>
        ))}
      </div>

      {message && (
        <div className="mb-8 text-green-600 font-semibold">{message}</div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">How Array Works</h2>
        <p className="text-gray-700">
          An array is a linear data structure that stores elements in contiguous memory locations. 
          The elements can be accessed directly by their index. Arrays in most programming languages 
          have a fixed size, but dynamic arrays (like the one simulated here) can grow or shrink as needed.
        </p>
        <p className="text-gray-700 mt-2">
          Key operations:
          <ul className="list-disc list-inside mt-2">
            <li>Add: Appends an element to the end of the array</li>
            <li>Insert: Adds an element at a specified index, shifting subsequent elements</li>
            <li>Remove: Deletes an element at a specified index, shifting subsequent elements</li>
            <li>Update: Changes the value of an element at a specified index</li>
          </ul>
        </p>
        <p className="text-gray-700 mt-2">
          Time complexities:
          <ul className="list-disc list-inside mt-2">
            <li>Access: O(1)</li>
            <li>Search: O(n)</li>
            <li>Insertion: O(n) (worst case, when inserting at the beginning)</li>
            <li>Deletion: O(n) (worst case, when deleting from the beginning)</li>
          </ul>
        </p>
        <Pseudocode code={pseudocodeExample} />
      </div>
    </div>
  );
};

export default ArrayVisualization;