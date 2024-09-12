// app/algorithms/depth-first-search/page.tsx
'use client';

import Pseudocode from '../../components/Pseudocode';
const pseudocodeExample = `function dfs(graph, start):
    visited = set()
    stack = [start]
    while stack is not empty:
        vertex = stack.pop()
        if vertex not in visited:
            visit(vertex)
            visited.add(vertex)
            for neighbor in graph[vertex]:
                if neighbor not in visited:
                    stack.push(neighbor)
        visualize(graph, visited, stack)`;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  x: number;
  y: number;
}

const DFSTree: React.FC = () => {
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [visited, setVisited] = useState<number[]>([]);
  const [current, setCurrent] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    generateTree();
  }, []);

  const generateTree = () => {
    const newRoot = createRandomBinaryTree(4);
    setRoot(newRoot);
    setVisited([]);
    setCurrent(null);
  };

  const createRandomBinaryTree = (depth: number): TreeNode | null => {
    if (depth === 0) return null;
    const value = Math.floor(Math.random() * 100);
    return {
      value,
      left: createRandomBinaryTree(depth - 1),
      right: createRandomBinaryTree(depth - 1),
      x: 0,
      y: 0,
    };
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const dfs = async (node: TreeNode | null) => {
    if (!node) return;
    
    setCurrent(node.value);
    await sleep(1000);
    setVisited(prev => [...prev, node.value]);
    
    await dfs(node.left);
    await dfs(node.right);
  };

  const startDFS = async () => {
    setIsSearching(true);
    setVisited([]);
    await dfs(root);
    setCurrent(null);
    setIsSearching(false);
  };

  const renderTree = (node: TreeNode | null, x: number, y: number, level: number) => {
    if (!node) return null;

    const spacing = 200 / (level + 1);
    node.x = x;
    node.y = y;

    return (
      <g key={node.value}>
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
          fill={
            current === node.value
              ? 'yellow'
              : visited.includes(node.value)
              ? 'green'
              : 'blue'
          }
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
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Depth-First Search Tree Visualization</h1>
      
      <div className="mb-8">
        <button 
          onClick={generateTree}
          disabled={isSearching}
          className="btn-primary mr-4"
        >
          Generate New Tree
        </button>
        <button 
          onClick={startDFS}
          disabled={isSearching}
          className="btn-secondary"
        >
          Start DFS
        </button>
      </div>

      <div className="border border-gray-300 h-96 relative">
        <svg width="100%" height="100%" viewBox="0 0 800 400">
          <g transform="translate(400, 40)">
            {root && renderTree(root, 0, 0, 0)}
          </g>
        </svg>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">How Depth-First Search Works on Trees</h2>
        <p className="text-gray-700">
          Depth-First Search (DFS) on a tree starts at the root and explores as far as possible along each branch before backtracking. 
          In this visualization, we`&lsquo;`re using an in-order traversal: left subtree, root, right subtree. The algorithm visits the left 
          child, then the node itself, and finally the right child before backtracking.
        </p>
        <p className="text-gray-700 mt-2">
          Color representation:
          <ul className="list-disc list-inside mt-2">
            <li>Blue nodes are unvisited</li>
            <li>Yellow node is the current node being explored</li>
            <li>Green nodes have been visited</li>
          </ul>
        </p>

        <Pseudocode code={pseudocodeExample} />
      </div>
    </div>
  );
};

export default DFSTree;