// app/data-structures/adjacency-list/page.tsx
'use client';

import Pseudocode from '../../components/Pseudocode';
const pseudocodeExample = `class Graph:
    adjList
    vertices

    function addVertex():
        adjList.append([])
        vertices++
        visualize()

    function removeVertex(v):
        if v < 0 or v >= vertices:
            return
        adjList.removeAt(v)
        for each list in adjList:
            remove v from list
            for each element in list:
                if element > v:
                    decrease element by 1
        vertices--
        visualize()

    function addEdge(v1, v2):
        if v1 < 0 or v1 >= vertices or v2 < 0 or v2 >= vertices:
            return
        adjList[v1].append(v2)
        adjList[v2].append(v1)  // for undirected graph
        visualize()

    function removeEdge(v1, v2):
        if v1 < 0 or v1 >= vertices or v2 < 0 or v2 >= vertices:
            return
        remove v2 from adjList[v1]
        remove v1 from adjList[v2]  // for undirected graph
        visualize()

    function getNeighbors(v):
        if v < 0 or v >= vertices:
            return []
        return adjList[v]`;

import React, { useState } from 'react';
import { motion } from 'framer-motion';

class Graph {
  vertices: number;
  list: Map<number, number[]>;

  constructor(v: number) {
    this.vertices = v;
    this.list = new Map();
    for (let i = 0; i < v; i++) {
      this.list.set(i, []);
    }
  }

  addEdge(v: number, w: number) {
    this.list.get(v)!.push(w);
    this.list.get(w)!.push(v); // For undirected graph
  }

  removeEdge(v: number, w: number) {
    this.list.set(v, this.list.get(v)!.filter(x => x !== w));
    this.list.set(w, this.list.get(w)!.filter(x => x !== v)); // For undirected graph
  }
}

const AdjacencyListVisualization: React.FC = () => {
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
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Adjacency List Graph Representation</h1>
      
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
        {Array.from(graph.list).map(([vertex, edges]) => (
          <motion.div
            key={vertex}
            className="mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-bold">{vertex}: </span>
            {edges.map((edge, index) => (
              <span key={index} className="mr-2 bg-blue-500 text-white px-2 py-1 rounded">
                {edge}
              </span>
            ))}
          </motion.div>
        ))}
      </div>

      {message && (
        <div className="mb-8 text-green-600 font-semibold">{message}</div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">How Adjacency List Works</h2>
        <p className="text-gray-700">
          An Adjacency List represents a graph as an array of linked lists. The index of the array 
          represents a vertex and each element in its linked list represents the other vertices 
          that form an edge with the vertex.
        </p>
        <p className="text-gray-700 mt-2">
          Pros:
          <ul className="list-disc list-inside mt-2">
            <li>Saves space O(|V|+|E|). In the worst case, there can be C(V, 2) number of edges in a graph thus consuming O(V^2) space</li>
            <li>Adding a vertex is easier</li>
            <li>Iterating over all edges is efficient</li>
          </ul>
        </p>
        <p className="text-gray-700 mt-2">
          Cons:
          <ul className="list-disc list-inside mt-2">
            <li>Queries like whether there is an edge from vertex u to vertex v are not efficient and can be done O(V)</li>
          </ul>
        </p>
        <Pseudocode code={pseudocodeExample} />
      </div>
    </div>
  );
};

export default AdjacencyListVisualization;