import React, { useState, useEffect } from 'react';
import styles from '../styles/equipment.module.css';

const EquipmentForm = ({ item, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    weight: 0,
    equipped: false,
    attributes: [],
    description: ''
  });

  useEffect(() => {
    if (item) {
      setFormData(item);
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAttributeChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({ ...prev, attributes: options }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = item 
      ? { ...formData } 
      : { ...formData, id: Date.now().toString() };
    onSubmit(dataToSubmit);
  };

  return (
    <div className={styles.formOverlay}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3>{item ? '编辑装备' : '添加新装备'}</h3>
        
        <label>
          名称:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        
        <label>
          重量 (lb):
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            min="0"
            step="0.1"
          />
        </label>
        
        <label>
          属性加成:
          <select 
            multiple
            value={formData.attributes}
            onChange={handleAttributeChange}
            className={styles.attributeSelect}
          >
            <option value="strength">力量</option>
            <option value="dexterity">敏捷</option>
            <option value="constitution">体质</option>
            <option value="intelligence">智力</option>
            <option value="wisdom">感知</option>
            <option value="charisma">魅力</option>
            <option value="ac">护甲等级</option>
            <option value="initiative">先攻</option>
          </select>
        </label>
        
        <label>
          描述:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          />
        </label>
        
        <div className={styles.formButtons}>
          <button type="submit" className={styles.saveButton}>
            保存
          </button>
          <button 
            type="button" 
            onClick={onCancel}
            className={styles.cancelButton}
          >
            取消
          </button>
        </div>
      </form>
    </div>
  );
};

export default EquipmentForm;