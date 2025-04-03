import React from 'react';
import styles from '../styles/status.module.css';

const StatusIndicator = ({ id, name, current, max, onChange }) => {
  const percentage = (current / max) * 100;
  
  let barColor;
  if (percentage > 70) barColor = styles.high;
  else if (percentage > 30) barColor = styles.medium;
  else barColor = styles.low;

  return (
    <div className={styles.statusItem}>
      <div className={styles.statusHeader}>
        <h4>{name}</h4>
        <span>{current}/{max}</span>
      </div>
      
      <div className={styles.progressBar}>
        <div 
          className={`${styles.progressFill} ${barColor}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      <div className={styles.statusControls}>
        <button 
          onClick={() => onChange(id, current - 1)}
          className={styles.decreaseButton}
        >
          -
        </button>
        <input
          type="number"
          value={current}
          onChange={(e) => onChange(id, parseInt(e.target.value) || 0)}
          min="0"
          max={max}
        />
        <button 
          onClick={() => onChange(id, current + 1)}
          className={styles.increaseButton}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default StatusIndicator;