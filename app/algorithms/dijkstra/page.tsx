// app/algorithms/dijkstra/page.tsx
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
  weight: number;
}

const Dijkstra: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [distances, setDistances] = useState<number[]>([]);
  const [visited, setVisited] = useState<number[]>([]);
  const [current, setCurrent] = useState<number | null>(null);
  const [startNode] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const [previous, setPrevious] = useState<(number | null)[]>([]);

  
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

    // Generate edges
    for (let i = 0; i < 8; i++) {
      const numEdges = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < numEdges; j++) {
        const target = Math.floor(Math.random() * 8);
        if (target !== i) {
          newEdges.push({
            source: i,
            target,
            weight: Math.floor(Math.random() * 10) + 1,
          });
        }
      }
    }

    setNodes(newNodes);
    setEdges(newEdges);
    resetAlgorithm();
  };

  const resetAlgorithm = () => {
    setDistances(new Array(8).fill(Infinity));
    setPrevious(new Array(8).fill(null));
    setVisited([]);
    setCurrent(null);
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const dijkstra = async () => {
    setIsRunning(true);
    resetAlgorithm();
    const newDistances = new Array(8).fill(Infinity);
    const newPrevious = new Array(8).fill(null);
    const newVisited: number[] = [];

    newDistances[startNode] = 0;
    setDistances([...newDistances]);

    while (newVisited.length < nodes.length) {
      let minDistance = Infinity;
      let minNode = -1;

      for (let i = 0; i < nodes.length; i++) {
        if (!newVisited.includes(i) && newDistances[i] < minDistance) {
          minDistance = newDistances[i];
          minNode = i;
        }
      }

      if (minNode === -1) break;

      newVisited.push(minNode);
      setVisited([...newVisited]);
      setCurrent(minNode);
      await sleep(1000);

      const neighbors = edges.filter(edge => edge.source === minNode);
      for (const edge of neighbors) {
        const alt = newDistances[minNode] + edge.weight;
        if (alt < newDistances[edge.target]) {
          newDistances[edge.target] = alt;
          newPrevious[edge.target] = minNode;
          setDistances([...newDistances]);
          setPrevious([...newPrevious]);
          await sleep(500);
        }
      }
    }

    setCurrent(null);
    setIsRunning(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Dijkstra's Shortest Path Algorithm</h1>
      
      <div className="mb-8">
        <button 
          onClick={generateGraph}
          disabled={isRunning}
          className="btn-primary mr-4"
        >
          Generate New Graph
        </button>
        <button 
          onClick={dijkstra}
          disabled={isRunning}
          className="btn-secondary"
        >
          Run Dijkstra's Algorithm
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
                />
                <text
                  x={(source.x + target.x) / 2}
                  y={(source.y + target.y) / 2}
                  fill="black"
                  fontSize="12"
                >
                  {edge.weight}
                </text>
              </g>
            );
          })}
          {nodes.map((node) => (
            <g key={node.id}>
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="20"
                fill={
                  current === node.id
                    ? 'yellow'
                    : visited.includes(node.id)
                    ? 'green'
                    : node.id === startNode
                    ? 'red'
                    : 'blue'
                }
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              <text x={node.x} y={node.y} textAnchor="middle" dy=".3em" fill="white">
                {node.id}
              </text>
              <text x={node.x} y={node.y + 30} textAnchor="middle" fill="black">
                {distances[node.id] === Infinity ? '∞' : distances[node.id]}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">How Dijkstra's Algorithm Works</h2>
        <p className="text-gray-700">
          Dijkstra's algorithm finds the shortest path between nodes in a graph. It picks the unvisited node with 
          the lowest distance, calculates the distance through it to each unvisited neighbor, and updates the 
          neighbor's distance if smaller. This process repeats until all nodes have been visited.
        </p>
        <p className="text-gray-700 mt-2">
          Color representation:
          <ul className="list-disc list-inside mt-2">
            <li>Red node is the starting node</li>
            <li>Blue nodes are unvisited</li>
            <li>Yellow node is the current node being explored</li>
            <li>Green nodes have been visited</li>
          </ul>
        </p>
      </div>
    </div>
  );
};

export default Dijkstra;