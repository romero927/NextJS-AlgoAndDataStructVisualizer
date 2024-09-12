// app/algorithms/heap-sort/page.tsx
'use client';

import Pseudocode from '../../components/Pseudocode';
const pseudocodeExample = `function heapSort(array):
    buildMaxHeap(array)
    for i from array.length - 1 to 1:
        swap array[0] and array[i]
        heapify(array, 0, i)
        visualize(array, 0, i)

function buildMaxHeap(array):
    for i from (array.length / 2) - 1 to 0:
        heapify(array, i, array.length)

function heapify(array, i, heapSize):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    if left < heapSize and array[left] > array[largest]:
        largest = left
    if right < heapSize and array[right] > array[largest]:
        largest = right
    if largest != i:
        swap array[i] and array[largest]
        heapify(array, largest, heapSize)
    visualize(array, i, largest)`;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BarProps {
  value: number;
  isSwapping: boolean;
  isHeapifying: boolean;
  isSorted: boolean;
}

const Bar: React.FC<BarProps> = ({ value, isSwapping, isHeapifying, isSorted }) => (
  <motion.div
    className={`w-8 mx-1 rounded-t-lg ${
      isSwapping ? 'bg-red-500' : isHeapifying ? 'bg-yellow-500' : isSorted ? 'bg-green-500' : 'bg-blue-500'
    }`}
    style={{ height: `${value * 3}px` }}
    initial={{ y: 0 }}
    animate={{ y: isSwapping || isHeapifying ? -10 : 0 }}
    transition={{ duration: 0.3 }}
  >
    <span className="text-xs text-white">{value}</span>
  </motion.div>
);

const HeapSort: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [heapifying, setHeapifying] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState<boolean>(false);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const newArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    setSwapping([]);
    setHeapifying([]);
    setSorted([]);
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const heapify = async (arr: number[], n: number, i: number) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== i) {
      setHeapifying([i, largest]);
      await sleep(300);
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      setArray([...arr]);
      setHeapifying([]);
      await sleep(300);

      await heapify(arr, n, largest);
    }
  };

  const heapSort = async () => {
    const arr = [...array];
    const n = arr.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i);
    }

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
      setSwapping([0, i]);
      await sleep(300);
      [arr[0], arr[i]] = [arr[i], arr[0]];
      setArray([...arr]);
      setSwapping([]);
      setSorted(prev => [i, ...prev]);
      await sleep(300);

      await heapify(arr, i, 0);
    }

    setSorted(prev => [0, ...prev]);
  };

  const handleSort = async () => {
    setIsSorting(true);
    await heapSort();
    setIsSorting(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Heap Sort Visualization</h1>
      
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
            isSwapping={swapping.includes(index)}
            isHeapifying={heapifying.includes(index)}
            isSorted={sorted.includes(index)}
          />
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">How Heap Sort Works</h2>
        <p className="text-gray-700">
          Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. 
          It divides its input into a sorted and an unsorted region, and iteratively shrinks the 
          unsorted region by extracting the largest element and moving that to the sorted region. 
          The improvement consists of using a heap data structure rather than a linear-time search 
          to find the maximum.

          <Pseudocode code={pseudocodeExample} />
        </p>
      </div>
    </div