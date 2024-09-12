// app/data-structures/queue/page.tsx
'use client';

import Pseudocode from '../../components/Pseudocode';
const pseudocodeExample = `class Queue:
    items

    function enqueue(element):
        items.append(element)
        visualize()

    function dequeue():
        if isEmpty():
            return null
        element = items.removeFirst()
        visualize()
        return element

    function front():
        if isEmpty():
            return null
        return items[0]

    function isEmpty():
        return items.length == 0`;

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const QueueVisualization: React.FC = () => {
  const [queue, setQueue] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const enqueue = () => {
    if (inputValue.trim() !== '') {
      setQueue([...queue, parseInt(inputValue)]);
      setInputValue('');
      setMessage(`Enqueued ${inputValue} to the queue.`);
    }
  };

  const dequeue = () => {
    if (queue.length > 0) {
      const dequeuedValue = queue[0];
      setQueue(queue.slice(1));
      setMessage(`Dequeued ${dequeuedValue} from the queue.`);
    } else {
      setMessage('Queue is empty. Cannot dequeue.');
    }
  };

  const peek = () => {
    if (queue.length > 0) {
      setMessage(`Front element is ${queue[0]}.`);
    } else {
      setMessage('Queue is empty. Cannot peek.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Queue Data Structure</h1>
      
      <div className="mb-8">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter value"
          className="border p-2 mr-2"
        />
        <button onClick={enqueue} className="btn-primary mr-2">Enqueue</button>
        <button onClick={dequeue} className="btn-primary mr-2">Dequeue</button>
        <button onClick={peek} className="btn-primary">Peek</button>
      </div>

      <div className="mb-8 flex items-center justify-start overflow-x-auto">
        {queue.map((value, index) => (
          <motion.div
            key={index}
            className="bg-blue-500 text-white p-4 m-1 min-w-[80px] text-center rounded flex-shrink-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
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
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">How Queue Works</h2>
        <p className="text-gray-700">
          A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle. 
          Elements are added to one end (rear) and removed from the other end (front) of the queue.
        </p>
        <p className="text-gray-700 mt-2">
          Key operations:
          <ul className="list-disc list-inside mt-2">
            <li>Enqueue: Adds an element to the rear of the queue</li>
            <li>Dequeue: Removes and returns the element from the front of the queue</li>
            <li>Peek: Returns the front element without removing it</li>
          </ul>
        </p>
        <p className="text-gray-700 mt-2">
          Time complexities:
          <ul className="list-disc list-inside mt-2">
            <li>Enqueue: O(1)</li>
            <li>Dequeue: O(1)</li>
            <li>Peek: O(1)</li>
          </ul>
        </p>
        <p className="text-gray-700 mt-2">
          Queues are used in many applications, including task scheduling in operating systems, 
          breadth-first search in graph algorithms, and handling requests in web servers.
        </p>
        <Pseudocode code={pseudocodeExample} />
      </div>
    </div>
  );
};

export default QueueVisualization;