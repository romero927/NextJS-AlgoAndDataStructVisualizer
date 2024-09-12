// app/algorithms/selection-sort/page.tsx
'use client';

import Pseudocode from '../../components/Pseudocode';
const pseudocodeExample = `function selectionSort(array):
    for i from 0 to array.length - 1:
        minIndex = i
        for j from i + 1 to array.length - 1:
            if array[j] < array[minIndex]:
                minIndex = j
        swap array[i] and array[minIndex]
        visualize(array, i, minIndex)`;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BarProps {
  value: number;
  isMinimum: boolean;
  isComparing: boolean;
  isSorted: boolean;
}

const Bar: React.FC<BarProps> = ({ value, isMinimum, isComparing, isSorted }) => (
  <motion.div
    className={`w-8 mx-1 rounded-t-lg ${
      isMinimum ? 'bg-red-500' : isComparing ? 'bg-yellow-500' : isSorted ? 'bg-green-500' : 'bg-blue-500'
    }`}
    style={{ height: `${value * 3}px` }}
    initial={{ y: 0 }}
    animate={{ y: isComparing ? -10 : 0 }}
    transition={{ duration: 0.3 }}
  >
    <span className="text-xs text-white">{value}</span>
  </motion.div>
);

const SelectionSort: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [minIndex, setMinIndex] = useState<number>(-1);
  const [comparingIndex, setComparingIndex] = useState<number>(-1);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState<boolean>(false);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const newArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    setCurrentIndex(-1);
    setMinIndex(-1);
    setComparingIndex(-1);
    setSortedIndices([]);
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const selectionSort = async () => {
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      setCurrentIndex(i);
      let min = i;
      setMinIndex(min);
      await sleep(500);

      for (let j = i + 1; j < n; j++) {
        setComparingIndex(j);
        await sleep(100);

        if (arr[j] < arr[min]) {
          min = j;
          setMinIndex(min);
          await sleep(300);
        }
      }

      if (min !== i) {
        [arr[i], arr[min]] = [arr[min], arr[i]];
        setArray([...arr]);
        await sleep(500);
      }

      setSortedIndices(prev => [...prev, i]);
    }

    setSortedIndices(prev => [...prev, n - 1]);
    setCurrentIndex(-1);
    setMinIndex(-1);
    setComparingIndex(-1);
  };

  const handleSort = async () => {
    setIsSorting(true);
    await selectionSort();
    setIsSorting(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Selection Sort Visualization</h1>
      
      <div className="mb-8">
        <button 
          onClick={resetArray}
          disabled={isSorting}
          className="btn-primary mr-4"
        >
          Reset Array
        </button>
        <button 
          onClick={handleSort}
          disabled={isSorting}
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
            isMinimum={index === minIndex}
            isComparing={index === comparingIndex}
            isSorted={sortedIndices.includes(index)}
          />
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">How Selection Sort Works</h2>
        <p className="text-gray-700">
          Selection Sort divides the input list into two parts: a sorted portion at the left end and an 
          unsorted portion at the right end. Initially, the sorted portion is empty and the unsorted portion 
          is the entire list. The algorithm proceeds by finding the smallest element in the unsorted portion, 
          swapping it with the leftmost unsorted element, and moving the subset boundaries one element to the right.

          <Pseudocode code={pseudocodeExample} />
        </p>
      </div>
    </div>
  );
};

export default SelectionSort;