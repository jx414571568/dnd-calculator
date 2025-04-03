import React from 'react';
import StatusIndicator from './StatusIndicator';
import styles from '../styles/status.module.css';

const StatusPanel = ({ character, onStatusChange }) => {
  const statuses = [
    { id: 'health', name: '生命值', max: character.maxHealth },
    { id: 'mana', name: '法力值', max: character.maxMana },
    { id: 'stamina', name: '耐力', max: character.maxStamina },
  ];

  const handleChange = (id, value) => {
    onStatusChange(id, Math.max(0, Math.min(character[`max${id.charAt(0).toUpperCase() + id.slice(1)}`], value)));
  };

  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>角色状态</h2>
      
      <div className={styles.statusGrid}>
        {statuses.map(status => (
          <StatusIndicator
            key={status.id}
            id={status.id}
            name={status.name}
            current={character[status.id]}
            max={status.max}
            onChange={handleChange}
          />
        ))}
      </div>
      
      <div className={styles.conditions}>
        <h3>状态效果</h3>
        <div className={styles.conditionTags}>
          {character.conditions.map(condition => (
            <span 
              key={condition} 
              className={styles.conditionTag}
            >
              {condition}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusPanel;