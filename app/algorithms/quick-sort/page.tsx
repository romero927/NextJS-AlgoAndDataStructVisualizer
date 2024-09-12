// app/algorithms/quick-sort/page.tsx
'use client';
import Pseudocode from '../../components/Pseudocode';
const pseudocodeExample = `function quickSort(array, low, high):
    if low < high:
        pivotIndex = partition(array, low, high)
        quickSort(array, low, pivotIndex - 1)
        quickSort(array, pivotIndex + 1, high)
        visualize(array, low, high, pivotIndex)

function partition(array, low, high):
    pivot = array[high]
    i = low - 1
    for j from low to high - 1:
        if array[j] < pivot:
            i++
            swap array[i] and array[j]
    swap array[i + 1] and array[high]
    return i + 1`;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BarProps {
  value: number;
  isPivot: boolean;
  isSwapping: boolean;
  isSorted: boolean;
}

const Bar: React.FC<BarProps> = ({ value, isPivot, isSwapping, isSorted }) => (
  <motion.div
    className={`w-8 mx-1 rounded-t-lg ${
      isPivot ? 'bg-red-500' : isSwapping ? 'bg-yellow-500' : isSorted ? 'bg-green-500' : 'bg-blue-500'
    }`}
    style={{ height: `${value * 3}px` }}
    initial={{ y: 0 }}
    animate={{ y: isSwapping ? -10 : 0 }}
    transition={{ duration: 0.3 }}
  >
    <span className="text-xs text-white">{value}</span>
  </motion.div>
);

const QuickSort: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [pivot, setPivot] = useState<number>(-1);
  const [swapping, setSwapping] = useState<number[]>([-1, -1]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState<boolean>(false);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const newArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    setPivot(-1);
    setSwapping([-1, -1]);
    setSorted([]);
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const quickSort = async (arr: number[], low: number, high: number) => {
    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }
    return arr;
  };

  const partition = async (arr: number[], low: number, high: number) => {
    const pivot = arr[high];
    setPivot(high);
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        setSwapping([i, j]);
        await sleep(100);
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await sleep(100);
        setSwapping([-1, -1]);
      }
    }

    setSwapping([i + 1, high]);
    await sleep(100);
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    await sleep(100);
    setSwapping([-1, -1]);
    setPivot(-1);

    return i + 1;
  };

  const handleSort = async () => {
    setIsSorting(true);
    await quickSort(array, 0, array.length - 1);
    setSorted(Array.from(Array(array.length).keys()));
    setIsSorting(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Quick Sort Visualization</h1>
      
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
            isPivot={index === pivot}
            isSwapping={swapping.includes(index)}
            isSorted={sorted.includes(index)}
          />
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">How Quick Sort Works</h2>
        <p className="text-gray-700">
          Quick Sort is a divide-and-conquer algorithm. It works by selecting a `&lsquo;`pivot`&lsquo;` element from the array 
          and partitioning the other elements into two sub-arrays, according to whether they are less than or 
          greater than the pivot. The sub-arrays are then sorted recursively. This process continues until the 
          entire array is sorted.

          <Pseudocode code={pseudocodeExample} />
        </p>
      </div>
    </div>
  );
};

export default QuickSort;