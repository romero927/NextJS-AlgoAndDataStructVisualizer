# Algorithm and Data Structure Visualizer

This project is a comprehensive visualization tool for various algorithms and data structures. It's built using Next.js and TypeScript, providing interactive and animated visualizations to help users understand complex computer science concepts.

## Features

- Interactive visualizations for a wide range of algorithms and data structures
- Animated operations to demonstrate how each structure/algorithm works
- Responsive design for desktop and mobile devices
- Educational explanations for each visualization
- Step-by-step execution for better understanding
- User input for custom scenarios

## Visualizations Included

### Sorting Algorithms
- Bubble Sort
- Quick Sort
- Merge Sort
- Insertion Sort
- Selection Sort
- Heap Sort

### Searching Algorithms
- Binary Search
- Linear Search
- Depth-First Search (DFS)
- Breadth-First Search (BFS)

### Dynamic Programming
- Fibonacci Sequence
- Longest Common Subsequence (LCS)
- Knapsack Problem

### String Matching Algorithms
- Naive String Matching
- Knuth-Morris-Pratt (KMP) Algorithm

### Data Structures
- Array
- ArrayList
- Linked List
- Stack
- Queue
- Deque (Double-ended queue)
- Binary Tree
- Binary Search Tree (BST)
- AVL Tree
- Red-Black Tree
- Min Heap
- Max Heap
- Hash Table
- Map

### Graph Algorithms and Representations
- Adjacency Matrix
- Adjacency List
- Dijkstra's Shortest Path
- Kruskal's Minimum Spanning Tree
- Prim's Minimum Spanning Tree
- Topological Sort

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/algorithm-visualizer.git
   cd algorithm-visualizer
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Run the development server:
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

Navigate through the different visualizations using the navbar. Each visualization page includes:

- Interactive controls to manipulate the data structure or run the algorithm
- Visual representation of the current state
- Step-by-step execution options
- Explanations of how the structure/algorithm works
- Options to input custom data or scenarios

## Docker Support

To run the application using Docker:

1. Build the Docker image:
   ```
   docker build -t algorithm-visualizer .
   ```

2. Run the Docker container:
   ```
   docker run -p 3000:3000 algorithm-visualizer
   ```

3. Access the application at [http://localhost:3000](http://localhost:3000)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework used
- [Framer Motion](https://www.framer.com/motion/) - For smooth animations
- [Tailwind CSS](https://tailwindcss.com/) - For styling