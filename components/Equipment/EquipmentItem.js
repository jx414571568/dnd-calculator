import React from 'react';
import styles from '../styles/equipment.module.css';

const EquipmentItem = ({ item, onEdit, onDelete, onToggleEquip }) => {
  return (
    <div className={`${styles.item} ${item.equipped ? styles.equipped : ''}`}>
      <div className={styles.itemInfo}>
        <h3>{item.name}</h3>
        <p>重量: {item.weight} lb</p>
        <p>属性: {item.attributes.join(', ')}</p>
        {item.description && <p className={styles.description}>{item.description}</p>}
      </div>
      
      <div className={styles.itemActions}>
        <button 
          className={styles.equipButton}
          onClick={onToggleEquip}
        >
          {item.equipped ? '卸下' : '装备'}
        </button>
        <button 
          className={styles.editButton}
          onClick={() => onEdit(item)}
        >
          编辑
        </button>
        <button 
          className={styles.deleteButton}
          onClick={onDelete}
        >
          移除
        </button>
      </div>
    </div>
  );
};

export default EquipmentItem;