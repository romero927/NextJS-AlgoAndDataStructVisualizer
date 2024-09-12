// app/algorithms/bubble-sort/page.tsx
'use client';

import Pseudocode from '../../components/Pseudocode';
const pseudocodeExample = `function bubbleSort(array):
for i from 0 to array.length - 1:
    for j from 0 to array.length - i - 1:
        if array[j] > array[j+1]:
            swap array[j] and array[j+1]
        visualize(array, j, j+1)
return array
`;

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface BarProps {
  value: number;
  index: number;
  isSwapping: boolean;
  isSorted: boolean;
}

const Bar: React.FC<BarProps> = ({ value, isSwapping, isSorted }) => (
  <motion.div
    className={`w-8 mx-1 rounded-t-lg ${
      isSwapping ? 'bg-yellow-500' : isSorted ? 'bg-green-500' : 'bg-blue-500'
    }`}
    style={{ height: `${value * 3}px` }}
    initial={{ y: 0 }}
    animate={{ y: isSwapping ? -10 : 0 }}
    transition={{ duration: 0.3 }}
  >
    <span className="text-xs text-white">{value}</span>
  </motion.div>
);

const BubbleSort: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [sorting, setSorting] = useState<boolean>(false);
  const [sorted, setSorted] = useState<boolean>(false);
  const [currentSwap, setCurrentSwap] = useState<number[]>([-1, -1]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);

  const resetArray = useCallback(() => {
    const newArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    setSorted(false);
    setSortedIndices([]);
    setCurrentSwap([-1, -1]);
  }, []);

  useEffect(() => {
    resetArray();
  }, [resetArray]);

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    setSorting(true);
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setCurrentSwap([j, j + 1]);
        await sleep(100);

        if (arr[j] > arr[j + 1]) {
          // Swap elements
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await sleep(100);
        }
        setCurrentSwap([-1, -1]);
      }
      setSortedIndices(prev => [...prev, n - i - 1]);
    }

    setSortedIndices(Array.from(Array(n).keys()));
    setSorted(true);
    setSorting(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Bubble Sort Visualization</h1>
      
      <div className="mb-8">
        <button 
          onClick={resetArray}
          disabled={sorting}
          className="btn-primary mr-4"
        >
          Reset Array
        </button>
        <button 
          onClick={bubbleSort}
          disabled={sorting || sorted}
          className="btn-secondary"
        >
          Sort
        </button>
      </div>

      <div className="flex items-end justify-center h-80 border-b border-gray-300">
        {array.map((value, index) => (
          <Bar
            key={index}
            value={value}
            index={index}
            isSwapping={currentSwap.includes(index)}
            isSorted={sortedIndices.includes(index)}
          />
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">How Bubble Sort Works</h2>
        <p className="text-gray-700">
          Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, 
          compares adjacent elements and swaps them if they are in the wrong order. The pass through 
          the list is repeated until the list is sorted. The algorithm gets its name from the way 
          smaller elements `&ldquo;`bubble`&ldquo;` to the top of the list with each iteration.

          <Pseudocode code={pseudocodeExample} />
        </p>
      </div>
    </div>
  );
};

export default BubbleSort;