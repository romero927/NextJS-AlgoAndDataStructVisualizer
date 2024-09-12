// app/algorithms/knapsack/page.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Item {
  weight: number;
  value: number;
}

const KnapsackProblem: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    { weight: 10, value: 60 },
    { weight: 20, value: 100 },
    { weight: 30, value: 120 }
  ]);
  const [capacity, setCapacity] = useState<number>(50);
  const [dpTable, setDpTable] = useState<number[][]>([]);
  const [selectedItems, setSelectedItems] = useState<boolean[]>([]);
  const [currentCell, setCurrentCell] = useState<[number, number] | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const solveKnapsack = async () => {
    setIsRunning(true);
    const n = items.length;
    const dp: number[][] = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));

    for (let i = 1; i <= n; i++) {
      for (let w = 0; w <= capacity; w++) {
        if (items[i - 1].weight <= w) {
          dp[i][w] = Math.max(
            items[i - 1].value + dp[i - 1][w - items[i - 1].weight],
            dp[i - 1][w]
          );
        } else {
          dp[i][w] = dp[i - 1][w];
        }
        setDpTable([...dp]);
        setCurrentCell([i, w]);
        await sleep(50);
      }
    }

    // Backtrack to find selected items
    let w = capacity;
    const selected: boolean[] = new Array(n).fill(false);
    for (let i = n; i > 0 && w > 0; i--) {
      if (dp[i][w] !== dp[i - 1][w]) {
        selected[i - 1] = true;
        w -= items[i - 1].weight;
      }
      setSelectedItems([...selected]);
      setCurrentCell([i, w]);
      await sleep(200);
    }

    setCurrentCell(null);
    setIsRunning(false);
  };

  const addItem = () => {
    setItems([...items, { weight: 10, value: 50 }]);
  };

  const updateItem = (index: number, field: 'weight' | 'value', value: number) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Knapsack Problem (Dynamic Programming)</h1>
      
      <div className="mb-8">
        <label className="block mb-2">Knapsack Capacity:</label>
        <input
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(Math.max(1, parseInt(e.target.value) || 1))}
          className="border p-2 mr-4"
          min="1"
        />
        <button 
          onClick={solveKnapsack}
          disabled={isRunning}
          className="btn-primary"
        >
          Solve Knapsack
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Items:</h2>
        {items.map((item, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="number"
              value={item.weight}
              onChange={(e) => updateItem(index, 'weight', parseInt(e.target.value) || 0)}
              className="border p-2 mr-2 w-20"
              placeholder="Weight"
            />
            <input
              type="number"
              value={item.value}
              onChange={(e) => updateItem(index, 'value', parseInt(e.target.value) || 0)}
              className="border p-2 mr-2 w-20"
              placeholder="Value"
            />
            <button onClick={() => removeItem(index)} className="btn-secondary">Remove</button>
            {selectedItems[index] && <span className="ml-2 text-green-500">Selected</span>}
          </div>
        ))}
        <button onClick={addItem} className="btn-secondary mt-2">Add Item</button>
      </div>

      <div className="overflow-x-auto mb-8">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Weight →<br />Item ↓</th>
              {Array.from({ length: capacity + 1 }, (_, i) => (
                <th key={i} className="px-4 py-2">{i}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dpTable.map((row, i) => (
              <tr key={i}>
                <th className="px-4 py-2">{i === 0 ? 0 : items[i - 1].weight}</th>
                {row.map((cell, j) => (
                  <motion.td
                    key={j}
                    className={`px-4 py-2 border ${
                      currentCell && currentCell[0] === i && currentCell[1] === j
                        ? 'bg-yellow-300'
                        : ''
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
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

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">How the Knapsack Problem Works</h2>
        <p className="text-gray-700">
          The Knapsack problem is a problem in combinatorial optimization: Given a set of items, each with a weight and a value, 
          determine the number of each item to include in a collection so that the total weight is less than or equal to a given 
          limit and the total value is as large as possible.
        </p>
        <p className="text-gray-700 mt-2">
          The algorithm:
          <ol className="list-decimal list-inside mt-2">
            <li>Create a table where rows represent items and columns represent weights from 0 to the knapsack capacity</li>
            <li>Fill the table using bottom-up dynamic programming</li>
            <li>For each cell, decide whether to include the current item or not, based on which choice maximizes value</li>
            <li>The value in the bottom-right cell is the maximum achievable value</li>
            <li>Backtrack through the table to determine which items were selected</li>
          </ol>
        </p>
        <p className="text-gray-700 mt-2">
          This dynamic programming approach solves the problem in O(nW) time complexity, where n is the number of items 
          and W is the knapsack capacity.
        </p>
      </div>
    </div>
  );
};

export default KnapsackProblem;