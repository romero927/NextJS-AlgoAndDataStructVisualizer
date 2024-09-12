// app/page.tsx
import { tree } from 'next/dist/build/templates/app-page';
import Link from 'next/link';

interface Item {
  name: string;
  path: string;
}

const sortingAlgorithms: Item[] = [
  { name: 'Bubble Sort', path: '/algorithms/bubble-sort' },
  { name: 'Quick Sort', path: '/algorithms/quick-sort' },
  { name: 'Merge Sort', path: '/algorithms/merge-sort' },
  { name: 'Insertion Sort', path: '/algorithms/insertion-sort' },
  { name: 'Selection Sort', path: '/algorithms/selection-sort' },
  { name: 'Heap Sort', path: '/algorithms/heap-sort' },
];

const searchingAlgorithms: Item[] = [
  { name: 'Binary Search', path: '/algorithms/binary-search' },
  { name: 'Linear Search', path: '/algorithms/linear-search' },
  { name: 'Depth-First Search', path: '/algorithms/depth-first-search' },
  { name: 'Breadth-First Search', path: '/algorithms/breadth-first-search' },
];

const graphAlgorithms: Item[] = [
  { name: "Dijkstra's Shortest Path", path: '/algorithms/dijkstra' },
  { name: "Kruskal's Minimum Spanning Tree", path: '/algorithms/kruskal' },
  { name: "Prim's Minimum Spanning Tree", path: '/algorithms/prim' },
  { name: 'Topological Sort', path: '/algorithms/topological-sort' },
];

const dynamicProgrammingAlgorithms: Item[] = [
  { name: 'Fibonacci Sequence', path: '/algorithms/fibonacci' },
  { name: 'Longest Common Subsequence', path: '/algorithms/longest-common-subsequence' },
  { name: 'Knapsack Problem', path: '/algorithms/knapsack' },
];

const stringMatchingAlgorithms: Item[] = [
  { name: 'Naive String Matching', path: '/algorithms/naive-string-matching' },
  { name: 'Knuth-Morris-Pratt (KMP)', path: '/algorithms/knuth-morris-pratt' },
];

const linearDataStructures: Item[] = [
  { name: 'Array', path: '/data-structures/array' },
  { name: 'Linked List', path: '/data-structures/linked-list' },
  { name: 'Stack', path: '/data-structures/stack' },
  { name: 'Queue', path: '/data-structures/queue' },
  { name: 'Deque', path: '/data-structures/deque' },
  { name: 'Map', path: '/data-structures/map' },
  { name: 'Hash', path: '/data-structures/hash' },
  { name: 'Array List', path: '/data-structures/array-list' },
];

const treeDataStructures: Item[] = [
  { name: 'Binary Tree', path: '/data-structures/binary-tree' },
  { name: 'Binary Search Tree', path: '/data-structures/binary-search-tree' },
  { name: 'AVL Tree', path: '/data-structures/avl-tree' },
  { name: 'Red-Black Tree', path: '/data-structures/red-black-tree' },
];

const heapDataStructures: Item[] = [
  { name: 'Min Heap', path: '/data-structures/min-heap' },
  { name: 'Max Heap', path: '/data-structures/max-heap' },
];

const graphDataStructures: Item[] = [
  { name: 'Adjacency Matrix', path: '/data-structures/adjacency-matrix' },
  { name: 'Adjacency List', path: '/data-structures/adjacency-list' },
];


export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Algorithm and Data Structure Visualizer</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <section className="card">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Sorting Algorithms</h2>
          <ul className="space-y-2">
            {sortingAlgorithms.map((algo) => (
              <li key={algo.name}>
                <Link href={algo.path} className="text-indigo-600 hover:text-indigo-800 transition duration-300">
                  {algo.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="card">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Searching Algorithms</h2>
          <ul className="space-y-2">
            {searchingAlgorithms.map((algo) => (
              <li key={algo.name}>
                <Link href={algo.path} className="text-indigo-600 hover:text-indigo-800 transition duration-300">
                  {algo.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="card">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Graph Algorithms</h2>
          <ul className="space-y-2">
            {graphAlgorithms.map((algo) => (
              <li key={algo.name}>
                <Link href={algo.path} className="text-indigo-600 hover:text-indigo-800 transition duration-300">
                  {algo.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="card">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Dynamic Programming Algorithms</h2>
          <ul className="space-y-2">
            {dynamicProgrammingAlgorithms.map((algo) => (
              <li key={algo.name}>
                <Link href={algo.path} className="text-indigo-600 hover:text-indigo-800 transition duration-300">
                  {algo.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="card">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600">String Matching Algorithms</h2>
          <ul className="space-y-2">
            {stringMatchingAlgorithms.map((algo) => (
              <li key={algo.name}>
                <Link href={algo.path} className="text-indigo-600 hover:text-indigo-800 transition duration-300">
                  {algo.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="card">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Linear Data Structures</h2>
          <ul className="space-y-2">
            {linearDataStructures.map((ds) => (
              <li key={ds.name}>
                <Link href={ds.path} className="text-indigo-600 hover:text-indigo-800 transition duration-300">
                  {ds.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="card">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Tree Data Structures</h2>
          <ul className="space-y-2">
            {treeDataStructures.map((ds) => (
              <li key={ds.name}>
                <Link href={ds.path} className="text-indigo-600 hover:text-indigo-800 transition duration-300">
                  {ds.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="card">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Heap Structures</h2>
          <ul className="space-y-2">
            {heapDataStructures.map((ds) => (
              <li key={ds.name}>
                <Link href={ds.path} className="text-indigo-600 hover:text-indigo-800 transition duration-300">
                  {ds.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="card">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Graph Structures</h2>
          <ul className="space-y-2">
            {graphDataStructures.map((ds) => (
              <li key={ds.name}>
                <Link href={ds.path} className="text-indigo-600 hover:text-indigo-800 transition duration-300">
                  {ds.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        
      </div>
    </div>
  );
}