const attributeManager = {
    calculateModifier(value) {
        return Math.floor((value - 10) / 2);
    },

    renderAttributes() {
        const container = document.getElementById("attribute_list");
        const attrs = appState.attributes
            .filter((_, i) => !['hp', 'hpmax'].includes(appState.attributeKeys[i]))
            .map((attr, i) => {
                const key = appState.attributeKeys[i+2];
                const mod = this.calculateModifier(appState.totalAttributes[key]);
                return {
                    name: attr,
                    base: appState.attributeValues[key],
                    total: appState.totalAttributes[key],
                    mod: mod,
                    modText: (mod >= 0 ? "+" : "") + mod
                };
            });

        container.innerHTML = attrs.map(attr => `
            <div class="stat">
                <div class="stat-name">${attr.name}</div>
                <div class="stat-value">${attr.total}</div>
                <div class="stat-mod">修正 ${attr.modText}</div>
            </div>
        `).join('');
    },

    saveBaseAttributes() {
        // 保存前先记录旧的生命值上限
        const oldMaxHP = appState.attributeValues.hpmax;
        
        appState.attributeKeys.forEach(key => {
            appState.attributeValues[key] = parseInt(document.getElementById(`base_${key}`).value) || 0;
        });
        
        // 如果生命值上限变化了，调整当前生命值
        if (oldMaxHP !== appState.attributeValues.hpmax) {
            const ratio = appState.attributeValues.hp / oldMaxHP;
            appState.attributeValues.hp = Math.round(appState.attributeValues.hpmax * ratio);
        }
        
        // 确保生命值不超过上限
        appState.attributeValues.hp = Math.min(appState.attributeValues.hp, appState.attributeValues.hpmax);
        
        updateDisplay();
        uiManager.hideForms();
    },

    updateAttributes() {
        // 重置总属性为基础属性
        appState.totalAttributes = { ...appState.attributeValues };

        // 应用装备加成
        appState.equipment.forEach(eq => {
            if (eq.active) {
                eq.affectedStats.forEach(stat => {
                    if (appState.totalAttributes.hasOwnProperty(stat)) {
                        appState.totalAttributes[stat] += eq.value;
                    }
                });
            }
        });

        // 应用状态加成
        appState.statuses.forEach(st => {
            if (st.active && st.remaining > 0) {
                st.affectedStats.forEach(stat => {
                    if (appState.totalAttributes.hasOwnProperty(stat)) {
                        appState.totalAttributes[stat] += st.value;
                    }
                });
            }
        });

        // 确保生命值不超过上限
        appState.totalAttributes.hp = Math.min(appState.totalAttributes.hp, appState.totalAttributes.hpmax);
        this.renderAttributes();
    }
};