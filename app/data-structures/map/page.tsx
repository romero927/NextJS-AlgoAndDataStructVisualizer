// app/data-structures/map/page.tsx
'use client';

import Pseudocode from '../../components/Pseudocode';
const pseudocodeExample = `class MapNode:
    key
    value

class Map:
    buckets = array of linked lists
    size = 0
    capacity

    function hash(key):
        // Implement a hash function
        return hash value

    function set(key, value):
        index = hash(key) % capacity
        for node in buckets[index]:
            if node.key == key:
                node.value = value
                visualize("update", key, value, index)
                return
        buckets[index].append(new MapNode(key, value))
        size = size + 1
        visualize("insert", key, value, index)
        if size > capacity * 0.75:
            resize()

    function get(key):
        index = hash(key) % capacity
        for node in buckets[index]:
            if node.key == key:
                visualize("get", key, node.value, index)
                return node.value
        visualize("get", key, null, index)
        return null

    function remove(key):
        index = hash(key) % capacity
        for i, node in enumerate(buckets[index]):
            if node.key == key:
                buckets[index].pop(i)
                size = size - 1
                visualize("remove", key, node.value, index)
                return node.value
        visualize("remove", key, null, index)
        return null

    function resize():
        newCapacity = capacity * 2
        newBuckets = array of newCapacity linked lists
        for bucket in buckets:
            for node in bucket:
                newIndex = hash(node.key) % newCapacity
                newBuckets[newIndex].append(node)
        buckets = newBuckets
        capacity = newCapacity
        visualize("resize", null, null, null)

    function visualize(operation, key, value, index):
        // Update UI to show:
        // 1. The current state of the Map (buckets and their contents)
        // 2. Highlight the bucket involved in the current operation
        // 3. Show the key-value pair being operated on
        // 4. Indicate the type of operation (insert, update, get, remove, resize)
        // 5. For resize operation, show the before and after states`;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MapEntry {
  key: string;
  value: string;
}

const MapVisualization: React.FC = () => {
  const [map, setMap] = useState<Map<string, string>>(new Map());
  const [inputKey, setInputKey] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const addEntry = () => {
    if (inputKey.trim() !== '' && inputValue.trim() !== '') {
      setMap(new Map(map.set(inputKey, inputValue)));
      setInputKey('');
      setInputValue('');
      setMessage(`Added key-value pair: ${inputKey} => ${inputValue}`);
    } else {
      setMessage('Please enter both key and value.');
    }
  };

  const getEntry = () => {
    if (inputKey.trim() !== '') {
      const value = map.get(inputKey);
      if (value !== undefined) {
        setMessage(`Value for key "${inputKey}": ${value}`);
      } else {
        setMessage(`Key "${inputKey}" not found in the map.`);
      }
    } else {
      setMessage('Please enter a key to get.');
    }
  };

  const updateEntry = () => {
    if (inputKey.trim() !== '' && inputValue.trim() !== '') {
      if (map.has(inputKey)) {
        setMap(new Map(map.set(inputKey, inputValue)));
        setInputKey('');
        setInputValue('');
        setMessage(`Updated value for key "${inputKey}" to "${inputValue}"`);
      } else {
        setMessage(`Key "${inputKey}" not found. Use 'Add' to create a new entry.`);
      }
    } else {
      setMessage('Please enter both key and value to update.');
    }
  };

  const deleteEntry = () => {
    if (inputKey.trim() !== '') {
      if (map.has(inputKey)) {
        const newMap = new Map(map);
        newMap.delete(inputKey);
        setMap(newMap);
        setInputKey('');
        setMessage(`Deleted entry with key "${inputKey}"`);
      } else {
        setMessage(`Key "${inputKey}" not found in the map.`);
      }
    } else {
      setMessage('Please enter a key to delete.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Map Data Structure</h1>
      
      <div className="mb-8">
        <input
          type="text"
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
          placeholder="Enter key"
          className="border p-2 mr-2"
        />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter value"
          className="border p-2 mr-2"
        />
        <button onClick={addEntry} className="btn-primary mr-2">Add</button>
        <button onClick={getEntry} className="btn-primary mr-2">Get</button>
        <button onClick={updateEntry} className="btn-primary mr-2">Update</button>
        <button onClick={deleteEntry} className="btn-primary">Delete</button>
      </div>

      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence>
          {Array.from(map).map(([key, value]) => (
            <motion.div
              key={key}
              className="bg-blue-500 text-white p-4 rounded shadow"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="font-bold">{key}</div>
              <div>{value}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {message && (
        <div className="mb-8 text-green-600 font-semibold">{message}</div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">How Map Works</h2>
        <p className="text-gray-700">
          A Map is a collection of key-value pairs where each key is unique. It allows fast retrieval 
          of values based on their associated keys.
        </p>
        <p className="text-gray-700 mt-2">
          Key operations:
          <ul className="list-disc list-inside mt-2">
            <li>Add: Inserts a new key-value pair into the map</li>
            <li>Get: Retrieves the value associated with a given key</li>
            <li>Update: Modifies the value associated with an existing key</li>
            <li>Delete: Removes a key-value pair from the map</li>
          </ul>
        </p>
        <p className="text-gray-700 mt-2">
          Time complexities (average case):
          <ul className="list-disc list-inside mt-2">
            <li>Add: O(1)</li>
            <li>Get: O(1)</li>
            <li>Update: O(1)</li>
            <li>Delete: O(1)</li>
          </ul>
        </p>
        <p className="text-gray-700 mt-2">
          Maps are used in various applications such as caching, storing configuration settings, 
          counting occurrences of elements, and implementing associative arrays. They provide fast 
          access to values and are particularly useful when you need to quickly look up data based on unique keys.
        </p>
        <Pseudocode code={pseudocodeExample} />
      </div>
    </div>
  );
};

export default MapVisualization;