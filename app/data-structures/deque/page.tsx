// app/data-structures/deque/page.tsx
'use client';

import Pseudocode from '../../components/Pseudocode';
const pseudocodeExample = `class Deque:
    items

    function addFront(element):
        items.prepend(element)
        visualize()

    function addRear(element):
        items.append(element)
        visualize()

    function removeFront():
        if isEmpty():
            return null
        element = items.removeFirst()
        visualize()
        return element

    function removeRear():
        if isEmpty():
            return null
        element = items.removeLast()
        visualize()
        return element

    function isEmpty():
        return items.length == 0`;

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DequeVisualization: React.FC = () => {
  const [deque, setDeque] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const addFront = () => {
    if (inputValue.trim() !== '') {
      setDeque([parseInt(inputValue), ...deque]);
      setInputValue('');
      setMessage(`Added ${inputValue} to the front of the deque.`);
    }
  };

  const addRear = () => {
    if (inputValue.trim() !== '') {
      setDeque([...deque, parseInt(inputValue)]);
      setInputValue('');
      setMessage(`Added ${inputValue} to the rear of the deque.`);
    }
  };

  const removeFront = () => {
    if (deque.length > 0) {
      const removedValue = deque[0];
      setDeque(deque.slice(1));
      setMessage(`Removed ${removedValue} from the front of the deque.`);
    } else {
      setMessage('Deque is empty. Cannot remove from front.');
    }
  };

  const removeRear = () => {
    if (deque.length > 0) {
      const removedValue = deque[deque.length - 1];
      setDeque(deque.slice(0, -1));
      setMessage(`Removed ${removedValue} from the rear of the deque.`);
    } else {
      setMessage('Deque is empty. Cannot remove from rear.');
    }
  };

  const peekFront = () => {
    if (deque.length > 0) {
      setMessage(`Front element is ${deque[0]}.`);
    } else {
      setMessage('Deque is empty. Cannot peek front.');
    }
  };

  const peekRear = () => {
    if (deque.length > 0) {
      setMessage(`Rear element is ${deque[deque.length - 1]}.`);
    } else {
      setMessage('Deque is empty. Cannot peek rear.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Deque (Double-ended Queue) Data Structure</h1>
      
      <div className="mb-8">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter value"
          className="border p-2 mr-2"
        />
        <button onClick={addFront} className="btn-primary mr-2">Add Front</button>
        <button onClick={addRear} className="btn-primary mr-2">Add Rear</button>
        <button onClick={removeFront} className="btn-primary mr-2">Remove Front</button>
        <button onClick={removeRear} className="btn-primary mr-2">Remove Rear</button>
        <button onClick={peekFront} className="btn-primary mr-2">Peek Front</button>
        <button onClick={peekRear} className="btn-primary">Peek Rear</button>
      </div>

      <div className="mb-8 flex items-center justify-center overflow-x-auto">
        {deque.map((value, index) => (
          <motion.div
            key={index}
            className="bg-blue-500 text-white p-4 m-1 min-w-[80px] text-center rounded flex-shrink-0"
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
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">How Deque Works</h2>
        <p className="text-gray-700">
          A deque (double-ended queue) is a linear data structure that allows insertion and deletion 
          at both ends. It combines the features of both stack and queue.
        </p>
        <p className="text-gray-700 mt-2">
          Key operations:
          <ul className="list-disc list-inside mt-2">
            <li>Add Front: Adds an element to the front of the deque</li>
            <li>Add Rear: Adds an element to the rear of the deque</li>
            <li>Remove Front: Removes and returns the element from the front of the deque</li>
            <li>Remove Rear: Removes and returns the element from the rear of the deque</li>
            <li>Peek Front: Returns the front element without removing it</li>
            <li>Peek Rear: Returns the rear element without removing it</li>
          </ul>
        </p>
        <p className="text-gray-700 mt-2">
          Time complexities:
          <ul className="list-disc list-inside mt-2">
            <li>All operations: O(1)</li>
          </ul>
        </p>
        <p className="text-gray-700 mt-2">
          Deques are used in scenarios where elements need to be added or removed from either end 
          efficiently, such as in certain types of scheduling algorithms, palindrome checkers, and 
          implementing other data structures like queues and stacks.
        </p>
        <Pseudocode code={pseudocodeExample} />
      </div>
    </div>
  );
};

export default DequeVisualization;