'use client';

import Pseudocode from '../../components/Pseudocode';
const pseudocodeExample = `class MaxHeap:
    heap

    function insert(value):
        heap.append(value)
        heapifyUp(heap.length - 1)
        visualize()

    function extractMax():
        if heap is empty:
            return null
        max = heap[0]
        lastElement = heap.pop()
        if heap is not empty:
            heap[0] = lastElement
            heapifyDown(0)
        visualize()
        return max

    function heapifyUp(index):
        while index > 0 and heap[parent(index)] < heap[index]:
            swap heap[parent(index)] and heap[index]
            index = parent(index)

    function heapifyDown(index):
        maxIndex = index
        left = leftChild(index)
        right = rightChild(index)
        if left < heap.length and heap[left] > heap[maxIndex]:
            maxIndex = left
        if right < heap.length and heap[right] > heap[maxIndex]:
            maxIndex = right
        if maxIndex != index:
            swap heap[index] and heap[maxIndex]
            heapifyDown(maxIndex)

    function parent(i): return (i - 1) / 2
    function leftChild(i): return 2 * i + 1
    function rightChild(i): return 2 * i + 2`;

import React, { useState } from 'react';
import { motion } from 'framer-motion';

class MaxHeap {
  heap: number[];

  constructor() {
    this.heap = [];
  }

  parent(i: number): number {
    return Math.floor((i - 1) / 2);
  }

  leftChild(i: number): number {
    return 2 * i + 1;
  }

  rightChild(i: number): number {
    return 2 * i + 2;
  }

  swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  insert(value: number): void {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  heapifyUp(i: number): void {
    while (i > 0 && this.heap[this.parent(i)] < this.heap[i]) {
      this.swap(i, this.parent(i));
      i = this.parent(i);
    }
  }

  extractMax(): number | undefined {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const max = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown(0);
    return max;
  }

  heapifyDown(i: number): void {
    let maxIndex = i;
    const left = this.leftChild(i);
    const right = this.rightChild(i);

    if (left < this.heap.length && this.heap[left] > this.heap[maxIndex]) {
      maxIndex = left;
    }

    if (right < this.heap.length && this.heap[right] > this.heap[maxIndex]) {
      maxIndex = right;
    }

    if (maxIndex !== i) {
      this.swap(i, maxIndex);
      this.heapifyDown(maxIndex);
    }
  }
}

const MaxHeapVisualization: React.FC = () => {
  const [heap, setHeap] = useState<MaxHeap>(new MaxHeap());
  const [inputValue, setInputValue] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const addValue = () => {
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      heap.insert(value);
      setHeap(Object.assign(Object.create(Object.getPrototypeOf(heap)), heap)); // Force re-render
      setInputValue('');
      setMessage(`Inserted ${value} into the heap`);
    } else {
      setMessage('Please enter a valid number');
    }
  };

  const extractMax = () => {
    const max = heap.extractMax();
    if (max !== undefined) {
      setHeap(Object.assign(Object.create(Object.getPrototypeOf(heap)), heap)); // Force re-render
      setMessage(`Extracted maximum value: ${max}`);
    } else {
      setMessage('Heap is empty');
    }
  };

  const renderHeap = (index: number, x: number, y: number, level: number) => {
    if (index >= heap.heap.length) return null;
  
    const radius = 20;
    const baseSpacing = 60; // Base horizontal spacing
    const verticalSpacing = 80; // Vertical spacing between levels
  
    // Dynamically calculate spacing based on the depth (level) to avoid overlap
    const horizontalSpacing = baseSpacing * Math.pow(2, 3 - level); // Adjusting multiplier based on level
  
    const leftChildX = x - horizontalSpacing; // Position left child
    const rightChildX = x + horizontalSpacing; // Position right child
    const childY = y + verticalSpacing; // Move child nodes vertically down
  
    return (
      <g key={index}>
        {/* Draw lines connecting parent to children */}
        {heap.leftChild(index) < heap.heap.length && (
          <line
            x1={x}
            y1={y}
            x2={leftChildX}
            y2={childY}
            stroke="gray"
            strokeWidth="2"
          />
        )}
        {heap.rightChild(index) < heap.heap.length && (
          <line
            x1={x}
            y1={y}
            x2={rightChildX}
            y2={childY}
            stroke="gray"
            strokeWidth="2"
          />
        )}
  
        {/* Draw the current node */}
        <motion.circle
          cx={x}
          cy={y}
          r={radius}
          fill="blue"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
        <text x={x} y={y} textAnchor="middle" dy=".3em" fill="white">
          {heap.heap[index]}
        </text>
  
        {/* Recursively render children */}
        {renderHeap(heap.leftChild(index), leftChildX, childY, level + 1)}
        {renderHeap(heap.rightChild(index), rightChildX, childY, level + 1)}
      </g>
    );
  };
  
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Max Heap</h1>
      
      <div className="mb-8">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter value"
          className="border p-2 mr-2"
        />
        <button onClick={addValue} className="btn-primary mr-2">Insert</button>
        <button onClick={extractMax} className="btn-secondary">Extract Max</button>
      </div>

      <div className="mb-8">
        <svg width="800" height="400" viewBox="0 0 800 400">
          <g transform="translate(400, 40)">
            {renderHeap(0, 0, 0, 1)}
          </g>
        </svg>
      </div>

      {message && (
        <div className="mb-8 text-green-600 font-semibold">{message}</div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">How Max Heap Works</h2>
        <p className="text-gray-700">
          A Max Heap is a complete binary tree where the parent node is always larger than or equal to its children. 
          The root of the tree is always the maximum element in the heap.
        </p>
        <p className="text-gray-700 mt-2">
          Key operations:
          <ul className="list-disc list-inside mt-2">
            <li>Insert: O(log n) - Add an element to the end and bubble up</li>
            <li>Extract Max: O(log n) - Remove the root, replace with last element, and bubble down</li>
            <li>Peek Max: O(1) - Return the root element without removing it</li>
          </ul>
        </p>
        <p className="text-gray-700 mt-2">
          Max Heaps are commonly used in heap sort, finding the k largest elements, and in certain priority queue applications 
          where the highest priority element needs to be processed first.
        </p>
        <Pseudocode code={pseudocodeExample} />
      </div>
    </div>
  );
};

export default MaxHeapVisualization;
