// app/data-structures/stack/page.tsx
'use client';
import Pseudocode from '../../components/Pseudocode';
const pseudocodeExample = `class Stack:
    items

    function push(element):
        items.append(element)
        visualize()

    function pop():
        if isEmpty():
            return null
        element = items.pop()
        visualize()
        return element

    function peek():
        if isEmpty():
            return null
        return items[items.length - 1]

    function isEmpty():
        return items.length == 0`;

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const StackVisualization: React.FC = () => {
  const [stack, setStack] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const push = () => {
    if (inputValue.trim() !== '') {
      setStack([parseInt(inputValue), ...stack]);
      setInputValue('');
      setMessage(`Pushed ${inputValue} onto the stack.`);
    }
  };

  const pop = () => {
    if (stack.length > 0) {
      const poppedValue = stack[0];
      setStack(stack.slice(1));
      setMessage(`Popped ${poppedValue} from the stack.`);
    } else {
      setMessage('Stack is empty. Cannot pop.');
    }
  };

  const peek = () => {
    if (stack.length > 0) {
      setMessage(`Top element is ${stack[0]}.`);
    } else {
      setMessage('Stack is empty. Cannot peek.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Stack Data Structure</h1>
      
      <div className="mb-8">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter value"
          className="border p-2 mr-2"
        />
        <button onClick={push} className="btn-primary mr-2">Push</button>
        <button onClick={pop} className="btn-primary mr-2">Pop</button>
        <button onClick={peek} className="btn-primary">Peek</button>
      </div>

      <div className="mb-8 flex flex-col items-center">
        {stack.map((value, index) => (
          <motion.div
            key={index}
            className="bg-blue-500 text-white p-4 m-1 w-32 text-center rounded"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {value}
          </motion.div>
        ))}
        <div className="border-b-4 border-gray-500 w-40 mt-2"></div>
      </div>

      {message && (
        <div className="mb-8 text-green-600 font-semibold">{message}</div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">How Stack Works</h2>
        <p className="text-gray-700">
          A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle. 
          Elements are added to and removed from the same end, called the top of the stack.
        </p>
        <p className="text-gray-700 mt-2">
          Key operations:
          <ul className="list-disc list-inside mt-2">
            <li>Push: Adds an element to the top of the stack</li>
            <li>Pop: Removes and returns the top element from the stack</li>
            <li>Peek: Returns the top element without removing it</li>
          </ul>
        </p>
        <p className="text-gray-700 mt-2">
          Time complexities:
          <ul className="list-disc list-inside mt-2">
            <li>Push: O(1)</li>
            <li>Pop: O(1)</li>
            <li>Peek: O(1)</li>
          </ul>
        </p>
        <p className="text-gray-700 mt-2">
          Stacks are used in many applications, including function call management in programming 
          languages, undo mechanisms in text editors, and in algorithms like depth-first search.
        </p>
        <Pseudocode code={pseudocodeExample} />
      </div>
    </div>
  );
};

export default StackVisualization;