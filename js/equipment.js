const equipmentManager = {
    saveEquipment() {
        const name = document.getElementById("equip_name").value;
        const value = parseInt(document.getElementById("equip_value").value);
        const affectedStats = uiManager.getSelected("equip_attribute_selection");
        const type = document.getElementById("equip_type").value.trim() || "未分类";
        
        if (name && affectedStats.length) {
            const newItem = { name, value, affectedStats, type, active: true };
            if (uiManager.editingIndex !== null) appState.equipment[uiManager.editingIndex] = newItem;
            else appState.equipment.push(newItem);
            updateDisplay();
        }
        uiManager.hideForms();
    },

    renderEquipment() {
        const list = document.getElementById("equipment_list");
        list.innerHTML = appState.equipment.map((eq, i) => `
            <li class="list-item">
                <input type="checkbox" ${eq.active ? "checked" : ""} 
                       onchange="equipmentManager.toggleItem(${i})">
                <div class="list-item-content">
                    <strong>${eq.name}</strong> <small>(${eq.type} +${eq.value})</small>
                </div>
                <div class="list-item-actions">
                    <button class="btn btn-sm" onclick="uiManager.showForm('equipment', ${i})">编辑</button>
                    <button class="btn btn-sm btn-danger" onclick="equipmentManager.removeItem(${i})">×</button>
                </div>
            </li>
        `).join("");
    },

    toggleItem(index) {
        appState.equipment[index].active = !appState.equipment[index].active;
        attributeManager.updateAttributes();
    },

    removeItem(index) {
        appState.equipment.splice(index, 1);
        updateDisplay();
    }
};