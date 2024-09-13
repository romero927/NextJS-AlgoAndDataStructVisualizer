// app/algorithms/naive-string-matching/page.tsx
'use client';

import Pseudocode from '../../components/Pseudocode';
const pseudocodeExample = `function naiveStringMatch(text, pattern):
    n = length of text
    m = length of pattern
    
    for i from 0 to n - m:
        j = 0
        while j < m and text[i + j] == pattern[j]:
            j = j + 1
            visualize(text, pattern, i, j)
        if j == m:
            print "Pattern found at index", i

function visualize(text, pattern, i, j):
    // Update UI to show:
    // 1. The full text with the current window highlighted
    // 2. The pattern below the text, aligned with the current window
    // 3. Highlight matching characters
    // 4. Indicate the current comparison`;

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const NaiveStringMatching: React.FC = () => {
  const [text, setText] = useState<string>("ABABDABACDABABCABAB");
  const [pattern, setPattern] = useState<string>("ABABCABAB");
  const [currentPosition, setCurrentPosition] = useState<number>(-1);
  const [matchPositions, setMatchPositions] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const naiveStringMatch = async () => {
    setIsRunning(true);
    setMatchPositions([]);
    const n = text.length;
    const m = pattern.length;

    for (let i = 0; i <= n - m; i++) {
      setCurrentPosition(i);
      await sleep(500);

      let j;
      for (j = 0; j < m; j++) {
        if (text[i + j] !== pattern[j]) {
          break;
        }
        await sleep(100);
      }

      if (j === m) {
        setMatchPositions(prev => [...prev, i]);
        await sleep(500);
      }
    }

    setCurrentPosition(-1);
    setIsRunning(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Naive String Matching Algorithm</h1>
      
      <div className="mb-8">
        <label className="block mb-2">Text:</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value.toUpperCase())}
          className="border p-2 w-full mb-4"
        />
        <label className="block mb-2">Pattern:</label>
        <input
          type="text"
          value={pattern}
          onChange={(e) => setPattern(e.target.value.toUpperCase())}
          className="border p-2 w-full mb-4"
        />
        <button 
          onClick={naiveStringMatch}
          disabled={isRunning}
          className="btn-primary"
        >
          Find Matches
        </button>
      </div>

      <div className="mb-8 font-mono text-2xl">
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            className={`inline-block ${
              matchPositions.some(pos => index >= pos && index < pos + pattern.length)
                ? 'bg-green-300'
                : index === currentPosition
                ? 'bg-yellow-300'
                : ''
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      {matchPositions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Matches found at positions:</h2>
          <p className="text-gray-700">{matchPositions.join(', ')}</p>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">How Naive String Matching Works</h2>
        <p className="text-gray-700">
          The Naive String Matching algorithm is a simple and straightforward method for finding all occurrences 
          of a pattern string within a larger text string.
        </p>
        <p className="text-gray-700 mt-2">
          The algorithm:
          <ol className="list-decimal list-inside mt-2">
            <li>Slide the pattern over the text one by one</li>
            <li>For each position, compare the characters of the pattern with the text</li>
            <li>If all characters match, we've found an occurrence of the pattern</li>
            <li>Move to the next position and repeat</li>
          </ol>
        </p>
        <p className="text-gray-700 mt-2">
          While simple to implement, this algorithm has a time complexity of O(nm), where n is the length of the 
          text and m is the length of the pattern. This can be inefficient for large texts or patterns.
        </p>
        <Pseudocode code={pseudocodeExample} />
      </div>
    </div>
  );
};

export default NaiveStringMatching;