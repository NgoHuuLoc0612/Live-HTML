const PreviewManager = {
    iframe: null,
    currentDevice: 'desktop',
    
    init() {
        this.iframe = document.getElementById('preview');
        this.setupEventListeners();
        this.updatePreview();
    },

    setupEventListeners() {
        document.getElementById('refreshPreviewBtn').addEventListener('click', () => {
            this.updatePreview();
        });

        document.getElementById('popoutPreviewBtn').addEventListener('click', () => {
            this.popoutPreview();
        });

        document.getElementById('deviceSelector').addEventListener('change', (e) => {
            this.changeDevice(e.target.value);
        });

        document.getElementById('autoRunToggle').addEventListener('change', (e) => {
            if (e.target.checked) {
                this.updatePreview();
            }
        });
    },

    updatePreview() {
        const content = EditorManager.getContent();
        const libraries = LibraryManager.getActiveLibraries();
        
        const html = this.buildPreviewHTML(content, libraries);
        
        const iframeDoc = this.iframe.contentDocument || this.iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(html);
        iframeDoc.close();

        this.setupConsoleCapture();
    },

    buildPreviewHTML(content, libraries) {
        const cssLibs = libraries
            .filter(lib => lib.type === 'css')
            .map(lib => `<link rel="stylesheet" href="${lib.url}">`)
            .join('\n    ');

        const jsLibs = libraries
            .filter(lib => lib.type === 'js')
            .map(lib => `<script src="${lib.url}"><\/script>`)
            .join('\n    ');

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview</title>
    ${cssLibs}
    <style>${content.css}</style>
</head>
<body>
    ${content.html}
    ${jsLibs}
    <script>
        // Console capture
        (function() {
            const originalConsole = {
                log: console.log,
                error: console.error,
                warn: console.warn,
                info: console.info
            };

            function sendToParent(type, args) {
                window.parent.postMessage({
                    type: 'console',
                    level: type,
                    message: Array.from(args).map(arg => {
                        if (typeof arg === 'object') {
                            try {
                                return JSON.stringify(arg, null, 2);
                            } catch(e) {
                                return String(arg);
                            }
                        }
                        return String(arg);
                    }).join(' ')
                }, '*');
            }

            console.log = function(...args) {
                sendToParent('log', args);
                originalConsole.log.apply(console, args);
            };

            console.error = function(...args) {
                sendToParent('error', args);
                originalConsole.error.apply(console, args);
            };

            console.warn = function(...args) {
                sendToParent('warn', args);
                originalConsole.warn.apply(console, args);
            };

            console.info = function(...args) {
                sendToParent('info', args);
                originalConsole.info.apply(console, args);
            };

            window.onerror = function(msg, url, line, col, error) {
                sendToParent('error', [msg + ' (Line: ' + line + ')']);
                return false;
            };
        })();
    <\/script>
    <script>${content.js}<\/script>
</body>
</html>`;
    },

    setupConsoleCapture() {
        window.addEventListener('message', (event) => {
            if (event.data.type === 'console') {
                ConsoleManager.addMessage(event.data.level, event.data.message);
            }
        });
    },

    changeDevice(device) {
        this.currentDevice = device;
        this.iframe.className = '';
        
        switch(device) {
            case 'tablet':
                this.iframe.classList.add('tablet-view');
                break;
            case 'mobile':
                this.iframe.classList.add('mobile-view');
                break;
        }
    },

    popoutPreview() {
        const content = EditorManager.getContent();
        const libraries = LibraryManager.getActiveLibraries();
        const html = this.buildPreviewHTML(content, libraries);
        
        const newWindow = window.open('', '_blank', 'width=800,height=600');
        newWindow.document.write(html);
        newWindow.document.close();
    },

    captureScreenshot() {
        const preview = this.iframe.contentDocument.body;
        
        html2canvas(preview).then(canvas => {
            canvas.toBlob(blob => {
                saveAs(blob, 'screenshot_' + Date.now() + '.png');
                Utils.showNotification('Screenshot saved!', 'success');
            });
        }).catch(err => {
            console.error('Screenshot error:', err);
            Utils.showNotification('Screenshot failed', 'error');
        });
    }
};