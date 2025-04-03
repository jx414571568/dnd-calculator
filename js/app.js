// 应用状态
const appState = {
    turn: 1,
    attributes: ["生命", "生命上限", "力量", "敏捷", "体质", "智力", "感知", "魅力"],
    attributeKeys: ["hp", "hpmax", "str", "dex", "con", "int", "wis", "cha"],
    attributeValues: {
        hp: 8, hpmax: 9, str: 10, dex: 11, con: 12, int: 13, wis: 14, cha: 15
    },
    totalAttributes: { ...this.attributeValues },
    equipment: [],
    statuses: []
};

// 初始化应用
function init() {
    // 设置文件加载监听
    document.getElementById("load_file").addEventListener("change", function (e) {
        fileManager.handleFileLoad(e);
    });
    
    // 初始化UI
    uiManager.init();
    
    // 更新显示
    updateDisplay();
}

// 更新整个应用的显示
function updateDisplay() {
    attributeManager.updateAttributes(); // 先更新属性计算
    attributeManager.renderAttributes();
    equipmentManager.renderEquipment();
    statusManager.renderStatuses();
    healthManager.updateHealthBar();
}

// 启动应用
window.addEventListener('DOMContentLoaded', init);