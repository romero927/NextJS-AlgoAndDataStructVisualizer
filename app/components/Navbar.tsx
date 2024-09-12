// components/Navbar.tsx
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-indigo-700 text-white shadow-lg z-99999">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-white hover:text-indigo-200 transition duration-300">
          Algo Visualizer
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="hover:text-indigo-200 transition duration-300">
              Home
            </Link>
          </li>
          <li className="relative group">
            <button className="hover:text-indigo-200 transition duration-300">
              Sorting
            </button>
            <ul className="absolute left-0 hidden pt-2 group-hover:block bg-white shadow-lg rounded-md overflow-hidden">
              <li>
                <Link href="/algorithms/bubble-sort" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Bubble Sort
                </Link>
              </li>
              <li>
                <Link href="/algorithms/quick-sort" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Quick Sort
                </Link>
              </li>
              <li>
                <Link href="/algorithms/merge-sort" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Merge Sort
                </Link>
              </li>
              <li>
                <Link href="/algorithms/insertion-sort" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Insertion Sort
                </Link>
              </li>
              <li>
                <Link href="/algorithms/selection-sort" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Selection Sort
                </Link>
              </li>
              <li>
                <Link href="/algorithms/heap-sort" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Heap Sort
                </Link>
              </li>
            </ul>
          </li>
          <li className="relative group">
            <button className="hover:text-indigo-200 transition duration-300">
              Searching
            </button>
            <ul className="absolute left-0 hidden pt-2 group-hover:block bg-white shadow-lg rounded-md overflow-hidden">
              <li>
                <Link href="/algorithms/binary-search" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Binary Search
                </Link>
              </li>
              <li>
                <Link href="/algorithms/linear-search" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Linear Search
                </Link>
              </li>
              <li>
                <Link href="/algorithms/depth-first-search" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Depth-First Search
                </Link>
              </li>
              <li>
                <Link href="/algorithms/breadth-first-search" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Breadth-First Search
                </Link>
              </li>
            </ul>
          </li>
          <li className="relative group">
            <button className="hover:text-indigo-200 transition duration-300">
              Graph
            </button>
            <ul className="absolute left-0 hidden pt-2 group-hover:block bg-white shadow-lg rounded-md overflow-hidden">
              <li>
                <Link href="/algorithms/dijkstra" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Dijkstra`&apos;`s Shortest Path
                </Link>
              </li>
              <li>
                <Link href="/algorithms/kruskal" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Kruskal`&apos;`s Minimum Spanning Tree
                </Link>
              </li>
              <li>
                <Link href="/algorithms/prim" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Prim`&apos;`s Minimum Spanning Tree
                </Link>
              </li>
              <li>
                <Link href="/algorithms/topological-sort" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Topological Sort
                </Link>
              </li>
            </ul>
          </li>
          <li className="relative group">
            <button className="hover:text-indigo-200 transition duration-300">
              Dynamic Programming
            </button>
            <ul className="absolute left-0 hidden pt-2 group-hover:block bg-white shadow-lg rounded-md overflow-hidden">
              <li>
                <Link href="/algorithms/fibonacci" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Fibonacci Sequence
                </Link>
              </li>
              <li>
                <Link href="/algorithms/longest-common-subsequence" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Longest Common Subsequence
                </Link>
              </li>
              <li>
                <Link href="/algorithms/knapsack" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Knapsack Problem
                </Link>
              </li>
              <li>
                <Link href="/algorithms/topological-sort" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Topological Sort
                </Link>
              </li>
            </ul>
          </li>
          <li className="relative group">
            <button className="hover:text-indigo-200 transition duration-300">
              String Matching
            </button>
            <ul className="absolute left-0 hidden pt-2 group-hover:block bg-white shadow-lg rounded-md overflow-hidden">
              <li>
                <Link href="/algorithms/naive-string-matching" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Naive String Matching
                </Link>
              </li>
              <li>
                <Link href="/algorithms/knuth-morris-pratt" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Knuth Morris Pratt (KMP)
                </Link>
              </li>
            </ul>
          </li>
          <li className="relative group">
            <button className="hover:text-indigo-200 transition duration-300">
              Linear Data Structures
            </button>
            <ul className="absolute left-0 hidden pt-2 group-hover:block bg-white shadow-lg rounded-md overflow-hidden">
            <li>
                <Link href="/data-structures/array" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Array
                </Link>
              </li>
              <li>
                <Link href="/data-structures/linked-list" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Linked List
                </Link>
              </li>
              <li>
                <Link href="/data-structures/stack" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Stack
                </Link>
              </li>
              <li>
                <Link href="/data-structures/queue" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Queue
                </Link>
              </li>
              <li>
                <Link href="/data-structures/deque" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Deque
                </Link>
              </li>
              <li>
                <Link href="/data-structures/map" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Map
                </Link>
              </li>
              <li>
                <Link href="/data-structures/hash" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Hash
                </Link>
              </li>
              <li>
                <Link href="/data-structures/array-list" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  ArrayList
                </Link>
              </li>
            </ul>
          </li>
          <li className="relative group">
            <button className="hover:text-indigo-200 transition duration-300">
              Trees
            </button>
            <ul className="absolute left-0 hidden pt-2 group-hover:block bg-white shadow-lg rounded-md overflow-hidden">
              <li>
                <Link href="/data-structures/binary-tree" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Binary Tree
                </Link>
              </li>
              <li>
                <Link href="/data-structures/binary-search-tree" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Binary Search Tree
                </Link>
              </li>
              <li>
                <Link href="/data-structures/avl-tree" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  AVL Tree
                </Link>
              </li>
              <li>
                <Link href="/data-structures/red-black-tree" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Red-Black Tree
                </Link>
              </li>
            </ul>
          </li>
          <li className="relative group">
            <button className="hover:text-indigo-200 transition duration-300">
              Heaps
            </button>
            <ul className="absolute left-0 hidden pt-2 group-hover:block bg-white shadow-lg rounded-md overflow-hidden">
              <li>
                <Link href="/data-structures/min-heap" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Min Heap
                </Link>
              </li>
              <li>
                <Link href="/data-structures/max-heap" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Max Heap
                </Link>
              </li>
            </ul>
          </li>
          <li className="relative group">
            <button className="hover:text-indigo-200 transition duration-300">
              Graphs
            </button>
            <ul className="absolute left-0 hidden pt-2 group-hover:block bg-white shadow-lg rounded-md overflow-hidden">
              <li>
                <Link href="/data-structures/adjacency-matrix" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Adjacency Matrix
                </Link>
              </li>
              <li>
                <Link href="/data-structures/adjacency-list" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Adjacency-List
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;