const ExportManager = {
    init() {
        this.setupEventListeners();
    },

    setupEventListeners() {
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.showExportOptions();
        });

        document.getElementById('saveProjectBtn').addEventListener('click', () => {
            this.saveProject();
        });

        document.getElementById('loadProjectBtn').addEventListener('click', () => {
            this.loadProject();
        });

        document.getElementById('newProjectBtn').addEventListener('click', () => {
            this.newProject();
        });

        document.getElementById('screenshotBtn').addEventListener('click', () => {
            PreviewManager.captureScreenshot();
        });
    },

    showExportOptions() {
        const options = [
            { label: 'Export as HTML', action: () => this.exportHTML() },
            { label: 'Export as ZIP', action: () => this.exportZIP() },
            { label: 'Export as CodePen', action: () => this.exportCodePen() }
        ];

        const menu = document.createElement('div');
        menu.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 20px;
            z-index: 10000;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        `;

        menu.innerHTML = `
            <h3 style="margin-bottom: 20px; color: var(--text-primary);">Export Options</h3>
            <div style="display: flex; flex-direction: column; gap: 10px;"></div>
        `;

        const buttonContainer = menu.querySelector('div');

        options.forEach(option => {
            const btn = document.createElement('button');
            btn.textContent = option.label;
            btn.style.cssText = `
                padding: 12px 20px;
                background: var(--primary-color);
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.3s;
                font-size: 14px;
            `;
            
            btn.addEventListener('mouseover', () => {
                btn.style.background = 'var(--secondary-color)';
            });
            
            btn.addEventListener('mouseout', () => {
                btn.style.background = 'var(--primary-color)';
            });

            btn.addEventListener('click', () => {
                option.action();
                document.body.removeChild(overlay);
            });

            buttonContainer.appendChild(btn);
        });

        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        overlay.appendChild(menu);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });

        document.body.appendChild(overlay);
    },

    exportHTML() {
        const content = EditorManager.getContent();
        const libraries = LibraryManager.getActiveLibraries();
        
        const cssLibs = libraries
            .filter(lib => lib.type === 'css')
            .map(lib => `    <link rel="stylesheet" href="${lib.url}">`)
            .join('\n');

        const jsLibs = libraries
            .filter(lib => lib.type === 'js')
            .map(lib => `    <script src="${lib.url}"><\/script>`)
            .join('\n');

        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exported Project</title>
${cssLibs}
    <style>
${content.css}
    </style>
</head>
<body>
${content.html}
${jsLibs}
    <script>
${content.js}
    <\/script>
</body>
</html>`;

        Utils.downloadFile('project.html', html, 'text/html');
        Utils.showNotification('HTML exported successfully!', 'success');
    },

    exportZIP() {
        Utils.showNotification('ZIP export feature coming soon!', 'info');
    },

    exportCodePen() {
        const content = EditorManager.getContent();
        
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://codepen.io/pen/define';
        form.target = '_blank';

        const data = {
            title: 'Exported from Live HTML Editor',
            html: content.html,
            css: content.css,
            js: content.js
        };

        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'data';
        input.value = JSON.stringify(data);

        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);

        Utils.showNotification('Opening in CodePen...', 'success');
    },

    saveProject() {
        const name = prompt('Enter project name:', 'MyProject');
        
        if (!name) return;

        const content = EditorManager.getContent();
        const libraries = LibraryManager.getActiveLibraries();

        const projectData = {
            content,
            libraries,
            version: '1.0'
        };

        StorageManager.saveProject(name, projectData);
    },

    loadProject() {
        const projects = StorageManager.listProjects();
        
        if (projects.length === 0) {
            Utils.showNotification('No saved projects found', 'info');
            return;
        }

        const projectList = projects.map((p, i) => `${i + 1}. ${p.name} (${p.savedAt})`).join('\n');
        const choice = prompt(`Select project to load:\n\n${projectList}\n\nEnter project name:`);

        if (!choice) return;

        const project = StorageManager.loadProject(choice);
        
        if (project) {
            EditorManager.setContent(project.content);
            
            if (project.libraries) {
                LibraryManager.activeLibraries = project.libraries;
                LibraryManager.saveActiveLibraries();
                LibraryManager.updateLibraryCount();
            }

            PreviewManager.updatePreview();
            Utils.showNotification('Project loaded successfully!', 'success');
        } else {
            Utils.showNotification('Project not found', 'error');
        }
    },

    newProject() {
        if (confirm('This will clear your current work. Continue?')) {
            EditorManager.clearAll();
            LibraryManager.clearAllLibraries();
            ConsoleManager.clearConsole();
            PreviewManager.updatePreview();
            Utils.showNotification('New project started!', 'success');
        }
    },

    autoExport() {
        const content = EditorManager.getContent();
        const libraries = LibraryManager.getActiveLibraries();
        
        const projectData = {
            content,
            libraries,
            exportedAt: Utils.getCurrentTimestamp()
        };

        return JSON.stringify(projectData, null, 2);
    }
};