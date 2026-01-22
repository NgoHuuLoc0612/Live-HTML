class LiveHTMLEditor {
    constructor() {
        this.initialized = false;
        this.version = '1.0.0';
    }

    async init() {
        if (this.initialized) {
            console.warn('Application already initialized');
            return;
        }

        try {
            console.log(`%c Live HTML Editor v${this.version} `, 
                'background: #667eea; color: white; font-size: 16px; padding: 5px 10px; border-radius: 3px;');
            
            await this.initializeManagers();
            this.setupGlobalErrorHandling();
            this.initialized = true;
            
            console.log('%c✓ Application initialized successfully', 
                'color: #4CAF50; font-weight: bold;');
            
            UIManager.showWelcomeMessage();
            
        } catch (error) {
            console.error('Initialization failed:', error);
            this.handleInitializationError(error);
        }
    }

    async initializeManagers() {
        const managers = [
            { name: 'EditorManager', instance: EditorManager },
            { name: 'PreviewManager', instance: PreviewManager },
            { name: 'LibraryManager', instance: LibraryManager },
            { name: 'SnippetManager', instance: SnippetManager },
            { name: 'TemplateManager', instance: TemplateManager },
            { name: 'ConsoleManager', instance: ConsoleManager },
            { name: 'ExportManager', instance: ExportManager },
            { name: 'UIManager', instance: UIManager }
        ];

        for (const manager of managers) {
            try {
                console.log(`Initializing ${manager.name}...`);
                manager.instance.init();
                console.log(`✓ ${manager.name} initialized`);
            } catch (error) {
                console.error(`✗ Failed to initialize ${manager.name}:`, error);
                throw new Error(`Manager initialization failed: ${manager.name}`);
            }
        }
    }

    setupGlobalErrorHandling() {
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
            ConsoleManager.error(`Global Error: ${event.message}`);
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            ConsoleManager.error(`Unhandled Promise: ${event.reason}`);
        });
    }

    handleInitializationError(error) {
        const errorMessage = `
            Failed to initialize Live HTML Editor Pro
            
            Error: ${error.message}
            
            Please refresh the page and try again.
            If the problem persists, please check the console for more details.
        `;

        alert(errorMessage);
        
        document.body.innerHTML = `
            <div style="
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                background: #1e1e1e;
                color: white;
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 20px;
            ">
                <div>
                    <h1 style="color: #F44336; margin-bottom: 20px;">
                        <i class="fas fa-exclamation-triangle"></i>
                        Initialization Error
                    </h1>
                    <p style="font-size: 18px; margin-bottom: 20px;">
                        Failed to start Live HTML Editor Pro
                    </p>
                    <p style="color: #999; margin-bottom: 30px;">
                        ${error.message}
                    </p>
                    <button onclick="location.reload()" style="
                        padding: 15px 30px;
                        background: #2196F3;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        font-size: 16px;
                        cursor: pointer;
                    ">
                        Reload Page
                    </button>
                </div>
            </div>
        `;
    }

    getInfo() {
        return {
            version: this.version,
            initialized: this.initialized,
            managers: {
                editor: EditorManager,
                preview: PreviewManager,
                library: LibraryManager,
                snippet: SnippetManager,
                template: TemplateManager,
                console: ConsoleManager,
                export: ExportManager,
                ui: UIManager
            }
        };
    }

    reset() {
        if (confirm('This will reset the application to default state. Continue?')) {
            StorageManager.clearAll();
            location.reload();
        }
    }
}

const app = new LiveHTMLEditor();

document.addEventListener('DOMContentLoaded', () => {
    app.init().catch(error => {
        console.error('Failed to start application:', error);
    });
});

window.LiveHTMLEditorApp = app;

console.log('%cDebug Mode Enabled', 'color: #FF9800; font-weight: bold;');
console.log('Access app instance via: window.LiveHTMLEditorApp');
console.log('Available commands:');
console.log('  - LiveHTMLEditorApp.getInfo() : Get application info');
console.log('  - LiveHTMLEditorApp.reset() : Reset application');
console.log('  - EditorManager.getContent() : Get current code');
console.log('  - LibraryManager.getActiveLibraries() : Get active libraries');