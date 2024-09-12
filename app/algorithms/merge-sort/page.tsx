// app/algorithms/merge-sort/page.tsx
'use client';

import Pseudocode from '../../components/Pseudocode';
const pseudocodeExample = `function mergeSort(array, left, right):
    if left < right:
        mid = (left + right) / 2
        mergeSort(array, left, mid)
        mergeSort(array, mid + 1, right)
        merge(array, left, mid, right)
        visualize(array, left, right)

function merge(array, left, mid, right):
    leftArray = array[left...mid]
    rightArray = array[mid+1...right]
    merge leftArray and rightArray into array
    visualize(array, left, right)`;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BarProps {
  value: number;
  isComparing: boolean;
  isSorted: boolean;
}

const Bar: React.FC<BarProps> = ({ value, isComparing, isSorted }) => (
  <motion.div
    className={`w-8 mx-1 rounded-t-lg ${
      isComparing ? 'bg-yellow-500' : isSorted ? 'bg-green-500' : 'bg-blue-500'
    }`}
    style={{ height: `${value * 3}px` }}
    initial={{ y: 0 }}
    animate={{ y: isComparing ? -10 : 0 }}
    transition={{ duration: 0.3 }}
  >
    <span className="text-xs text-white">{value}</span>
  </motion.div>
);

const MergeSort: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [comparing, setComparing] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState<boolean>(false);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const newArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    setComparing([]);
    setSorted([]);
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const mergeSort = async (arr: number[], left: number, right: number) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      await mergeSort(arr, left, mid);
      await mergeSort(arr, mid + 1, right);
      await merge(arr, left, mid, right);
    }
  };

  const merge = async (arr: number[], left: number, mid: number, right: number) => {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    const L = arr.slice(left, mid + 1);
    const R = arr.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
      setComparing([left + i, mid + 1 + j]);
      await sleep(100);

      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      k++;
      setArray([...arr]);
      await sleep(100);
    }

    while (i < n1) {
      arr[k] = L[i];
      i++;
      k++;
      setArray([...arr]);
      await sleep(50);
    }

    while (j < n2) {
      arr[k] = R[j];
      j++;
      k++;
      setArray([...arr]);
      await sleep(50);
    }

    setSorted(prev => [...prev, ...Array.from({ length: right - left + 1 }, (_, i) => left + i)]);
    setComparing([]);
  };

  const handleSort = async () => {
    setIsSorting(true);
    await mergeSort(array, 0, array.length - 1);
    setSorted(Array.from(Array(array.length).keys()));
    setIsSorting(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Merge Sort Visualization</h1>
      
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
            isComparing={comparing.includes(index)}
            isSorted={sorted.includes(index)}
          />
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">How Merge Sort Works</h2>
        <p className="text-gray-700">
          Merge Sort is an efficient, stable, divide-and-conquer algorithm. It works by dividing the unsorted list 
          into n sublists, each containing one element (a list of one element is considered sorted). Then, it 
          repeatedly merges sublists to produce new sorted sublists until there is only one sublist remaining. 
          This will be the sorted list.

          <Pseudocode code={pseudocodeExample} />
        </p>
      </div>
    </div>
  );
};

export default MergeSort;