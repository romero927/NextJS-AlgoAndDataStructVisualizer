// app/algorithms/binary-search/page.tsx
'use client';

import Pseudocode from '../../components/Pseudocode';
const pseudocodeExample = `function binarySearch(array, target):
    left = 0
    right = array.length - 1
    while left <= right:
        mid = (left + right) / 2
        if array[mid] == target:
            return mid
        else if array[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
        visualize(array, left, mid, right)
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

const BinarySearch: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [target, setTarget] = useState<number | null>(null);
  const [left, setLeft] = useState<number>(0);
  const [right, setRight] = useState<number>(0);
  const [mid, setMid] = useState<number>(0);
  const [found, setFound] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const newArray = Array.from({ length: 20 }, (_, i) => i * 5 + 5).sort((a, b) => a - b);
    setArray(newArray);
    setTarget(null);
    setLeft(0);
    setRight(newArray.length - 1);
    setMid(0);
    setFound(false);
    setSearching(false);
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const binarySearch = async () => {
    if (target === null) return;
    setSearching(true);
    setFound(false);
    let l = 0;
    let r = array.length - 1;
    while (l <= r) {
      const m = Math.floor((l + r) / 2);
      setLeft(l);
      setRight(r);
      setMid(m);
      await sleep(1000);

      if (array[m] === target) {
        setFound(true);
        setSearching(false);
        return;
      }
      if (array[m] < target) {
        l = m + 1;
      } else {
        r = m - 1;
      }
    }
    setSearching(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Binary Search Visualization</h1>
      
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
          onClick={binarySearch}
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
            isActive={index >= left && index <= right}
            isTarget={found && value === target}
          />
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">How Binary Search Works</h2>
        <p className="text-gray-700">
          Binary Search is an efficient algorithm for searching a sorted array by repeatedly 
          dividing the search interval in half. It works by comparing the target value to the 
          middle element of the array. If they are not equal, the half in which the target cannot 
          lie is eliminated and the search continues on the remaining half until the target is found 
          or it is clear the target is not in the array.

          <Pseudocode code={pseudocodeExample} />
        </p>
      </div>
    </div>
  );
};

export default BinarySearch;