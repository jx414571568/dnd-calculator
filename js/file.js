const fileManager = {
    saveToFile() {
        const fileName = document.getElementById("save_name").value || "dnd_character";
        const data = {
            turn: appState.turn,
            attributeValues: appState.attributeValues,
            equipment: appState.equipment.map((eq) => ({ ...eq })),
            statuses: appState.statuses.map((st) => ({ ...st }))
        };

        const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${fileName}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    loadFromFile() {
        document.getElementById("load_file").click();
    },

    handleFileLoad(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (event) {
            try {
                const data = JSON.parse(event.target.result);
                if (!data.attributeValues) throw new Error("无效的存档文件");

                appState.turn = data.turn || 1;
                appState.attributeValues = data.attributeValues || {};
                appState.equipment.splice(0, Infinity, ...(data.equipment || []));
                appState.statuses.splice(0, Infinity, ...(data.statuses || []));
                
                document.getElementById("turn_counter").textContent = appState.turn;
                updateDisplay();
                alert("存档加载成功！");
            } catch (error) {
                alert("文件加载失败: " + error.message);
            }
        };
        reader.readAsText(file);
    }
};