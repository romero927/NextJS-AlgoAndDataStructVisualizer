// app/algorithms/longest-common-subsequence/page.tsx
'use client';

import Pseudocode from '../../components/Pseudocode';
const pseudocodeExample = `function LCS(X, Y):
    m = length of X
    n = length of Y
    L = 2D array of size (m+1) x (n+1)
    
    for i from 0 to m:
        for j from 0 to n:
            if i == 0 or j == 0:
                L[i][j] = 0
            elif X[i-1] == Y[j-1]:
                L[i][j] = L[i-1][j-1] + 1
            else:
                L[i][j] = max(L[i-1][j], L[i][j-1])
            visualize(L, i, j, X, Y)
    
    return L[m][n]

function visualize(L, i, j, X, Y):
    // Update UI to show:
    // 1. The current state of the L array
    // 2. Highlight the current cell being calculated
    // 3. Show the comparison between X[i-1] and Y[j-1]
    // 4. Indicate which case of the algorithm is being applied`;

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const LongestCommonSubsequence: React.FC = () => {
  const [str1, setStr1] = useState<string>('ABCDGH');
  const [str2, setStr2] = useState<string>('AEDFHR');
  const [lcsMatrix, setLcsMatrix] = useState<number[][]>([]);
  const [lcs, setLcs] = useState<string>('');
  const [currentCell, setCurrentCell] = useState<[number, number] | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const calculateLCS = async () => {
    setIsRunning(true);
    const m = str1.length;
    const n = str2.length;
    const matrix: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) {
      for (let j = 0; j <= n; j++) {
        if (i === 0 || j === 0) {
          matrix[i][j] = 0;
        } else if (str1[i - 1] === str2[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1] + 1;
        } else {
          matrix[i][j] = Math.max(matrix[i - 1][j], matrix[i][j - 1]);
        }
        setLcsMatrix([...matrix]);
        setCurrentCell([i, j]);
        await sleep(100);
      }
    }

    // Backtrack to find LCS
    let i = m, j = n;
    let lcsResult = '';
    while (i > 0 && j > 0) {
      if (str1[i - 1] === str2[j - 1]) {
        lcsResult = str1[i - 1] + lcsResult;
        i--;
        j--;
      } else if (matrix[i - 1][j] > matrix[i][j - 1]) {
        i--;
      } else {
        j--;
      }
      setCurrentCell([i, j]);
      await sleep(200);
    }

    setLcs(lcsResult);
    setCurrentCell(null);
    setIsRunning(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Longest Common Subsequence (Dynamic Programming)</h1>
      
      <div className="mb-8">
        <input
          type="text"
          value={str1}
          onChange={(e) => setStr1(e.target.value.toUpperCase())}
          className="border p-2 mr-4"
          placeholder="String 1"
        />
        <input
          type="text"
          value={str2}
          onChange={(e) => setStr2(e.target.value.toUpperCase())}
          className="border p-2 mr-4"
          placeholder="String 2"
        />
        <button 
          onClick={calculateLCS}
          disabled={isRunning}
          className="btn-primary"
        >
          Calculate LCS
        </button>
      </div>

      <div className="overflow-x-auto mb-8">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2"></th>
              {str2.split('').map((char, index) => (
                <th key={index} className="px-4 py-2">{char}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lcsMatrix.map((row, i) => (
              <tr key={i}>
                <th className="px-4 py-2">{i === 0 ? '' : str1[i - 1]}</th>
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

      {lcs && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Longest Common Subsequence:</h2>
          <p className="text-gray-700 text-xl">{lcs}</p>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">How Longest Common Subsequence Works</h2>
        <p className="text-gray-700">
          The Longest Common Subsequence (LCS) problem is to find the longest subsequence present in both the given 
          sequences. A subsequence is a sequence that appears in the same relative order, but not necessarily contiguous.
        </p>
        <p className="text-gray-700 mt-2">
          The algorithm:
          <ol className="list-decimal list-inside mt-2">
            <li>Create a table to store LCS lengths for all subproblems</li>
            <li>Fill the table using bottom-up dynamic programming</li>
            <li>The value in the bottom-right cell is the length of the LCS</li>
            <li>Backtrack through the table to construct the LCS</li>
          </ol>
        </p>
        <p className="text-gray-700 mt-2">
          This dynamic programming approach solves the problem in O(mn) time complexity, where m and n are the lengths 
          of the input strings.
        </p>
      <Pseudocode code={pseudocodeExample} />
      </div>
    </div>
  );
};

export default LongestCommonSubsequence;