// app/data-structures/binary-tree/page.tsx
'use client';

import Pseudocode from '../../components/Pseudocode';
const pseudocodeExample = `class Node:
    value
    left
    right

class BinaryTree:
    root

    function insert(value):
        if root is null:
            root = new Node(value)
        else:
            insertRecursive(root, value)
        visualize()

    function insertRecursive(node, value):
        if node is null:
            return new Node(value)
        if random() < 0.5:
            node.left = insertRecursive(node.left, value)
        else:
            node.right = insertRecursive(node.right, value)
        return node`;

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const BinaryTreeVisualization: React.FC = () => {
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [message, setMessage] = useState<string>('');

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

    if (Math.random() < 0.5) {
      node.left = insertNode(node.left, value);
    } else {
      node.right = insertNode(node.right, value);
    }

    return node;
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
          fill="blue"
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
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Binary Tree</h1>
      
      <div className="mb-8">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter value"
          className="border p-2 mr-2"
        />
        <button onClick={addNode} className="btn-primary">Add Node</button>
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
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">How Binary Tree Works</h2>
        <p className="text-gray-700">
          A Binary Tree is a tree data structure in which each node has at most two children, 
          referred to as the left child and the right child.
        </p>
        <p className="text-gray-700 mt-2">
          Key characteristics:
          <ul className="list-disc list-inside mt-2">
            <li>Each node has at most two children</li>
            <li>There is no specific ordering between nodes</li>
            <li>It can be used to represent hierarchical structures</li>
          </ul>
        </p>
        <p className="text-gray-700 mt-2">
          In this visualization, nodes are added randomly to either the left or right child 
          of an existing node. This is different from a Binary Search Tree, where the position 
          of a new node is determined by its value.
        </p>
        <Pseudocode code={pseudocodeExample} />
      </div>
    </div>
  );
};

export default BinaryTreeVisualization;