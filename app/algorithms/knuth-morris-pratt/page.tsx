// app/algorithms/knuth-morris-pratt/page.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const KnuthMorrisPratt: React.FC = () => {
  const [text, setText] = useState<string>("ABABDABACDABABCABAB");
  const [pattern, setPattern] = useState<string>("ABABCABAB");
  const [currentPosition, setCurrentPosition] = useState<number>(-1);
  const [matchPositions, setMatchPositions] = useState<number[]>([]);
  const [lpsArray, setLpsArray] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const computeLPSArray = async (pat: string) => {
    const m = pat.length;
    const lps = new Array(m).fill(0);
    let len = 0;
    let i = 1;

    while (i < m) {
      if (pat[i] === pat[len]) {
        len++;
        lps[i] = len;
        i++;
      } else {
        if (len !== 0) {
          len = lps[len - 1];
        } else {
          lps[i] = 0;
          i++;
        }
      }
      setLpsArray([...lps]);
      await sleep(200);
    }

    return lps;
  };

  const kmpSearch = async () => {
    setIsRunning(true);
    setMatchPositions([]);
    setLpsArray([]);
    const n = text.length;
    const m = pattern.length;

    const lps = await computeLPSArray(pattern);

    let i = 0;
    let j = 0;
    while (i < n) {
      setCurrentPosition(i);
      await sleep(300);

      if (pattern[j] === text[i]) {
        i++;
        j++;
      }

      if (j === m) {
        setMatchPositions(prev => [...prev, i - j]);
        j = lps[j - 1];
        await sleep(500);
      } else if (i < n && pattern[j] !== text[i]) {
        if (j !== 0) {
          j = lps[j - 1];
        } else {
          i++;
        }
      }
    }

    setCurrentPosition(-1);
    setIsRunning(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Knuth-Morris-Pratt (KMP) Algorithm</h1>
      
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
          onClick={kmpSearch}
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

      {lpsArray.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600">LPS Array:</h2>
          <div className="flex">
            {pattern.split('').map((char, index) => (
              <div key={index} className="flex flex-col items-center mr-4">
                <span className="mb-2">{char}</span>
                <span className="bg-blue-200 px-2 py-1 rounded">{lpsArray[index]}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {matchPositions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Matches found at positions:</h2>
          <p className="text-gray-700">{matchPositions.join(', ')}</p>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">How KMP Algorithm Works</h2>
        <p className="text-gray-700">
          The Knuth-Morris-Pratt (KMP) algorithm is an efficient string matching algorithm that uses the 
          observation that when a mismatch occurs, the pattern itself embodies sufficient information to 
          determine where the next match could begin, thus bypassing re-examination of previously matched characters.
        </p>
        <p className="text-gray-700 mt-2">
          The algorithm:
          <ol className="list-decimal list-inside mt-2">
            <li>Preprocess the pattern to create a Longest Proper Prefix which is also Suffix (LPS) array</li>
            <li>Use the LPS array to decide the next positions to match</li>
            <li>Skip characters that we know will anyway match</li>
          </ol>
        </p>
        <p className="text-gray-700 mt-2">
          The KMP algorithm has a time complexity of O(n+m), where n is the length of the text and m is 
          the length of the pattern. This makes it much more efficient than the naive approach, especially 
          for large texts and patterns.
        </p>
      </div>
    </div>
  );
};

export default KnuthMorrisPratt;