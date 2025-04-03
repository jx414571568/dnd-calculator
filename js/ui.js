const uiManager = {
    editingIndex: null,
    currentForm: null,

    init() {
        // 初始化滑块
        healthManager.initSlider();
        
        // 初始化状态属性选择器
        document.getElementById("status_attribute_selection").innerHTML = 
            this.createCheckboxes([]);
    },

    showForm(type, index = null) {
        this.hideForms();
        this.currentForm = type;
        this.editingIndex = index;
        
        if (type === 'base_attr') {
            document.getElementById("base_attr_form").classList.remove("hidden");
            document.getElementById("base_attr_inputs").innerHTML = 
                appState.attributeKeys.map((key, i) => `
                    <div class="form-group">
                        <input type="number" id="base_${key}" value="${appState.attributeValues[key]}" 
                               placeholder="${appState.attributes[i]}">
                    </div>
                `).join("");
            return;
        }

        if (type === "equipment") {
            const eq = index !== null ? appState.equipment[index] : null;
            document.getElementById("equip_name").value = eq?.name || "";
            document.getElementById("equip_value").value = eq?.value || 0;
            document.getElementById("equip_type").value = eq?.type || "";
            document.getElementById("equip_attribute_selection").innerHTML =
                this.createCheckboxes(eq?.affectedStats || []);
            document.getElementById("equipment_form").classList.remove("hidden");
        } else if (type === "status") {
            const st = index !== null ? appState.statuses[index] : null;
            document.getElementById("status_name").value = st?.name || "";
            document.getElementById("status_value").value = Math.abs(st?.value) || 1;
            document.getElementById("status_duration").value = st?.duration || 1;
            
            // 设置效果类型
            const effectType = st?.value < 0 ? "debuff" : "buff";
            document.querySelector(`input[name="effect_type"][value="${effectType}"]`).checked = true;
            
            document.getElementById("status_attribute_selection").innerHTML =
                this.createCheckboxes(st?.affectedStats || []);
            document.getElementById("status_form").classList.remove("hidden");
        }
    },

    createCheckboxes(selected) {
        return appState.attributeKeys
            .map((key, i) => `
                <label style="display:flex;align-items:center;gap:4px;font-size:12px;">
                    <input type="checkbox" value="${key}" ${selected?.includes(key) ? "checked" : ""}>
                    ${appState.attributes[i]}
                </label>
            `).join("");
    },

    hideForms() {
        document.querySelectorAll("#base_attr_form, #equipment_form, #status_form").forEach(form => {
            form.classList.add("hidden");
        });
    },

    getSelected(containerId) {
        return Array.from(document.querySelectorAll(`#${containerId} input:checked`))
            .map((e) => e.value);
    }
};