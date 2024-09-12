// app/data-structures/avl-tree/page.tsx
'use client';

import Pseudocode from '../../components/Pseudocode';
const pseudocodeExample = `class Node:
    value
    left
    right
    height

class AVLTree:
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
        else:
            return node

        node.height = 1 + max(height(node.left), height(node.right))
        balance = getBalance(node)

        // Left Left Case
        if balance > 1 and value < node.left.value:
            return rightRotate(node)

        // Right Right Case
        if balance < -1 and value > node.right.value:
            return leftRotate(node)

        // Left Right Case
        if balance > 1 and value > node.left.value:
            node.left = leftRotate(node.left)
            return rightRotate(node)

        // Right Left Case
        if balance < -1 and value < node.right.value:
            node.right = rightRotate(node.right)
            return leftRotate(node)

        return node

    function rightRotate(y):
        x = y.left
        T2 = x.right
        x.right = y
        y.left = T2
        y.height = 1 + max(height(y.left), height(y.right))
        x.height = 1 + max(height(x.left), height(x.right))
        return x

    function leftRotate(x):
        y = x.right
        T2 = y.left
        y.left = x
        x.right = T2
        x.height = 1 + max(height(x.left), height(x.right))
        y.height = 1 + max(height(y.left), height(y.right))
        return y`;

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TreeNode {
  value: number;
  height: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const AVLTreeVisualization: React.FC = () => {
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const height = (node: TreeNode | null): number => {
    return node ? node.height : 0;
  };

  const updateHeight = (node: TreeNode): void => {
    node.height = 1 + Math.max(height(node.left), height(node.right));
  };

  const balanceFactor = (node: TreeNode): number => {
    return height(node.left) - height(node.right);
  };

  const rotateRight = (y: TreeNode): TreeNode => {
    const x = y.left!;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    updateHeight(y);
    updateHeight(x);

    return x;
  };

  const rotateLeft = (x: TreeNode): TreeNode => {
    const y = x.right!;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    updateHeight(x);
    updateHeight(y);

    return y;
  };

  const insertNode = (node: TreeNode | null, value: number): TreeNode => {
    if (node === null) {
      return { value, height: 1, left: null, right: null };
    }

    if (value < node.value) {
      node.left = insertNode(node.left, value);
    } else if (value > node.value) {
      node.right = insertNode(node.right, value);
    } else {
      return node; // Duplicate values are not allowed
    }

    updateHeight(node);

    const balance = balanceFactor(node);

    // Left Heavy
    if (balance > 1) {
      if (value < node.left!.value) {
        return rotateRight(node);
      } else {
        node.left = rotateLeft(node.left!);
        return rotateRight(node);
      }
    }

    // Right Heavy
    if (balance < -1) {
      if (value > node.right!.value) {
        return rotateLeft(node);
      } else {
        node.right = rotateRight(node.right!);
        return rotateLeft(node);
      }
    }

    return node;
  };

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
        <text x={x} y={y + 30} textAnchor="middle" fill="black" fontSize="12">
          BF: {balanceFactor(node)}
        </text>
      </g>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">AVL Tree</h1>
      
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
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">How AVL Tree Works</h2>
        <p className="text-gray-700">
          An AVL tree is a self-balancing binary search tree where the height of the left and right 
          subtrees of any node differ by at most one.
        </p>
        <p className="text-gray-700 mt-2">
          Key features:
          <ul className="list-disc list-inside mt-2">
            <li>Maintains balance factor (BF) for each node: BF = height(left subtree) - height(right subtree)</li>
            <li>If |BF| > 1 after an insertion or deletion, the tree is rebalanced using rotations</li>
            <li>Ensures O(log n) time complexity for insertion, deletion, and search operations</li>
          </ul>
        </p>
        <p className="text-gray-700 mt-2">
          Balancing operations:
          <ul className="list-disc list-inside mt-2">
            <li>Left rotation: Used when the right subtree is higher</li>
            <li>Right rotation: Used when the left subtree is higher</li>
            <li>Left-Right rotation: Combination used for specific imbalance cases</li>
            <li>Right-Left rotation: Combination used for specific imbalance cases</li>
          </ul>
        </p>
        <p className="text-gray-700 mt-2">
          AVL trees are useful in applications where frequent insertions and deletions occur, 
          and maintaining a balanced tree is crucial for performance.
        </p>
        <Pseudocode code={pseudocodeExample} />
      </div>
    </div>
  );
};

export default AVLTreeVisualization;