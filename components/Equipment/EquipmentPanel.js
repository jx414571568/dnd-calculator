import React, { useState } from 'react';
import styles from '../styles/equipment.module.css';
import EquipmentItem from './EquipmentItem';
import EquipmentForm from './EquipmentForm';

const EquipmentPanel = ({ character, onUpdate }) => {
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleSubmit = (updatedItem) => {
    onUpdate(updatedItem);
    setShowForm(false);
    setEditingItem(null);
  };

  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>装备管理</h2>
      
      <button 
        className={styles.addButton}
        onClick={() => setShowForm(true)}
      >
        + 添加装备
      </button>
      
      {showForm && (
        <EquipmentForm 
          item={editingItem}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
      
      <div className={styles.equipmentList}>
        {character.equipment.map(item => (
          <EquipmentItem 
            key={item.id}
            item={item}
            onEdit={handleEdit}
            onDelete={() => onUpdate({...item, equipped: false})}
            onToggleEquip={() => onUpdate({...item, equipped: !item.equipped})}
          />
        ))}
      </div>
    </div>
  );
};

export default EquipmentPanel;