// components/Navbar.tsx
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-indigo-700 text-white shadow-lg fixed w-full z-50 h-16"> {/* Added h-16 for fixed height */}
      <div className="container mx-auto px-4 h-full flex justify-between items-center"> {/* Changed py-3 to h-full */}
        <Link href="/" className="text-xl font-bold text-white hover:text-indigo-200 transition duration-300">
          Visualizer
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="hover:text-indigo-200 transition duration-300">
              Home
            </Link>
          </li>
          <li className="relative group">
            <button className="hover:text-indigo-200 transition duration-300">
              Algorithms
            </button>
            <ul className="absolute left-0 hidden pt-2 group-hover:block bg-white shadow-lg rounded-md overflow-hidden w-48">
              <li className="px-4 py-2 text-sm font-bold text-gray-700 bg-gray-100">Sorting</li>
              <li><Link href="/algorithms/bubble-sort" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">Bubble Sort</Link></li>
              <li><Link href="/algorithms/quick-sort" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">Quick Sort</Link></li>
              <li><Link href="/algorithms/merge-sort" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">Merge Sort</Link></li>
              <li><Link href="/algorithms/insertion-sort" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">Insertion Sort</Link></li>
              <li><Link href="/algorithms/selection-sort" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">Selection Sort</Link></li>
              <li><Link href="/algorithms/heap-sort" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">Heap Sort</Link></li>
              
              <li className="px-4 py-2 text-sm font-bold text-gray-700 bg-gray-100">Searching</li>
              <li><Link href="/algorithms/binary-search" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">Binary Search</Link></li>
              <li><Link href="/algorithms/linear-search" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">Linear Search</Link></li>
              <li><Link href="/algorithms/depth-first-search" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">Depth-First Search</Link></li>
              <li><Link href="/algorithms/breadth-first-search" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">Breadth-First Search</Link></li>
              
              <li className="px-4 py-2 text-sm font-bold text-gray-700 bg-gray-100">Dynamic Programming</li>
              <li><Link href="/algorithms/fibonacci" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">Fibonacci Sequence</Link></li>
              <li><Link href="/algorithms/longest-common-subsequence" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">Longest Common Subsequence</Link></li>
              <li><Link href="/algorithms/knapsack" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">Knapsack Problem</Link></li>
              
              <li className="px-4 py-2 text-sm font-bold text-gray-700 bg-gray-100">String Matching</li>
              <li><Link href="/algorithms/naive-string-matching" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">Naive String Matching</Link></li>
              <li><Link href="/algorithms/kmp" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">Knuth-Morris-Pratt</Link></li>
              
              <li className="px-4 py-2 text-sm font-bold text-gray-700 bg-gray-100">Graph Algorithms</li>
              <li><Link href="/algorithms/dijkstra" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">Dijkstra's Shortest Path</Link></li>
              <li><Link href="/algorithms/kruskal" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">Kruskal's Minimum Spanning Tree</Link></li>
              <li><Link href="/algorithms/prim" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">Prim's Minimum Spanning Tree</Link></li>
              <li><Link href="/algorithms/topological-sort" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">Topological Sort</Link></li>
            </ul>
          </li>
          <li className="relative group">
            <button className="hover:text-indigo-200 transition duration-300">
              Data Structures
            </button>
            <ul className="absolute left-0 hidden pt-2 group-hover:block bg-white shadow-lg rounded-md overflow-hidden w-48">
              <li className="px-4 py-2 text-sm font-bold text-gray-700 bg-gray-100">Linear Data Structures</li>
              <li><Link href="/data-structures/array" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">Array</Link></li>
              <li><Link href="/data-structures/arraylist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">ArrayList</Link></li>
              <li><Link href="/data-structures/linked-list" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">Linked List</Link></li>
              <li><Link href="/data-structures/stack" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">Stack</Link></li>
              <li><Link href="/data-structures/queue" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">Queue</Link></li>
              <li><Link href="/data-structures/deque" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">Deque</Link></li>
              
              <li className="px-4 py-2 text-sm font-bold text-gray-700 bg-gray-100">Tree Data Structures</li>
              <li><Link href="/data-structures/binary-tree" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">Binary Tree</Link></li>
              <li><Link href="/data-structures/bst" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">Binary Search Tree</Link></li>
              <li><Link href="/data-structures/avl-tree" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">AVL Tree</Link></li>
              <li><Link href="/data-structures/red-black-tree" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">Red-Black Tree</Link></li>
              
              <li className="px-4 py-2 text-sm font-bold text-gray-700 bg-gray-100">Heap Data Structures</li>
              <li><Link href="/data-structures/min-heap" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">Min Heap</Link></li>
              <li><Link href="/data-structures/max-heap" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">Max Heap</Link></li>
              
              <li className="px-4 py-2 text-sm font-bold text-gray-700 bg-gray-100">Hash-Based Data Structures</li>
              <li><Link href="/data-structures/hash-table" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">Hash Table</Link></li>
              <li><Link href="/data-structures/map" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">Map</Link></li>
              
              <li className="px-4 py-2 text-sm font-bold text-gray-700 bg-gray-100">Graph Representations</li>
              <li><Link href="/data-structures/adjacency-matrix" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">Adjacency Matrix</Link></li>
              <li><Link href="/data-structures/adjacency-list" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">Adjacency List</Link></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;