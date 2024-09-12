// app/algorithms/fibonacci/page.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Fibonacci: React.FC = () => {
  const [n, setN] = useState<number>(10);
  const [fibSequence, setFibSequence] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState(false);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const calculateFibonacci = async () => {
    setIsRunning(true);
    const sequence: number[] = [0, 1];
    setFibSequence([...sequence]);
    setCurrentIndex(1);
    await sleep(1000);

    for (let i = 2; i <= n; i++) {
      sequence[i] = sequence[i - 1] + sequence[i - 2];
      setFibSequence([...sequence]);
      setCurrentIndex(i);
      await sleep(500);
    }

    setCurrentIndex(-1);
    setIsRunning(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Fibonacci Sequence (Dynamic Programming)</h1>
      
      <div className="mb-8">
        <input
          type="number"
          value={n}
          onChange={(e) => setN(Math.max(2, Math.min(30, parseInt(e.target.value) || 2)))}
          className="border p-2 mr-4"
          min="2"
          max="30"
        />
        <button 
          onClick={calculateFibonacci}
          disabled={isRunning}
          className="btn-primary"
        >
          Calculate Fibonacci
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {fibSequence.map((num, index) => (
          <motion.div
            key={index}
            className={`w-16 h-16 flex items-center justify-center rounded-lg text-white font-bold ${
              index === currentIndex ? 'bg-yellow-500' : 'bg-blue-500'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {num}
          </motion.div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">How Fibonacci with Dynamic Programming Works</h2>
        <p className="text-gray-700">
          The Fibonacci sequence is defined as follows: the first two numbers are 0 and 1, and each subsequent 
          number is the sum of the two preceding ones. Dynamic programming optimizes this calculation by storing 
          previously computed values, allowing us to calculate the nth Fibonacci number in O(n) time complexity.
        </p>
        <p className="text-gray-700 mt-2">
          The algorithm:
          <ol className="list-decimal list-inside mt-2">
            <li>Initialize an array with the first two Fibonacci numbers: [0, 1]</li>
            <li>For each subsequent position i, calculate F[i] = F[i-1] + F[i-2]</li>
            <li>Continue until we've calculated the nth number</li>
          </ol>
        </p>
        <p className="text-gray-700 mt-2">
          This approach is much more efficient than the recursive method, especially for larger values of n.
        </p>
      </div>
    </div>
  );
};

export default Fibonacci;