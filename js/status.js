const statusManager = {
    saveStatus() {
        const name = document.getElementById("status_name").value;
        let value = parseInt(document.getElementById("status_value").value);
        const duration = parseInt(document.getElementById("status_duration").value);
        const affectedStats = uiManager.getSelected("status_attribute_selection");
        
        // 根据选择的类型调整数值
        const effectType = document.querySelector('input[name="effect_type"]:checked').value;
        if (effectType === 'debuff') {
            value = -Math.abs(value);
        } else {
            value = Math.abs(value);
        }
        
        if (name && affectedStats.length) {
            const newItem = {
                name, 
                value, 
                duration, 
                remaining: duration,
                affectedStats, 
                type: effectType === 'buff' ? '增益' : '减益',
                active: true
            };
            if (uiManager.editingIndex !== null) appState.statuses[uiManager.editingIndex] = newItem;
            else appState.statuses.push(newItem);
            updateDisplay();
        }
        uiManager.hideForms();
    },

    renderStatuses() {
        const list = document.getElementById("status_list");
        list.innerHTML = appState.statuses.map((st, i) => {
            const effectClass = st.value > 0 ? 'buff-tag' : 'debuff-tag';
            return `
            <li class="list-item ${st.remaining <= 0 ? "expired" : ""}">
                <input type="checkbox" ${st.active ? "checked" : ""} 
                       onchange="statusManager.toggleItem(${i})" 
                       ${st.remaining <= 0 ? "disabled" : ""}>
                <div class="list-item-content">
                    <strong>${st.name}</strong>
                    <span class="effect-tag ${effectClass}">${st.type}</span>
                    <small>(${st.value > 0 ? "+" : ""}${st.value}, 剩余 ${st.remaining}回合)</small>
                </div>
                <div class="list-item-actions">
                    <button class="btn btn-sm" onclick="uiManager.showForm('status', ${i})" 
                            ${st.remaining <= 0 ? "disabled" : ""}>编辑</button>
                    <button class="btn btn-sm btn-danger" onclick="statusManager.removeItem(${i})">×</button>
                </div>
            </li>
            `;
        }).join("");
    },

    toggleItem(index) {
        appState.statuses[index].active = !appState.statuses[index].active;
        attributeManager.updateAttributes();
    },

    removeItem(index) {
        appState.statuses.splice(index, 1);
        updateDisplay();
    },

    nextTurn() {
        appState.turn++;
        appState.statuses.forEach((st) => {
            if (st.active && st.remaining > 0) {
                st.remaining--;
                if (st.remaining <= 0) st.active = false;
            }
        });
        document.getElementById("turn_counter").textContent = appState.turn;
        updateDisplay();
    }
};