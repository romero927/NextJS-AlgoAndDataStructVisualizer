// app/algorithms/prim/page.tsx
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

const Prim: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [mst, setMst] = useState<Edge[]>([]);
  const [visited, setVisited] = useState<number[]>([]);
  const [currentEdge, setCurrentEdge] = useState<Edge | null>(null);
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

    // Generate edges
    for (let i = 0; i < 8; i++) {
      for (let j = i + 1; j < 8; j++) {
        if (Math.random() < 0.5) {
          newEdges.push({
            source: i,
            target: j,
            weight: Math.floor(Math.random() * 10) + 1,
          });
        }
      }
    }

    setNodes(newNodes);
    setEdges(newEdges);
    setMst([]);
    setVisited([]);
    setCurrentEdge(null);
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const prim = async () => {
    setIsRunning(true);
    setMst([]);
    setVisited([]);
    const newMst: Edge[] = [];
    const newVisited: number[] = [0]; // Start with node 0
    setVisited([...newVisited]);

    while (newVisited.length < nodes.length) {
      let minEdge: Edge | null = null;
      let minWeight = Infinity;

      for (const edge of edges) {
        const isSourceVisited = newVisited.includes(edge.source);
        const isTargetVisited = newVisited.includes(edge.target);

        if ((isSourceVisited && !isTargetVisited) || (!isSourceVisited && isTargetVisited)) {
          setCurrentEdge(edge);
          await sleep(500);

          if (edge.weight < minWeight) {
            minEdge = edge;
            minWeight = edge.weight;
          }
        }
      }

      if (minEdge) {
        newMst.push(minEdge);
        setMst([...newMst]);
        const newNode = newVisited.includes(minEdge.source) ? minEdge.target : minEdge.source;
        newVisited.push(newNode);
        setVisited([...newVisited]);
        await sleep(1000);
      }
    }

    setCurrentEdge(null);
    setIsRunning(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Prim`&apos;`s Minimum Spanning Tree Algorithm</h1>
      
      <div className="mb-8">
        <button 
          onClick={generateGraph}
          disabled={isRunning}
          className="btn-primary mr-4"
        >
          Generate New Graph
        </button>
        <button 
          onClick={prim}
          disabled={isRunning}
          className="btn-secondary"
        >
          Run Prim`&apos;`s Algorithm
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
                  stroke={mst.includes(edge) ? 'green' : edge === currentEdge ? 'yellow' : 'gray'}
                  strokeWidth={mst.includes(edge) ? '4' : '2'}
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
                fill={visited.includes(node.id) ? 'green' : 'blue'}
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
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">How Prim`&apos;`s Algorithm Works</h2>
        <p className="text-gray-700">
          Prim`&apos;`s algorithm finds a minimum spanning tree for a weighted undirected graph. It starts with 
          an arbitrary node and grows the tree one edge at a time, always adding the lowest-weight edge 
          that connects a tree vertex to a non-tree vertex.
        </p>
        <p className="text-gray-700 mt-2">
          Color representation:
          <ul className="list-disc list-inside mt-2">
            <li>Blue nodes are not yet in the MST</li>
            <li>Green nodes are in the MST</li>
            <li>Gray edges are not part of the MST</li>
            <li>Yellow edge is the current edge being considered</li>
            <li>Green edges are part of the MST</li>
          </ul>
        </p>
      </div>
    </div>
  );
};

export default Prim;