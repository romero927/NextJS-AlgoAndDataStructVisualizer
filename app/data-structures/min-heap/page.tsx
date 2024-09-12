'use client';

import Pseudocode from '../../components/Pseudocode';
const pseudocodeExample = `class MinHeap:
    heap

    function insert(value):
        heap.append(value)
        heapifyUp(heap.length - 1)
        visualize()

    function extractMin():
        if heap is empty:
            return null
        min = heap[0]
        lastElement = heap.pop()
        if heap is not empty:
            heap[0] = lastElement
            heapifyDown(0)
        visualize()
        return min

    function heapifyUp(index):
        while index > 0 and heap[parent(index)] > heap[index]:
            swap heap[parent(index)] and heap[index]
            index = parent(index)

    function heapifyDown(index):
        minIndex = index
        left = leftChild(index)
        right = rightChild(index)
        if left < heap.length and heap[left] < heap[minIndex]:
            minIndex = left
        if right < heap.length and heap[right] < heap[minIndex]:
            minIndex = right
        if minIndex != index:
            swap heap[index] and heap[minIndex]
            heapifyDown(minIndex)

    function parent(i): return (i - 1) / 2
    function leftChild(i): return 2 * i + 1
    function rightChild(i): return 2 * i + 2`;

import React, { useState } from 'react';
import { motion } from 'framer-motion';

class MinHeap {
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
    while (i > 0 && this.heap[this.parent(i)] > this.heap[i]) {
      this.swap(i, this.parent(i));
      i = this.parent(i);
    }
  }

  extractMin(): number | undefined {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown(0);
    return min;
  }

  heapifyDown(i: number): void {
    let minIndex = i;
    const left = this.leftChild(i);
    const right = this.rightChild(i);

    if (left < this.heap.length && this.heap[left] < this.heap[minIndex]) {
      minIndex = left;
    }

    if (right < this.heap.length && this.heap[right] < this.heap[minIndex]) {
      minIndex = right;
    }

    if (minIndex !== i) {
      this.swap(i, minIndex);
      this.heapifyDown(minIndex);
    }
  }
}

const MinHeapVisualization: React.FC = () => {
  const [heap, setHeap] = useState<MinHeap>(new MinHeap());
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

  const extractMin = () => {
    const min = heap.extractMin();
    if (min !== undefined) {
      setHeap(Object.assign(Object.create(Object.getPrototypeOf(heap)), heap)); // Force re-render
      setMessage(`Extracted minimum value: ${min}`);
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
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Min Heap</h1>
      
      <div className="mb-8">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter value"
          className="border p-2 mr-2"
        />
        <button onClick={addValue} className="btn-primary mr-2">Insert</button>
        <button onClick={extractMin} className="btn-secondary">Extract Min</button>
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
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">How Min Heap Works</h2>
        <p className="text-gray-700">
          A Min Heap is a complete binary tree where the parent node is always smaller than or equal to its children. 
          The root of the tree is always the minimum element in the heap.
        </p>
        <p className="text-gray-700 mt-2">
          Key operations:
          <ul className="list-disc list-inside mt-2">
            <li>Insert: O(log n) - Add an element to the end and bubble up</li>
            <li>Extract Min: O(log n) - Remove the root, replace with last element, and bubble down</li>
            <li>Peek Min: O(1) - Return the root element without removing it</li>
          </ul>
        </p>
        <p className="text-gray-700 mt-2">
          Min Heaps are commonly used in priority queues, scheduling algorithms, and in algorithms like Dijkstra's 
          shortest path and Prim's minimum spanning tree.
        </p>
        <Pseudocode code={pseudocodeExample} />
      </div>
    </div>
  );
};

export default MinHeapVisualization;
