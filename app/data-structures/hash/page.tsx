// app/data-structures/hash-table/page.tsx
'use client';

import Pseudocode from '../../components/Pseudocode';
const pseudocodeExample = `class HashNode:
    key
    value
    next

class HashTable:
    table
    size
    capacity

    function hash(key):
        hash = 0
        for each character in key:
            hash = (hash * 31 + character code) % capacity
        return hash

    function set(key, value):
        index = hash(key)
        if table[index] is null:
            table[index] = new HashNode(key, value)
        else:
            current = table[index]
            while current is not null:
                if current.key == key:
                    current.value = value
                    return
                if current.next is null:
                    break
                current = current.next
            current.next = new HashNode(key, value)
        size++
        if size > capacity * 0.75:
            resize()
        visualize()

    function get(key):
        index = hash(key)
        current = table[index]
        while current is not null:
            if current.key == key:
                return current.value
            current = current.next
        return null

    function remove(key):
        index = hash(key)
        if table[index] is null:
            return
        if table[index].key == key:
            table[index] = table[index].next
            size--
            visualize()
            return
        current = table[index]
        while current.next is not null:
            if current.next.key == key:
                current.next = current.next.next
                size--
                visualize()
                return
            current = current.next

    function resize():
        newCapacity = capacity * 2
        newTable = new array of size newCapacity
        for each node in table:
            current = node
            while current is not null:
                index = hash(current.key) % newCapacity
                if newTable[index] is null:
                    newTable[index] = new HashNode(current.key, current.value)
                else:
                    temp = newTable[index]
                    while temp.next is not null:
                        temp = temp.next
                    temp.next = new HashNode(current.key, current.value)
                current = current.next
        table = newTable
        capacity = newCapacity
        visualize()`;

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface HashNode {
  key: string;
  value: string;
  next: HashNode | null;
}

class HashTable {
  private table: (HashNode | null)[];
  private size: number;

  constructor(size: number = 10) {
    this.table = new Array(size).fill(null);
    this.size = size;
  }

  private hash(key: string): number {
    let total = 0;
    for (let i = 0; i < key.length; i++) {
      total += key.charCodeAt(i);
    }
    return total % this.size;
  }

  set(key: string, value: string): void {
    const index = this.hash(key);
    if (!this.table[index]) {
      this.table[index] = { key, value, next: null };
    } else {
      let current = this.table[index];
      while (current.next) {
        if (current.key === key) {
          current.value = value;
          return;
        }
        current = current.next;
      }
      if (current.key === key) {
        current.value = value;
      } else {
        current.next = { key, value, next: null };
      }
    }
  }

  get(key: string): string | undefined {
    const index = this.hash(key);
    let current = this.table[index];
    while (current) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
    }
    return undefined;
  }

  remove(key: string): void {
    const index = this.hash(key);
    if (!this.table[index]) {
      return;
    }
    if (this.table[index]!.key === key) {
      this.table[index] = this.table[index]!.next;
      return;
    }
    let current = this.table[index];
    while (current.next) {
      if (current.next.key === key) {
        current.next = current.next.next;
        return;
      }
      current = current.next;
    }
  }

  display(): { index: number; nodes: HashNode[] }[] {
    return this.table.map((node, index) => {
      const nodes: HashNode[] = [];
      let current = node;
      while (current) {
        nodes.push(current);
        current = current.next;
      }
      return { index, nodes };
    }).filter(bucket => bucket.nodes.length > 0);
  }
}

const HashTableVisualization: React.FC = () => {
  const [hashTable] = useState<HashTable>(new HashTable(10));
  const [key, setKey] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [, forceUpdate] = useState<{}>();

  const handleSet = () => {
    if (key && value) {
      hashTable.set(key, value);
      setKey('');
      setValue('');
      setMessage(`Set ${key}: ${value}`);
      forceUpdate({});
    } else {
      setMessage('Please enter both key and value');
    }
  };

  const handleGet = () => {
    if (key) {
      const result = hashTable.get(key);
      setMessage(result ? `Value for ${key}: ${result}` : `${key} not found`);
    } else {
      setMessage('Please enter a key');
    }
  };

  const handleRemove = () => {
    if (key) {
      hashTable.remove(key);
      setKey('');
      setMessage(`Removed ${key}`);
      forceUpdate({});
    } else {
      setMessage('Please enter a key');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Hash Table</h1>
      
      <div className="mb-8">
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Key"
          className="border p-2 mr-2"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Value"
          className="border p-2 mr-2"
        />
        <button onClick={handleSet} className="btn-primary mr-2">Set</button>
        <button onClick={handleGet} className="btn-secondary mr-2">Get</button>
        <button onClick={handleRemove} className="btn-secondary">Remove</button>
      </div>

      <div className="mb-8">
        {hashTable.display().map(({ index, nodes }) => (
          <motion.div key={index} className="mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="font-bold">Bucket {index}:</div>
            <div className="flex">
              {nodes.map((node, nodeIndex) => (
                <motion.div
                  key={nodeIndex}
                  className="bg-blue-500 text-white p-2 rounded mr-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: nodeIndex * 0.1 }}
                >
                  {node.key}: {node.value}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {message && (
        <div className="mb-8 text-green-600 font-semibold">{message}</div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">How Hash Tables Work</h2>
        <p className="text-gray-700">
          A hash table is a data structure that implements an associative array abstract data type, 
          a structure that can map keys to values. It uses a hash function to compute an index into 
          an array of buckets or slots, from which the desired value can be found.
        </p>
        <p className="text-gray-700 mt-2">
          Key operations:
          <ul className="list-disc list-inside mt-2">
            <li>Set (Insert): O(1) average case, O(n) worst case</li>
            <li>Get (Lookup): O(1) average case, O(n) worst case</li>
            <li>Remove (Delete): O(1) average case, O(n) worst case</li>
          </ul>
        </p>
        <p className="text-gray-700 mt-2">
          This implementation uses chaining for collision resolution. When multiple keys hash to the 
          same index, they are stored in a linked list at that index. Other collision resolution 
          techniques include open addressing and double hashing.
        </p>
        <p className="text-gray-700 mt-2">
          Hash tables are widely used because they offer fast average-case performance for many 
          operations, including insertion, deletion, and lookup. They are used in database indexing, 
          caches, symbol tables for compilers, and many other applications.
        </p>
        <Pseudocode code={pseudocodeExample} />
      </div>
    </div>
  );
};

export default HashTableVisualization;