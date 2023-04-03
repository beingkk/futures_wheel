// src/TreeDiagram.js
import React from 'react';

const TreeNode = ({ node, level, onClick }) => {
  return (
    <div className={`tree-node level-${level}`} onClick={() => onClick(node)}>
      <span>{node.text}</span>
      {node.children &&
        node.children.map((childNode) => (
          <TreeNode key={childNode.id} node={childNode} level={level + 1} onClick={onClick} />
        ))}
    </div>
  );
};

const TreeDiagram = ({ data, onNodeClick }) => {
  return (
    <div className="tree-diagram">
      {data.map((node) => (
        <TreeNode key={node.id} node={node} level={0} onClick={onNodeClick} />
      ))}
    </div>
  );
};

export default TreeDiagram;