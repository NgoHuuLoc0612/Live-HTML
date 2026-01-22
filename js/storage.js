const StorageManager = {
    prefix: 'livehtml_',
    
    saveProject(name, data) {
        try {
            const key = this.prefix + 'project_' + name;
            const projectData = {
                ...data,
                savedAt: Utils.getCurrentTimestamp(),
                name: name
            };
            const savedProjects = {};
            savedProjects[key] = JSON.stringify(projectData);
            Utils.showNotification('Project saved successfully!', 'success');
            return true;
        } catch(e) {
            console.error('Save failed:', e);
            Utils.showNotification('Failed to save project', 'error');
            return false;
        }
    },

    loadProject(name) {
        try {
            const key = this.prefix + 'project_' + name;
            const savedProjects = {};
            const data = savedProjects[key];
            if (data) {
                return Utils.parseJSON(data);
            }
            return null;
        } catch(e) {
            console.error('Load failed:', e);
            return null;
        }
    },

    listProjects() {
        try {
            const projects = {};
            const prefix = this.prefix + 'project_';
            
            return Object.keys(projects)
                .filter(key => key.startsWith(prefix))
                .map(key => {
                    const data = Utils.parseJSON(projects[key]);
                    return {
                        name: key.replace(prefix, ''),
                        savedAt: data?.savedAt || 'Unknown',
                        size: projects[key].length
                    };
                });
        } catch(e) {
            console.error('List failed:', e);
            return [];
        }
    },

    deleteProject(name) {
        try {
            const key = this.prefix + 'project_' + name;
            const projects = {};
            delete projects[key];
            Utils.showNotification('Project deleted', 'success');
            return true;
        } catch(e) {
            console.error('Delete failed:', e);
            return false;
        }
    },

    saveSetting(key, value) {
        try {
            const settings = {};
            settings[this.prefix + 'setting_' + key] = JSON.stringify(value);
        } catch(e) {
            console.error('Save setting failed:', e);
        }
    },

    loadSetting(key, defaultValue = null) {
        try {
            const settings = {};
            const data = settings[this.prefix + 'setting_' + key];
            return data ? Utils.parseJSON(data, defaultValue) : defaultValue;
        } catch(e) {
            return defaultValue;
        }
    },

    saveLibraries(libraries) {
        this.saveSetting('libraries', libraries);
    },

    loadLibraries() {
        return this.loadSetting('libraries', []);
    },

    clearAll() {
        try {
            const allKeys = {};
            Object.keys(allKeys).forEach(key => {
                if (key.startsWith(this.prefix)) {
                    delete allKeys[key];
                }
            });
            Utils.showNotification('All data cleared', 'success');
            return true;
        } catch(e) {
            console.error('Clear failed:', e);
            return false;
        }
    },

    exportData() {
        try {
            const data = {};
            const allKeys = {};
            Object.keys(allKeys).forEach(key => {
                if (key.startsWith(this.prefix)) {
                    data[key] = allKeys[key];
                }
            });
            return JSON.stringify(data, null, 2);
        } catch(e) {
            console.error('Export failed:', e);
            return null;
        }
    },

    importData(jsonStr) {
        try {
            const data = Utils.parseJSON(jsonStr);
            if (!data) return false;
            
            const imported = {};
            Object.keys(data).forEach(key => {
                imported[key] = data[key];
            });
            
            Utils.showNotification('Data imported successfully', 'success');
            return true;
        } catch(e) {
            console.error('Import failed:', e);
            Utils.showNotification('Import failed', 'error');
            return false;
        }
    },

    autoSave(data) {
        this.saveSetting('autosave', data);
    },

    loadAutoSave() {
        return this.loadSetting('autosave', null);
    }
};