const EditorManager = {
    editors: {},
    currentTab: 'html',
    
    init() {
        this.initializeEditors();
        this.setupEventListeners();
        this.loadAutoSave();
    },

    initializeEditors() {
        const editorConfigs = {
            html: {
                element: document.getElementById('htmlEditor'),
                mode: 'htmlmixed',
                icon: 'fab fa-html5'
            },
            css: {
                element: document.getElementById('cssEditor'),
                mode: 'css',
                icon: 'fab fa-css3-alt'
            },
            js: {
                element: document.getElementById('jsEditor'),
                mode: 'javascript',
                icon: 'fab fa-js'
            }
        };

        Object.keys(editorConfigs).forEach(key => {
            const config = editorConfigs[key];
            const options = {
                ...CONFIG.editorOptions,
                mode: config.mode
            };
            
            this.editors[key] = CodeMirror.fromTextArea(config.element, options);
            
            this.editors[key].on('change', Utils.debounce(() => {
                this.handleEditorChange(key);
            }, CONFIG.autoRunDelay));
        });

        this.setDefaultContent();
    },

    setDefaultContent() {
        this.editors.html.setValue(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live HTML Editor</title>
</head>
<body>
    <div class="container">
        <h1>Welcome to Live HTML Editor Pro!</h1>
        <p>Start coding and see your changes in real-time.</p>
    </div>
</body>
</html>`);

        this.editors.css.setValue(`body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.container {
    max-width: 800px;
    margin: 50px auto;
    padding: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

h1 {
    font-size: 2.5em;
    margin-bottom: 20px;
}

p {
    font-size: 1.2em;
    line-height: 1.6;
}`);

        this.editors.js.setValue(`console.log('Welcome to Live HTML Editor Pro!');

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    
    if (container) {
        container.addEventListener('click', () => {
            console.log('Container clicked!');
        });
    }
});`);
    },

    setupEventListeners() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        document.querySelectorAll('.editor-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.closest('.editor-action-btn').dataset.action;
                const wrapper = e.target.closest('.editor-wrapper');
                const editorType = this.getEditorTypeFromWrapper(wrapper);
                this.handleEditorAction(action, editorType);
            });
        });

        document.getElementById('formatBtn').addEventListener('click', () => {
            this.formatCurrentEditor();
        });

        document.getElementById('undoBtn').addEventListener('click', () => {
            this.editors[this.currentTab].undo();
        });

        document.getElementById('redoBtn').addEventListener('click', () => {
            this.editors[this.currentTab].redo();
        });

        document.getElementById('themeSelector').addEventListener('change', (e) => {
            this.changeTheme(e.target.value);
        });

        document.getElementById('fontSizeSelector').addEventListener('change', (e) => {
            this.changeFontSize(parseInt(e.target.value));
        });
    },

    getEditorTypeFromWrapper(wrapper) {
        const wrappers = Array.from(document.querySelectorAll('.editor-wrapper'));
        const index = wrappers.indexOf(wrapper);
        return ['html', 'css', 'js'][index];
    },

    switchTab(tab) {
        this.currentTab = tab;
        
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });

        const wrappers = document.querySelectorAll('.editor-wrapper');
        wrappers.forEach((wrapper, index) => {
            const types = ['html', 'css', 'js'];
            wrapper.style.display = types[index] === tab ? 'flex' : 'none';
        });

        this.editors[tab].refresh();
    },

    handleEditorAction(action, editorType) {
        const editor = this.editors[editorType];
        
        switch(action) {
            case 'copy':
                Utils.copyToClipboard(editor.getValue());
                break;
            case 'clear':
                if (confirm('Are you sure you want to clear this editor?')) {
                    editor.setValue('');
                }
                break;
        }
    },

    handleEditorChange(editorType) {
        const autoRun = document.getElementById('autoRunToggle').checked;
        
        if (autoRun) {
            PreviewManager.updatePreview();
        }

        this.autoSave();
    },

    formatCurrentEditor() {
        const editor = this.editors[this.currentTab];
        const code = editor.getValue();
        const formatted = Utils.formatCode(code, this.currentTab);
        editor.setValue(formatted);
        Utils.showNotification('Code formatted!', 'success');
    },

    changeTheme(theme) {
        Object.values(this.editors).forEach(editor => {
            editor.setOption('theme', theme);
        });
        StorageManager.saveSetting('theme', theme);
    },

    changeFontSize(size) {
        document.querySelectorAll('.CodeMirror').forEach(cm => {
            cm.style.fontSize = size + 'px';
        });
        
        Object.values(this.editors).forEach(editor => {
            editor.refresh();
        });
        
        StorageManager.saveSetting('fontSize', size);
    },

    getContent() {
        return {
            html: this.editors.html.getValue(),
            css: this.editors.css.getValue(),
            js: this.editors.js.getValue()
        };
    },

    setContent(content) {
        if (content.html !== undefined) this.editors.html.setValue(content.html);
        if (content.css !== undefined) this.editors.css.setValue(content.css);
        if (content.js !== undefined) this.editors.js.setValue(content.js);
    },

    clearAll() {
        Object.values(this.editors).forEach(editor => {
            editor.setValue('');
        });
    },

    autoSave() {
        const content = this.getContent();
        StorageManager.autoSave(content);
    },

    loadAutoSave() {
        const saved = StorageManager.loadAutoSave();
        if (saved) {
            this.setContent(saved);
        }
    },

    insertSnippet(code) {
        const editor = this.editors[this.currentTab];
        const cursor = editor.getCursor();
        editor.replaceRange(code, cursor);
        editor.focus();
    }
};