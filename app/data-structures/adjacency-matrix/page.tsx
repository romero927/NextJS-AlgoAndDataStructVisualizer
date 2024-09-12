// app/data-structures/adjacency-matrix/page.tsx
'use client';

import Pseudocode from '../../components/Pseudocode';
const pseudocodeExample = `class Graph:
    matrix
    vertices

    function addVertex():
        newVertex = new array of size vertices filled with 0
        for each row in matrix:
            row.append(0)
        matrix.append(newVertex)
        vertices++
        visualize()

    function removeVertex(v):
        if v < 0 or v >= vertices:
            return
        matrix.removeAt(v)
        for each row in matrix:
            row.removeAt(v)
        vertices--
        visualize()

    function addEdge(v1, v2):
        if v1 < 0 or v1 >= vertices or v2 < 0 or v2 >= vertices:
            return
        matrix[v1][v2] = 1
        matrix[v2][v1] = 1  // for undirected graph
        visualize()

    function removeEdge(v1, v2):
        if v1 < 0 or v1 >= vertices or v2 < 0 or v2 >= vertices:
            return
        matrix[v1][v2] = 0
        matrix[v2][v1] = 0  // for undirected graph
        visualize()

    function getNeighbors(v):
        if v < 0 or v >= vertices:
            return []
        neighbors = []
        for i from 0 to vertices - 1:
            if matrix[v][i] == 1:
                neighbors.append(i)
        return neighbors`;


import React, { useState } from 'react';
import { motion } from 'framer-motion';

class Graph {
  vertices: number;
  matrix: number[][];

  constructor(v: number) {
    this.vertices = v;
    this.matrix = Array(v).fill(null).map(() => Array(v).fill(0));
  }

  addEdge(v: number, w: number) {
    this.matrix[v][w] = 1;
    this.matrix[w][v] = 1; // For undirected graph
  }

  removeEdge(v: number, w: number) {
    this.matrix[v][w] = 0;
    this.matrix[w][v] = 0; // For undirected graph
  }
}

const AdjacencyMatrixVisualization: React.FC = () => {
  const [graph, setGraph] = useState<Graph>(new Graph(5));
  const [source, setSource] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const addEdge = () => {
    const v = parseInt(source);
    const w = parseInt(destination);
    if (!isNaN(v) && !isNaN(w) && v >= 0 && v < graph.vertices && w >= 0 && w < graph.vertices) {
      graph.addEdge(v, w);
      setGraph(new Graph(graph.vertices)); // Force re-render
      setMessage(`Added edge between ${v} and ${w}`);
    } else {
      setMessage('Invalid vertices');
    }
  };

  const removeEdge = () => {
    const v = parseInt(source);
    const w = parseInt(destination);
    if (!isNaN(v) && !isNaN(w) && v >= 0 && v < graph.vertices && w >= 0 && w < graph.vertices) {
      graph.removeEdge(v, w);
      setGraph(new Graph(graph.vertices)); // Force re-render
      setMessage(`Removed edge between ${v} and ${w}`);
    } else {
      setMessage('Invalid vertices');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Adjacency Matrix Graph Representation</h1>
      
      <div className="mb-8">
        <input
          type="number"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder="Source vertex"
          className="border p-2 mr-2"
        />
        <input
          type="number"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Destination vertex"
          className="border p-2 mr-2"
        />
        <button onClick={addEdge} className="btn-primary mr-2">Add Edge</button>
        <button onClick={removeEdge} className="btn-secondary">Remove Edge</button>
      </div>

      <div className="mb-8">
        <table className="border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400 p-2"></th>
              {graph.matrix.map((_, index) => (
                <th key={index} className="border border-gray-400 p-2">{index}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {graph.matrix.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <th className="border border-gray-400 p-2">{rowIndex}</th>
                {row.map((cell, cellIndex) => (
                  <motion.td
                    key={cellIndex}
                    className="border border-gray-400 p-2"
                    initial={{ backgroundColor: 'white' }}
                    animate={{ backgroundColor: cell ? '#4CAF50' : 'white' }}
                    transition={{ duration: 0.3 }}
                  >
                    {cell}
                  </motion.td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {message && (
        <div className="mb-8 text-green-600 font-semibold">{message}</div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">How Adjacency Matrix Works</h2>
        <p className="text-gray-700">
          An Adjacency Matrix is a 2D array of size V x V where V is the number of vertices in a graph. 
          Let the 2D array be adj[][], a slot adj[i][j] = 1 indicates that there is an edge from 
          vertex i to vertex j. For undirected graphs, the matrix is symmetric.
        </p>
        <p className="text-gray-700 mt-2">
          Pros:
          <ul className="list-disc list-inside mt-2">
            <li>Representation is easier to implement and follow</li>
            <li>Removing an edge takes O(1) time</li>
            <li>Queries like whether there is an edge from vertex `&lsquo;`u`&lsquo;` to vertex `&lsquo;`v`&lsquo;` are efficient and can be done O(1)</li>
          </ul>
        </p>
        <p className="text-gray-700 mt-2">
          Cons:
          <ul className="list-disc list-inside mt-2">
            <li>Consumes more space O(V^2)</li>
            <li>Even if the graph is sparse(contains less number of edges), it consumes the same space</li>
            <li>Adding a vertex is O(V^2) time</li>
          </ul>
        </p>
        <Pseudocode code={pseudocodeExample} />
      </div>
    </div>
  );
};

export default AdjacencyMatrixVisualization;