const healthManager = {
    updateHealthBar() {
        const hp = appState.totalAttributes.hp;
        const max = appState.totalAttributes.hpmax;
        const progress = (hp / max) * 100;
        const progressBar = document.getElementById("health_progress");
        
        progressBar.style.width = `${progress}%`;
        document.getElementById("health_text").textContent = `${hp}/${max}`;
    },

    modifyHP(multiplier) {
        const input = document.getElementById('hp_change_value');
        let value = parseInt(input.value) || 0;
        appState.totalAttributes.hp = Math.max(0, 
            Math.min(appState.totalAttributes.hpmax, appState.totalAttributes.hp + value * multiplier));
        this.updateHealthBar();
    },

    updateSlider() {
        const input = document.getElementById('hp_change_value');
        const slider = document.getElementById('hp_slider');
        const value = parseInt(input.value) || 0;
        slider.value = Math.min(20, Math.max(0, value));
    },

    fullHeal() {
        appState.totalAttributes.hp = appState.totalAttributes.hpmax;
        this.updateHealthBar();
    },

    initSlider() {
        const slider = document.getElementById('hp_slider');
        const input = document.getElementById('hp_change_value');
        
        slider.addEventListener('input', function() {
            input.value = this.value;
        });
        
        input.addEventListener('input', function() {
            slider.value = this.value;
        });
    }
};