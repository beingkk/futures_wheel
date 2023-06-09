// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import TreeDiagram from './TreeDiagram';
import './TreeDiagram.css';

const fetchData = () => {
  // Simulate fetching data from a database
  return Promise.resolve([
    {
      id: 1,
      text: 'CORE EVENT',
      children: [
        {
          id: 2,
          text: 'Consequence 1',
          children: [
            {
              id: 3,
              text: 'Sub-consequence 1',
            },
            {
              id: 4,
              text: 'Sub-consequence 2',
            },
          ],
        },
        {
          id: 5,
          text: 'Consequence 2',
          children: [
            {
              id: 6,
              text: 'Sub-consequence 3',
            },
            {
              id: 7,
              text: 'Sub-consequence 4',
            },
          ],
        },
      ],
    },
  ]);
};

const fetchOpenAIResponse = (text) => {
  return fetch('/api/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  }).then((response) => response.json());
};

function App() {
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    fetchData().then((data) => setTreeData(data));
  }, []);

  const handleNodeClick = (node) => {
    fetchOpenAIResponse(node.text).then((response) => {
      console.log(`OpenAI API response: ${response.result}`);
    });
  };

  return (
    <div className="App">
      <main>
        <h1>My app</h1>
        <TreeDiagram data={treeData} onNodeClick={handleNodeClick} />
      </main>
    </div>
  );
}

export default App;
