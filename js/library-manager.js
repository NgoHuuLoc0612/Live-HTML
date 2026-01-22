const LibraryManager = {
    activeLibraries: [],
    allLibraries: [],
    modal: null,
    
    init() {
        this.allLibraries = [...CONFIG.libraries];
        this.modal = document.getElementById('libraryModal');
        this.loadActiveLibraries();
        this.setupEventListeners();
        this.renderLibraries();
    },

    setupEventListeners() {
        document.getElementById('libraryBtn').addEventListener('click', () => {
            this.openModal();
        });

        const closeBtn = this.modal.querySelector('.close');
        closeBtn.addEventListener('click', () => {
            this.closeModal();
        });

        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        document.getElementById('librarySearch').addEventListener('input', (e) => {
            this.filterLibraries(e.target.value);
        });

        document.getElementById('addCustomLibraryBtn').addEventListener('click', () => {
            this.addCustomLibrary();
        });
    },

    openModal() {
        this.modal.classList.add('active');
        this.renderLibraries();
    },

    closeModal() {
        this.modal.classList.remove('active');
    },

    renderLibraries(filter = '') {
        const container = document.getElementById('libraryList');
        container.innerHTML = '';

        const filtered = this.allLibraries.filter(lib => 
            lib.name.toLowerCase().includes(filter.toLowerCase()) ||
            lib.description.toLowerCase().includes(filter.toLowerCase())
        );

        filtered.forEach(lib => {
            const item = document.createElement('div');
            item.className = 'library-item';
            
            const isActive = this.isLibraryActive(lib);
            if (isActive) {
                item.classList.add('active');
            }

            item.innerHTML = `
                <div class="library-name">
                    <i class="fas ${isActive ? 'fa-check-circle' : 'fa-circle'}"></i>
                    ${lib.name}
                </div>
                <div class="library-version">v${lib.version}</div>
                <div class="library-description">${lib.description}</div>
                <span class="library-type ${lib.type}">${lib.type.toUpperCase()}</span>
            `;

            item.addEventListener('click', () => {
                this.toggleLibrary(lib);
            });

            container.appendChild(item);
        });

        this.updateLibraryCount();
    },

    filterLibraries(query) {
        this.renderLibraries(query);
    },

    toggleLibrary(library) {
        const index = this.activeLibraries.findIndex(lib => 
            lib.name === library.name && lib.version === library.version
        );

        if (index > -1) {
            this.activeLibraries.splice(index, 1);
            Utils.showNotification(`${library.name} removed`, 'info');
        } else {
            this.activeLibraries.push(library);
            Utils.showNotification(`${library.name} added`, 'success');
        }

        this.saveActiveLibraries();
        this.renderLibraries();
        PreviewManager.updatePreview();
    },

    isLibraryActive(library) {
        return this.activeLibraries.some(lib => 
            lib.name === library.name && lib.version === library.version
        );
    },

    addCustomLibrary() {
        const url = document.getElementById('customCdnUrl').value.trim();
        
        if (!url) {
            Utils.showNotification('Please enter a CDN URL', 'warning');
            return;
        }

        if (!Utils.validateUrl(url)) {
            Utils.showNotification('Invalid URL', 'error');
            return;
        }

        const type = url.endsWith('.css') ? 'css' : 'js';
        const name = url.split('/').pop().replace(/\.(css|js)$/, '');

        const customLib = {
            name: name,
            version: 'custom',
            type: type,
            url: url,
            description: 'Custom library',
            custom: true
        };

        this.allLibraries.push(customLib);
        this.activeLibraries.push(customLib);
        
        document.getElementById('customCdnUrl').value = '';
        
        this.saveActiveLibraries();
        this.renderLibraries();
        PreviewManager.updatePreview();
        
        Utils.showNotification('Custom library added!', 'success');
    },

    getActiveLibraries() {
        return this.activeLibraries;
    },

    saveActiveLibraries() {
        StorageManager.saveLibraries(this.activeLibraries);
    },

    loadActiveLibraries() {
        const saved = StorageManager.loadLibraries();
        if (saved && Array.isArray(saved)) {
            this.activeLibraries = saved;
        }
    },

    updateLibraryCount() {
        const badge = document.getElementById('libraryCount');
        badge.textContent = this.activeLibraries.length;
    },

    clearAllLibraries() {
        this.activeLibraries = [];
        this.saveActiveLibraries();
        this.renderLibraries();
        this.updateLibraryCount();
        PreviewManager.updatePreview();
        Utils.showNotification('All libraries removed', 'info');
    },

    exportLibraries() {
        const data = {
            libraries: this.activeLibraries,
            exportedAt: Utils.getCurrentTimestamp()
        };
        
        const json = JSON.stringify(data, null, 2);
        Utils.downloadFile('libraries.json', json, 'application/json');
    },

    importLibraries(jsonStr) {
        try {
            const data = JSON.parse(jsonStr);
            if (data.libraries && Array.isArray(data.libraries)) {
                this.activeLibraries = data.libraries;
                this.saveActiveLibraries();
                this.renderLibraries();
                this.updateLibraryCount();
                PreviewManager.updatePreview();
                Utils.showNotification('Libraries imported!', 'success');
                return true;
            }
        } catch(e) {
            Utils.showNotification('Invalid library file', 'error');
        }
        return false;
    }
};