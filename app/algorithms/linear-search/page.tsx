// app/algorithms/linear-search/page.tsx
'use client';

import Pseudocode from '../../components/Pseudocode';
const pseudocodeExample = `function linearSearch(array, target):
    for i from 0 to array.length - 1:
        if array[i] == target:
            return i
        visualize(array, i)
    return -1`;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BarProps {
  value: number;
  isActive: boolean;
  isTarget: boolean;
}

const Bar: React.FC<BarProps> = ({ value, isActive, isTarget }) => (
  <motion.div
    className={`w-8 mx-1 rounded-t-lg ${
      isTarget ? 'bg-green-500' : isActive ? 'bg-yellow-500' : 'bg-blue-500'
    }`}
    style={{ height: `${value * 3}px` }}
    initial={{ y: 0 }}
    animate={{ y: isActive ? -10 : 0 }}
    transition={{ duration: 0.3 }}
  >
    <span className="text-xs text-white">{value}</span>
  </motion.div>
);

const LinearSearch: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [target, setTarget] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [found, setFound] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const newArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    setTarget(null);
    setCurrentIndex(-1);
    setFound(false);
    setSearching(false);
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const linearSearch = async () => {
    if (target === null) return;
    setSearching(true);
    setFound(false);
    for (let i = 0; i < array.length; i++) {
      setCurrentIndex(i);
      await sleep(500);
      if (array[i] === target) {
        setFound(true);
        setSearching(false);
        return;
      }
    }
    setSearching(false);
    setCurrentIndex(-1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Linear Search Visualization</h1>
      
      <div className="mb-8">
        <button 
          onClick={resetArray}
          disabled={searching}
          className="btn-primary mr-4"
        >
          Reset Array
        </button>
        <input 
          type="number"
          value={target || ''}
          onChange={(e) => setTarget(Number(e.target.value))}
          placeholder="Enter target"
          className="border p-2 mr-4"
        />
        <button 
          onClick={linearSearch}
          disabled={searching || target === null}
          className="btn-secondary"
        >
          Search
        </button>
      </div>

      <div className="flex items-end justify-center h-80 border-b border-gray-300">
        {array.map((value, index) => (
          <Bar
            key={index}
            value={value}
            isActive={index === currentIndex}
            isTarget={found && value === target}
          />
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">How Linear Search Works</h2>
        <p className="text-gray-700">
          Linear Search is the simplest search algorithm. It sequentially checks each element 
          of the list until a match is found or the whole list has been searched. While it`&apos;`s 
          not the most efficient for large datasets, it`&apos;`s easy to implement and works on unsorted lists.

          <Pseudocode code={pseudocodeExample} />
        </p>
      </div>
    </div>
  );
};

export default LinearSearch;