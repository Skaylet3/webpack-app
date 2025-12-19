import React, { useState } from 'react';
import './index.scss';

export function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='centered gapped'>
      <h1>Counter: {count}</h1>
      <button className='button' onClick={() => setCount(count + 1)}><span>+</span></button>
      <button className='button' onClick={() => setCount(count - 1)}><span>-</span></button>
    </div>
  );
}
