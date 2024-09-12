// app/data-structures/binary-search-tree/page.tsx
'use client';

import Pseudocode from '../../components/Pseudocode';
const pseudocodeExample = `class Node:
    value
    left
    right

class BST:
    root

    function insert(value):
        root = insertRecursive(root, value)
        visualize()

    function insertRecursive(node, value):
        if node is null:
            return new Node(value)
        if value < node.value:
            node.left = insertRecursive(node.left, value)
        else if value > node.value:
            node.right = insertRecursive(node.right, value)
        return node

    function search(value):
        return searchRecursive(root, value)

    function searchRecursive(node, value):
        if node is null or node.value == value:
            return node
        if value < node.value:
            return searchRecursive(node.left, value)
        return searchRecursive(node.right, value)`;

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const BSTVisualization: React.FC = () => {
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [highlightedNode, setHighlightedNode] = useState<number | null>(null);

  const addNode = () => {
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      setRoot(insertNode(root, value));
      setInputValue('');
      setMessage(`Added node with value ${value}`);
    } else {
      setMessage('Please enter a valid number');
    }
  };

  const insertNode = (node: TreeNode | null, value: number): TreeNode => {
    if (node === null) {
      return { value, left: null, right: null };
    }

    if (value < node.value) {
      node.left = insertNode(node.left, value);
    } else if (value > node.value) {
      node.right = insertNode(node.right, value);
    }

    return node;
  };

  const searchNode = () => {
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      const result = search(root, value);
      setMessage(result ? `Found node with value ${value}` : `Node with value ${value} not found`);
    } else {
      setMessage('Please enter a valid number');
    }
  };

  const search = (node: TreeNode | null, value: number): boolean => {
    if (node === null) {
      setHighlightedNode(null);
      return false;
    }

    setHighlightedNode(node.value);

    if (value === node.value) {
      return true;
    } else if (value < node.value) {
      return search(node.left, value);
    } else {
      return search(node.right, value);
    }
  };

  const renderTree = (node: TreeNode | null, x: number, y: number, level: number) => {
    if (!node) return null;

    const spacing = 120 / (level + 1);

    return (
      <g key={`${node.value}-${x}-${y}`}>
        {node.left && (
          <>
            <line
              x1={x}
              y1={y}
              x2={x - spacing}
              y2={y + 60}
              stroke="gray"
              strokeWidth="2"
            />
            {renderTree(node.left, x - spacing, y + 60, level + 1)}
          </>
        )}
        {node.right && (
          <>
            <line
              x1={x}
              y1={y}
              x2={x + spacing}
              y2={y + 60}
              stroke="gray"
              strokeWidth="2"
            />
            {renderTree(node.right, x + spacing, y + 60, level + 1)}
          </>
        )}
        <motion.circle
          cx={x}
          cy={y}
          r="20"
          fill={highlightedNode === node.value ? 'green' : 'blue'}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
        <text x={x} y={y} textAnchor="middle" dy=".3em" fill="white">
          {node.value}
        </text>
      </g>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Binary Search Tree</h1>
      
      <div className="mb-8">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter value"
          className="border p-2 mr-2"
        />
        <button onClick={addNode} className="btn-primary mr-2">Add Node</button>
        <button onClick={searchNode} className="btn-secondary">Search Node</button>
      </div>

      <div className="mb-8">
        <svg width="800" height="400" viewBox="0 0 800 400">
          <g transform="translate(400, 40)">
            {root && renderTree(root, 0, 0, 0)}
          </g>
        </svg>
      </div>

      {message && (
        <div className="mb-8 text-green-600 font-semibold">{message}</div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">How Binary Search Tree Works</h2>
        <p className="text-gray-700">
          A Binary Search Tree (BST) is a binary tree with the following properties:
        </p>
        <ul className="list-disc list-inside mt-2 text-gray-700">
          <li>The left subtree of a node contains only nodes with keys less than the node's key</li>
          <li>The right subtree of a node contains only nodes with keys greater than the node's key</li>
          <li>Both the left and right subtrees must also be binary search trees</li>
        </ul>
        <p className="text-gray-700 mt-2">
          Key operations:
          <ul className="list-disc list-inside mt-2">
            <li>Insertion: O(log n) average case, O(n) worst case</li>
            <li>Search: O(log n) average case, O(n) worst case</li>
            <li>Deletion: O(log n) average case, O(n) worst case</li>
          </ul>
        </p>
        <p className="text-gray-700 mt-2">
          BSTs are useful for maintaining a sorted collection of elements with efficient insertion, 
          deletion, and lookup operations. However, they can become unbalanced, leading to worst-case 
          performance. Balanced variants like AVL trees and Red-Black trees address this issue.
        </p>
        <Pseudocode code={pseudocodeExample} />
      </div>
    </div>
  );
};

export default BSTVisualization;