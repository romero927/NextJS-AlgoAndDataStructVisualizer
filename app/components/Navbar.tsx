// components/Navbar.tsx
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-indigo-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
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
            <ul className="absolute left-0 hidden pt-2 group-hover:block bg-white shadow-lg rounded-md overflow-hidden">
              <li>
                <Link href="/algorithms/sorting" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Sorting
                </Link>
              </li>
              <li>
                <Link href="/algorithms/searching" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Searching
                </Link>
              </li>
              <li>
                <Link href="/algorithms/graph" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Graph
                </Link>
              </li>
              <li>
                <Link href="/algorithms/dynamic-programming" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Dynamic Programming
                </Link>
              </li>
              <li>
                <Link href="/algorithms/string-matching" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  String Matching
                </Link>
              </li>
            </ul>
          </li>
          <li className="relative group">
            <button className="hover:text-indigo-200 transition duration-300">
              Data Structures
            </button>
            <ul className="absolute left-0 hidden pt-2 group-hover:block bg-white shadow-lg rounded-md overflow-hidden">
              <li>
                <Link href="/data-structures/linear" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Linear
                </Link>
              </li>
              <li>
                <Link href="/data-structures/tree" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Tree
                </Link>
              </li>
              <li>
                <Link href="/data-structures/graph" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Graph
                </Link>
              </li>
              <li>
                <Link href="/data-structures/hash" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300">
                  Hash-based
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