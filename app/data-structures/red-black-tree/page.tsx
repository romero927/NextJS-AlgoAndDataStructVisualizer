// app/data-structures/red-black-tree/page.tsx
'use client';

import Pseudocode from '../../components/Pseudocode';
const pseudocodeExample = `class Node:
    value
    left
    right
    color

class RedBlackTree:
    root

    function insert(value):
        root = insertRecursive(root, value)
        root.color = BLACK
        visualize()

    function insertRecursive(node, value):
        if node is null:
            return new Node(value, RED)
        if value < node.value:
            node.left = insertRecursive(node.left, value)
        else if value > node.value:
            node.right = insertRecursive(node.right, value)
        else:
            return node

        if isRed(node.right) and !isRed(node.left):
            node = rotateLeft(node)
        if isRed(node.left) and isRed(node.left.left):
            node = rotateRight(node)
        if isRed(node.left) and isRed(node.right):
            flipColors(node)

        return node

    function rotateLeft(node):
        x = node.right
        node.right = x.left
        x.left = node
        x.color = node.color
        node.color = RED
        return x

    function rotateRight(node):
        x = node.left
        node.left = x.right
        x.right = node
        x.color = node.color
        node.color = RED
        return x

    function flipColors(node):
        node.color = RED
        node.left.color = BLACK
        node.right.color = BLACK`;

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TreeNode {
  value: number;
  color: 'red' | 'black';
  left: TreeNode | null;
  right: TreeNode | null;
  parent: TreeNode | null;
}

const RedBlackTreeVisualization: React.FC = () => {
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const createNode = (value: number): TreeNode => ({
    value,
    color: 'red',
    left: null,
    right: null,
    parent: null,
  });

  const rotateLeft = (node: TreeNode): void => {
    const rightChild = node.right!;
    node.right = rightChild.left;
    
    if (rightChild.left !== null) {
      rightChild.left.parent = node;
    }
    
    rightChild.parent = node.parent;
    
    if (node.parent === null) {
      setRoot(rightChild);
    } else if (node === node.parent.left) {
      node.parent.left = rightChild;
    } else {
      node.parent.right = rightChild;
    }
    
    rightChild.left = node;
    node.parent = rightChild;
  };

  const rotateRight = (node: TreeNode): void => {
    const leftChild = node.left!;
    node.left = leftChild.right;
    
    if (leftChild.right !== null) {
      leftChild.right.parent = node;
    }
    
    leftChild.parent = node.parent;
    
    if (node.parent === null) {
      setRoot(leftChild);
    } else if (node === node.parent.right) {
      node.parent.right = leftChild;
    } else {
      node.parent.left = leftChild;
    }
    
    leftChild.right = node;
    node.parent = leftChild;
  };

  const fixViolation = (node: TreeNode): void => {
    let parent = null;
    let grandParent = null;

    while (node !== root && node.color !== 'black' && node.parent?.color === 'red') {
      parent = node.parent;
      grandParent = parent.parent;

      if (parent === grandParent?.left) {
        const uncle = grandParent.right;

        if (uncle !== null && uncle.color === 'red') {
          grandParent.color = 'red';
          parent.color = 'black';
          uncle.color = 'black';
          node = grandParent;
        } else {
          if (node === parent.right) {
            rotateLeft(parent);
            node = parent;
            parent = node.parent!;
          }

          rotateRight(grandParent);
          const tempColor = parent.color;
          parent.color = grandParent.color;
          grandParent.color = tempColor;
          node = parent;
        }
      } else {
        const uncle = grandParent!.left;

        if (uncle !== null && uncle.color === 'red') {
          grandParent!.color = 'red';
          parent.color = 'black';
          uncle.color = 'black';
          node = grandParent!;
        } else {
          if (node === parent.left) {
            rotateRight(parent);
            node = parent;
            parent = node.parent!;
          }

          rotateLeft(grandParent!);
          const tempColor = parent.color;
          parent.color = grandParent!.color;
          grandParent!.color = tempColor;
          node = parent;
        }
      }
    }

    root!.color = 'black';
  };

  const insertNode = (value: number): void => {
    const newNode = createNode(value);

    if (root === null) {
      newNode.color = 'black';
      setRoot(newNode);
      return;
    }

    let current = root;
    let parent = null;

    while (current !== null) {
      parent = current;
      if (value < current.value) {
        current = current.left!;
      } else if (value > current.value) {
        current = current.right!;
      } else {
        return; // Duplicate values are not allowed
      }
    }

    newNode.parent = parent;

    if (value < parent!.value) {
      parent!.left = newNode;
    } else {
      parent!.right = newNode;
    }

    fixViolation(newNode);
  };

  const addNode = () => {
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      insertNode(value);
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
          fill={node.color}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
        <text x={x} y={y} textAnchor="middle" dy=".3em" fill={node.color === 'black' ? 'white' : 'black'}>
          {node.value}
        </text>
      </g>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Red-Black Tree</h1>
      
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
  <h2 className="text-2xl font-semibold mb-4 text-indigo-600">How Red-Black Tree Works</h2>
  <p className="text-gray-700">
    A Red-Black Tree is a self-balancing binary search tree with an extra bit of data per node: its color, 
    which can be either red or black. By constraining the way nodes can be colored, Red-Black Trees ensure 
    that the tree remains approximately balanced during insertions and deletions.
  </p>
  <p className="text-gray-700 mt-2">
    Properties of Red-Black Trees:
    <ul className="list-disc list-inside mt-2">
      <li>Every node is either red or black.</li>
      <li>The root is always black.</li>
      <li>Every leaf (NIL) is black.</li>
      <li>If a node is red, then both its children are black.</li>
      <li>For each node, all simple paths from the node to descendant leaves contain the same number of black nodes.</li>
    </ul>
  </p>
  <p className="text-gray-700 mt-2">
    Key operations:
    <ul className="list-disc list-inside mt-2">
      <li>Insertion: O(log n)</li>
      <li>Deletion: O(log n)</li>
      <li>Search: O(log n)</li>
    </ul>
  </p>
  <p className="text-gray-700 mt-2">
    Balancing in Red-Black Trees is achieved through color changes and rotations. After insertion or deletion, 
    the tree may need to be adjusted to maintain its properties. This is done by recoloring nodes and performing 
    rotations.
  </p>
  <p className="text-gray-700 mt-2">
    Red-Black Trees are widely used in computer science, particularly in implementations of associative arrays, 
    such as the map and set data structures in many programming languages.
  </p>
  <Pseudocode code={pseudocodeExample} />
</div>
</div>
);
};

export default RedBlackTreeVisualization;