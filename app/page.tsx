// app/page.tsx
import React from "react";
import Link from "next/link";

interface Item {
  name: string;
  path: string;
}

const sortingAlgorithms: Item[] = [
  { name: "Bubble Sort", path: "/algorithms/bubble-sort" },
  { name: "Quick Sort", path: "/algorithms/quick-sort" },
  { name: "Merge Sort", path: "/algorithms/merge-sort" },
  { name: "Insertion Sort", path: "/algorithms/insertion-sort" },
  { name: "Selection Sort", path: "/algorithms/selection-sort" },
  { name: "Heap Sort", path: "/algorithms/heap-sort" },
];

const searchingAlgorithms: Item[] = [
  { name: "Binary Search", path: "/algorithms/binary-search" },
  { name: "Linear Search", path: "/algorithms/linear-search" },
  { name: "Depth-First Search", path: "/algorithms/depth-first-search" },
  { name: "Breadth-First Search", path: "/algorithms/breadth-first-search" },
];

const dynamicProgramming: Item[] = [
  { name: "Fibonacci Sequence", path: "/algorithms/fibonacci" },
  { name: "Longest Common Subsequence", path: "/algorithms/lcs" },
  { name: "Knapsack Problem", path: "/algorithms/knapsack" },
];

const stringMatching: Item[] = [
  { name: "Naive String Matching", path: "/algorithms/naive-string-matching" },
  { name: "Knuth-Morris-Pratt", path: "/algorithms/kmp" },
];

const graphAlgorithms: Item[] = [
  { name: "Dijkstra's Shortest Path", path: "/algorithms/dijkstra" },
  { name: "Kruskal's Minimum Spanning Tree", path: "/algorithms/kruskal" },
  { name: "Prim's Minimum Spanning Tree", path: "/algorithms/prim" },
  { name: "Topological Sort", path: "/algorithms/topological-sort" },
];

const linearDataStructures: Item[] = [
  { name: "Array", path: "/data-structures/array" },
  { name: "ArrayList", path: "/data-structures/arraylist" },
  { name: "Linked List", path: "/data-structures/linked-list" },
  { name: "Stack", path: "/data-structures/stack" },
  { name: "Queue", path: "/data-structures/queue" },
  { name: "Deque", path: "/data-structures/deque" },
];

const treeDataStructures: Item[] = [
  { name: "Binary Tree", path: "/data-structures/binary-tree" },
  { name: "Binary Search Tree", path: "/data-structures/bst" },
  { name: "AVL Tree", path: "/data-structures/avl-tree" },
  { name: "Red-Black Tree", path: "/data-structures/red-black-tree" },
];

const heapDataStructures: Item[] = [
  { name: "Min Heap", path: "/data-structures/min-heap" },
  { name: "Max Heap", path: "/data-structures/max-heap" },
];

const hashDataStructures: Item[] = [
  { name: "Hash Table", path: "/data-structures/hash-table" },
  { name: "Map", path: "/data-structures/map" },
];

const graphRepresentations: Item[] = [
  { name: "Adjacency Matrix", path: "/data-structures/adjacency-matrix" },
  { name: "Adjacency List", path: "/data-structures/adjacency-list" },
];

const Card: React.FC<{ title: string; items: Item[] }> = ({ title, items }) => (
  <div className="bg-white shadow rounded-lg overflow-hidden">
    <div className="bg-indigo-600 text-white text-sm font-semibold py-1 px-2">
      {title}
    </div>
    <div className="p-2">
      <div className="grid grid-cols-2 gap-1 text-sm">
        {items.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className="text-indigo-600 hover:text-indigo-800 transition duration-300"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default function Home() {
  return (
    <div className="pt-20 px-4 min-h-screen bg-gray-100">
      {" "}
      {/* Increased padding-top and added background color */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-indigo-700">
          Algorithm and Data Structure Visualizer
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-4 overflow-auto pr-2">
            <h2 className="text-xl font-semibold text-indigo-600">
              Algorithms
            </h2>
            <Card title="Sorting Algorithms" items={sortingAlgorithms} />
            <Card title="Searching Algorithms" items={searchingAlgorithms} />
            <Card title="Dynamic Programming" items={dynamicProgramming} />
            <Card title="String Matching" items={stringMatching} />
            <Card title="Graph Algorithms" items={graphAlgorithms} />
          </div>

          <div className="flex flex-col space-y-4 overflow-auto pr-2">
            <h2 className="text-xl font-semibold text-indigo-600">
              Data Structures
            </h2>
            <Card title="Linear Data Structures" items={linearDataStructures} />
            <Card title="Tree Data Structures" items={treeDataStructures} />
            <Card title="Heap Data Structures" items={heapDataStructures} />
            <Card
              title="Hash-Based Data Structures"
              items={hashDataStructures}
            />
            <Card title="Graph Representations" items={graphRepresentations} />
          </div>
        </div>
      </div>
    </div>
  );
}
