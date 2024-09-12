// app/algorithms/insertion-sort/page.tsx
'use client';

import Pseudocode from '../../components/Pseudocode';
const pseudocodeExample = `function insertionSort(array):
    for i from 1 to array.length - 1:
        key = array[i]
        j = i - 1
        while j >= 0 and array[j] > key:
            array[j + 1] = array[j]
            j--
        array[j + 1] = key
        visualize(array, i, j + 1)`;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BarProps {
  value: number;
  isActive: boolean;
  isSorted: boolean;
}

const Bar: React.FC<BarProps> = ({ value, isActive, isSorted }) => (
  <motion.div
    className={`w-8 mx-1 rounded-t-lg ${
      isActive ? 'bg-yellow-500' : isSorted ? 'bg-green-500' : 'bg-blue-500'
    }`}
    style={{ height: `${value * 3}px` }}
    initial={{ y: 0 }}
    animate={{ y: isActive ? -10 : 0 }}
    transition={{ duration: 0.3 }}
  >
    <span className="text-xs text-white">{value}</span>
  </motion.div>
);

const InsertionSort: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState<boolean>(false);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const newArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    setActiveIndex(-1);
    setSortedIndices([]);
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const insertionSort = async () => {
    const arr = [...array];
    const n = arr.length;
    setSortedIndices([0]);

    for (let i = 1; i < n; i++) {
      setActiveIndex(i);
      await sleep(500);
      const key = arr[i];
      let j = i - 1;

      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        setArray([...arr]);
        await sleep(100);
        j = j - 1;
      }
      arr[j + 1] = key;
      setArray([...arr]);
      setSortedIndices(prev => [...prev, i]);
      await sleep(300);
    }

    setActiveIndex(-1);
  };

  const handleSort = async () => {
    setIsSorting(true);
    await insertionSort();
    setIsSorting(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Insertion Sort Visualization</h1>
      
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
            isActive={index === activeIndex}
            isSorted={sortedIndices.includes(index)}
          />
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">How Insertion Sort Works</h2>
        <p className="text-gray-700">
          Insertion sort iterates through an array and grows a sorted array behind it. On each iteration, 
          insertion sort removes one element from the unsorted list, finds the location it belongs within 
          the sorted list, and inserts it there. It repeats until no unsorted elements remain.

          <Pseudocode code={pseudocodeExample} />
        </p>
      </div>
    </div>
  );
};

export default InsertionSort;