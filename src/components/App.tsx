import React, { useState } from 'react';
import styles from './App.module.scss';

export function App() {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.centered}>
      <h1>Counter: {count}</h1>
      <button className={styles.button} onClick={() => setCount(count + 1)}><span>+</span></button>
      <button className={styles.button} onClick={() => setCount(count - 1)}><span>-</span></button>
    </div>
  );
}
