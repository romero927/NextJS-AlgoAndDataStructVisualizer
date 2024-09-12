// components/Pseudocode.tsx
import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// Define props type
interface Pseudocode {
  code: string;
}

const Pseudocode: React.FC<Pseudocode> = ({ code }) => {
  return (
    <SyntaxHighlighter language="plaintext" style={docco}>
      {code}
    </SyntaxHighlighter>
  );
};

export default Pseudocode;
