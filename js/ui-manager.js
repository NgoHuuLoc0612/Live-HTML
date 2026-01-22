const UIManager = {
    isFullscreen: false,
    
    init() {
        this.setupEventListeners();
        this.loadSettings();
    },

    setupEventListeners() {
        document.getElementById('fullscreenBtn').addEventListener('click', () => {
            this.toggleFullscreen();
        });

        document.getElementById('settingsBtn').addEventListener('click', () => {
            this.openSettings();
        });

        const settingsModal = document.getElementById('settingsModal');
        const closeBtn = settingsModal.querySelector('.close');
        
        closeBtn.addEventListener('click', () => {
            this.closeSettings();
        });

        window.addEventListener('click', (e) => {
            if (e.target === settingsModal) {
                this.closeSettings();
            }
        });

        document.getElementById('lineNumbersToggle').addEventListener('change', (e) => {
            this.toggleLineNumbers(e.target.checked);
        });

        document.getElementById('autoCompleteToggle').addEventListener('change', (e) => {
            this.toggleAutoComplete(e.target.checked);
        });

        document.getElementById('lintingToggle').addEventListener('change', (e) => {
            this.toggleLinting(e.target.checked);
        });

        document.getElementById('updateDelay').addEventListener('change', (e) => {
            CONFIG.autoRunDelay = parseInt(e.target.value);
            StorageManager.saveSetting('autoRunDelay', CONFIG.autoRunDelay);
            Utils.showNotification('Update delay changed', 'success');
        });

        document.querySelectorAll('.panel-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const panel = e.target.closest('.panel-item').dataset.panel;
                this.handlePanelClick(panel);
            });
        });

        window.addEventListener('resize', Utils.debounce(() => {
            this.handleResize();
        }, 250));

        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    },

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            this.isFullscreen = true;
            document.getElementById('fullscreenBtn').innerHTML = '<i class="fas fa-compress"></i>';
        } else {
            document.exitFullscreen();
            this.isFullscreen = false;
            document.getElementById('fullscreenBtn').innerHTML = '<i class="fas fa-expand"></i>';
        }
    },

    openSettings() {
        document.getElementById('settingsModal').classList.add('active');
    },

    closeSettings() {
        document.getElementById('settingsModal').classList.remove('active');
    },

    toggleLineNumbers(show) {
        Object.values(EditorManager.editors).forEach(editor => {
            editor.setOption('lineNumbers', show);
        });
        StorageManager.saveSetting('lineNumbers', show);
    },

    toggleAutoComplete(enable) {
        const extraKeys = enable ? {
            'Ctrl-Space': 'autocomplete',
            'Ctrl-/': 'toggleComment'
        } : {
            'Ctrl-/': 'toggleComment'
        };

        Object.values(EditorManager.editors).forEach(editor => {
            editor.setOption('extraKeys', extraKeys);
        });
        StorageManager.saveSetting('autoComplete', enable);
    },

    toggleLinting(enable) {
        StorageManager.saveSetting('linting', enable);
        Utils.showNotification(`Linting ${enable ? 'enabled' : 'disabled'}`, 'info');
    },

    handlePanelClick(panel) {
        switch(panel) {
            case 'libraries':
                LibraryManager.openModal();
                break;
            case 'snippets':
                SnippetManager.openModal();
                break;
            case 'console':
                ConsoleManager.toggleConsole();
                break;
            case 'assets':
                Utils.showNotification('Assets panel coming soon!', 'info');
                break;
        }
    },

    handleResize() {
        Object.values(EditorManager.editors).forEach(editor => {
            editor.refresh();
        });
    },

    handleKeyboardShortcuts(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key.toLowerCase()) {
                case 's':
                    e.preventDefault();
                    ExportManager.saveProject();
                    break;
                case 'o':
                    e.preventDefault();
                    ExportManager.loadProject();
                    break;
                case 'e':
                    e.preventDefault();
                    ExportManager.exportHTML();
                    break;
                case 'l':
                    e.preventDefault();
                    LibraryManager.openModal();
                    break;
                case 'k':
                    if (e.shiftKey) {
                        e.preventDefault();
                        ConsoleManager.toggleConsole();
                    }
                    break;
                case 'b':
                    e.preventDefault();
                    EditorManager.formatCurrentEditor();
                    break;
            }
        }

        if (e.key === 'F11') {
            e.preventDefault();
            this.toggleFullscreen();
        }
    },

    loadSettings() {
        const lineNumbers = StorageManager.loadSetting('lineNumbers', true);
        document.getElementById('lineNumbersToggle').checked = lineNumbers;
        
        const autoComplete = StorageManager.loadSetting('autoComplete', true);
        document.getElementById('autoCompleteToggle').checked = autoComplete;
        
        const linting = StorageManager.loadSetting('linting', true);
        document.getElementById('lintingToggle').checked = linting;
        
        const updateDelay = StorageManager.loadSetting('autoRunDelay', CONFIG.autoRunDelay);
        document.getElementById('updateDelay').value = updateDelay;
        CONFIG.autoRunDelay = updateDelay;

        const theme = StorageManager.loadSetting('theme', CONFIG.defaultTheme);
        document.getElementById('themeSelector').value = theme;
        EditorManager.changeTheme(theme);

        const fontSize = StorageManager.loadSetting('fontSize', CONFIG.defaultFontSize);
        document.getElementById('fontSizeSelector').value = fontSize;
        EditorManager.changeFontSize(fontSize);
    },

    showWelcomeMessage() {
        const hasSeenWelcome = StorageManager.loadSetting('hasSeenWelcome', false);
        
        if (!hasSeenWelcome) {
            setTimeout(() => {
                const shortcuts = `
Keyboard Shortcuts:
• Ctrl/Cmd + S: Save Project
• Ctrl/Cmd + O: Load Project
• Ctrl/Cmd + E: Export HTML
• Ctrl/Cmd + L: Open Library Manager
• Ctrl/Cmd + Shift + K: Toggle Console
• Ctrl/Cmd + B: Format Code
• F11: Fullscreen
                `.trim();

                alert(`Welcome to Live HTML Editor Pro! 🚀\n\n${shortcuts}`);
                StorageManager.saveSetting('hasSeenWelcome', true);
            }, 1000);
        }
    },

    createTooltips() {
        document.querySelectorAll('[title]').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const tooltip = document.createElement('div');
                tooltip.className = 'custom-tooltip';
                tooltip.textContent = element.getAttribute('title');
                tooltip.style.cssText = `
                    position: fixed;
                    background: var(--bg-tertiary);
                    color: var(--text-primary);
                    padding: 5px 10px;
                    border-radius: 3px;
                    font-size: 12px;
                    pointer-events: none;
                    z-index: 10000;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                `;

                const rect = element.getBoundingClientRect();
                tooltip.style.left = rect.left + 'px';
                tooltip.style.top = (rect.bottom + 5) + 'px';

                document.body.appendChild(tooltip);

                element.addEventListener('mouseleave', () => {
                    tooltip.remove();
                }, { once: true });
            });
        });
    }
};