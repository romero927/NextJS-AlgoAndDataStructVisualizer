// app/algorithms/topological-sort/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Node {
  id: number;
  x: number;
  y: number;
}

interface Edge {
  source: number;
  target: number;
}

const TopologicalSort: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    generateGraph();
  }, []);

  const generateGraph = () => {
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];
    
    // Generate nodes
    for (let i = 0; i < 8; i++) {
      newNodes.push({
        id: i,
        x: Math.random() * 600 + 100,
        y: Math.random() * 300 + 50,
      });
    }

    // Generate edges (ensuring no cycles)
    for (let i = 0; i < 8; i++) {
      const numEdges = Math.floor(Math.random() * 2) + 1;
      for (let j = 0; j < numEdges; j++) {
        const target = Math.floor(Math.random() * (8 - i - 1)) + i + 1;
        newEdges.push({ source: i, target });
      }
    }

    setNodes(newNodes);
    setEdges(newEdges);
    setSorted([]);
    setCurrentNode(null);
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const topologicalSort = async () => {
    setIsRunning(true);
    setSorted([]);
    const visited: boolean[] = new Array(nodes.length).fill(false);
    const stack: number[] = [];

    const dfs = async (v: number) => {
      visited[v] = true;
      setCurrentNode(v);
      await sleep(1000);

      const neighbors = edges.filter(edge => edge.source === v).map(edge => edge.target);
      for (const neighbor of neighbors) {
        if (!visited[neighbor]) {
          await dfs(neighbor);
        }
      }

      stack.push(v);
      setSorted([...stack].reverse());
      await sleep(500);
    };

    for (let i = 0; i < nodes.length; i++) {
      if (!visited[i]) {
        await dfs(i);
      }
    }

    setCurrentNode(null);
    setIsRunning(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Topological Sort Algorithm</h1>
      
      <div className="mb-8">
        <button 
          onClick={generateGraph}
          disabled={isRunning}
          className="btn-primary mr-4"
        >
          Generate New Graph
        </button>
        <button 
          onClick={topologicalSort}
          disabled={isRunning}
          className="btn-secondary"
        >
          Run Topological Sort
        </button>
      </div>

      <div className="border border-gray-300 h-96 relative">
        <svg width="100%" height="100%" viewBox="0 0 800 400">
          {edges.map((edge, index) => {
            const source = nodes.find(node => node.id === edge.source)!;
            const target = nodes.find(node => node.id === edge.target)!;
            return (
              <g key={index}>
                <line
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke="gray"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
              </g>
            );
          })}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="gray" />
            </marker>
          </defs>
          {nodes.map((node) => (
            <g key={node.id}>
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="20"
                fill={currentNode === node.id ? 'yellow' : sorted.includes(node.id) ? 'green' : 'blue'}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              <text x={node.x} y={node.y} textAnchor="middle" dy=".3em" fill="white">
                {node.id}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Topological Sort Order:</h2>
        <p className="text-gray-700">
          {sorted.join(' → ')}
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">How Topological Sort Works</h2>
        <p className="text-gray-700">
          Topological sorting for Directed Acyclic Graph (DAG) is a linear ordering of vertices such that for 
          every directed edge uv, vertex u comes before v in the ordering. It`&apos;`s typically used for scheduling 
          jobs or tasks with dependencies.
        </p>
        <p className="text-gray-700 mt-2">
          Color representation:
          <ul className="list-disc list-inside mt-2">
            <li>Blue nodes are not yet visited</li>
            <li>Yellow node is the current node being explored</li>
            <li>Green nodes have been visited and are in the sorted order</li>
          </ul>
        </p>
      </div>
    </div>
  );
};

export default TopologicalSort;