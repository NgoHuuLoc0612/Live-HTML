const ConsoleManager = {
    consolePanel: null,
    consoleOutput: null,
    errorCount: 0,
    isVisible: false,
    
    init() {
        this.consolePanel = document.getElementById('console-panel');
        this.consoleOutput = document.getElementById('consoleOutput');
        this.setupEventListeners();
    },

    setupEventListeners() {
        document.getElementById('consoleBtn').addEventListener('click', () => {
            this.toggleConsole();
        });

        document.getElementById('clearConsoleBtn').addEventListener('click', () => {
            this.clearConsole();
        });

        document.querySelector('[data-panel="console"]').addEventListener('click', () => {
            this.toggleConsole();
        });
    },

    toggleConsole() {
        this.isVisible = !this.isVisible;
        
        if (this.isVisible) {
            this.consolePanel.classList.remove('hidden');
            document.getElementById('consoleBtn').style.background = 'var(--primary-color)';
        } else {
            this.consolePanel.classList.add('hidden');
            document.getElementById('consoleBtn').style.background = '';
        }
    },

    addMessage(level, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `console-message ${level}`;
        
        const timestamp = new Date().toLocaleTimeString();
        const icon = this.getIconForLevel(level);
        
        messageDiv.innerHTML = `
            <span style="color: var(--text-secondary); margin-right: 10px;">[${timestamp}]</span>
            <span style="margin-right: 5px;">${icon}</span>
            <span>${Utils.escapeHtml(message)}</span>
        `;

        this.consoleOutput.appendChild(messageDiv);
        this.consoleOutput.scrollTop = this.consoleOutput.scrollHeight;

        if (level === 'error') {
            this.errorCount++;
            this.updateErrorCount();
        }

        if (!this.isVisible && level === 'error') {
            this.toggleConsole();
        }
    },

    getIconForLevel(level) {
        const icons = {
            log: '📝',
            error: '❌',
            warn: '⚠️',
            info: 'ℹ️'
        };
        return icons[level] || '📝';
    },

    clearConsole() {
        this.consoleOutput.innerHTML = '';
        this.errorCount = 0;
        this.updateErrorCount();
        Utils.showNotification('Console cleared', 'info');
    },

    updateErrorCount() {
        const badge = document.getElementById('errorCount');
        badge.textContent = this.errorCount;
        
        if (this.errorCount > 0) {
            badge.style.display = 'inline-block';
        } else {
            badge.style.display = 'none';
        }
    },

    log(message) {
        this.addMessage('log', message);
    },

    error(message) {
        this.addMessage('error', message);
    },

    warn(message) {
        this.addMessage('warn', message);
    },

    info(message) {
        this.addMessage('info', message);
    }
};