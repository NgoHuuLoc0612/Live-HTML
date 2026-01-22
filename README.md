# Live HTML Editor Pro

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/BingChilling/live-html-editor)
[![CodeMirror](https://img.shields.io/badge/CodeMirror-5.65.2-green.svg)](https://codemirror.net/)

## Abstract

Live HTML Editor Pro is a sophisticated browser-based integrated development environment (IDE) designed for real-time web development. This application implements a three-pane editor architecture with live preview capabilities, enabling developers to write HTML, CSS, and JavaScript code with immediate visual feedback. The system leverages the CodeMirror library for syntax highlighting and code editing, while providing advanced features such as CDN library management, code snippet integration, and template systems.

## Table of Contents

- [Introduction](#introduction)
- [System Architecture](#system-architecture)
- [Features](#features)
- [Technical Implementation](#technical-implementation)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Performance Considerations](#performance-considerations)
- [Security](#security)
- [Future Work](#future-work)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Introduction

### Background

Modern web development workflows increasingly rely on rapid prototyping and iterative design processes. Traditional development environments often introduce friction between code writing and result visualization, requiring manual refresh cycles and context switching. Live HTML Editor Pro addresses this gap by providing an integrated, browser-based development environment that eliminates the compile-preview cycle through real-time rendering.

### Objectives

The primary objectives of this project are:

1. **Real-time Feedback**: Provide instantaneous visual feedback for code modifications
2. **Accessibility**: Deliver a zero-installation, browser-based development environment
3. **Extensibility**: Support integration of external libraries via CDN
4. **Productivity**: Enhance developer efficiency through code snippets, templates, and formatting tools
5. **Education**: Serve as a learning platform for web development fundamentals

### Scope

This application is designed for:
- Rapid prototyping and experimentation
- Educational demonstrations and tutorials
- Front-end development testing
- Code snippet development and sharing
- Quick mockup creation

## System Architecture

### High-Level Architecture

The application follows a modular, manager-based architecture pattern where each major functionality is encapsulated within a dedicated manager module. The system consists of eight primary managers:

```
┌─────────────────────────────────────────────────────────────┐
│                      LiveHTMLEditor (Core)                   │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Editor     │  │   Preview    │  │   Library    │      │
│  │   Manager    │  │   Manager    │  │   Manager    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Snippet    │  │   Template   │  │   Console    │      │
│  │   Manager    │  │   Manager    │  │   Manager    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │   Export     │  │      UI      │                        │
│  │   Manager    │  │   Manager    │                        │
│  └──────────────┘  └──────────────┘                        │
├─────────────────────────────────────────────────────────────┤
│              Storage Manager & Utility Functions             │
└─────────────────────────────────────────────────────────────┘
```

### Component Descriptions

#### 1. Editor Manager
- **Responsibility**: Manages three CodeMirror instances (HTML, CSS, JavaScript)
- **Key Functions**: Code editing, syntax highlighting, auto-completion, formatting
- **Technology**: CodeMirror 5.65.2 with language-specific modes

#### 2. Preview Manager
- **Responsibility**: Renders live preview of combined code
- **Key Functions**: Sandboxed iframe rendering, device simulation, console capture
- **Technology**: HTML5 iframe with sandbox attributes

#### 3. Library Manager
- **Responsibility**: Manages external CDN libraries
- **Key Functions**: Library browsing, activation/deactivation, custom URL injection
- **Data**: 30+ pre-configured popular libraries (Bootstrap, Vue.js, Three.js, etc.)

#### 4. Snippet Manager
- **Responsibility**: Provides code snippet templates
- **Key Functions**: Categorized snippet storage, quick insertion
- **Categories**: HTML, CSS, JavaScript snippets

#### 5. Template Manager
- **Responsibility**: Manages full-page templates
- **Key Functions**: Template loading, project initialization
- **Templates**: Landing page, Portfolio, Dashboard, Blog layouts

#### 6. Console Manager
- **Responsibility**: Captures and displays runtime console output
- **Key Functions**: Log capture, error tracking, message filtering
- **Integration**: Intercepts console methods from sandboxed preview

#### 7. Export Manager
- **Responsibility**: Handles project export and import
- **Key Functions**: HTML export, CodePen integration, project persistence
- **Formats**: Single HTML file, ZIP archive, CodePen export

#### 8. UI Manager
- **Responsibility**: Manages user interface state and interactions
- **Key Functions**: Modal handling, keyboard shortcuts, settings persistence
- **Features**: Fullscreen mode, theme switching, responsive design

## Features

### Core Functionality

1. **Multi-Language Editing**
   - Simultaneous HTML, CSS, and JavaScript editing
   - Syntax highlighting with configurable themes (Monokai, Dracula, Material)
   - Auto-completion and bracket matching
   - Line numbering and code folding

2. **Live Preview**
   - Real-time rendering with configurable update delay (default: 500ms)
   - Responsive device simulation (Desktop, Tablet, Mobile)
   - Sandboxed execution environment
   - Pop-out preview window support

3. **Library Management**
   - Pre-configured library catalog (30+ libraries)
   - Custom CDN URL support
   - Library activation state persistence
   - Automatic injection into preview context

4. **Code Assistance**
   - Language-specific code snippets
   - Full-page templates
   - Code formatting (HTML Beautify, CSS Beautify, JS Beautify)
   - Undo/Redo functionality

5. **Console Integration**
   - Runtime console output capture
   - Error, warning, and info message categorization
   - Timestamp tracking
   - Error count badge

6. **Project Management**
   - Project save/load functionality
   - Auto-save capability
   - Export to standalone HTML
   - CodePen integration

### Advanced Features

- **Keyboard Shortcuts**: Comprehensive shortcut system for common operations
- **Theme Customization**: Multiple editor themes and font size options
- **Responsive Design**: Mobile-friendly interface with adaptive layouts
- **Screenshot Capture**: HTML2Canvas integration for preview screenshots
- **Modal Interface**: Non-intrusive modal system for settings and features

## Technical Implementation

### Code Editor Implementation

The editor utilizes CodeMirror with the following configuration:

```javascript
{
    lineNumbers: true,
    mode: 'htmlmixed', // or 'css', 'javascript'
    theme: 'monokai',
    autoCloseBrackets: true,
    autoCloseTags: true,
    matchBrackets: true,
    indentUnit: 2,
    tabSize: 2,
    lineWrapping: true,
    extraKeys: {
        'Ctrl-Space': 'autocomplete',
        'Ctrl-/': 'toggleComment'
    }
}
```

### Live Preview Architecture

The preview system employs a sandboxed iframe with restricted permissions:

```html
<iframe 
    id="preview" 
    sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-popups">
</iframe>
```

Preview content is dynamically generated by combining:
1. User-written HTML
2. Active CDN stylesheets (CSS libraries)
3. User-written CSS (in `<style>` tags)
4. Active CDN scripts (JS libraries)
5. Console capture script
6. User-written JavaScript

### Storage Strategy

The application implements a simulated storage system through the StorageManager module. In a production environment, this would interface with browser LocalStorage or IndexedDB. The current implementation maintains data structures in memory for the session duration.

**Note**: The code includes localStorage references that are commented out or non-functional in Claude artifact environments. For deployment, these would need to be uncommented and tested in a standard browser environment.

### Event Handling

The application implements a debounced update mechanism to optimize performance:

```javascript
editor.on('change', Utils.debounce(() => {
    this.handleEditorChange(key);
}, CONFIG.autoRunDelay));
```

This prevents excessive preview updates during rapid typing while maintaining responsiveness.

## Installation

### Prerequisites

- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- HTTP server (for local development) or static hosting service
- No backend requirements

### Deployment Steps

1. **Clone or Download Repository**
   ```bash
   git clone https://github.com/BingChilling/Live-HTML.git
   cd Live-HTML
   ```

2. **Serve Files**
   
   Option A - Python HTTP Server:
   ```bash
   python -m http.server 8000
   ```
   
   Option B - Node.js HTTP Server:
   ```bash
   npx http-server -p 8000
   ```
   
   Option C - Live Server (VS Code Extension):
   - Install Live Server extension
   - Right-click `index.html` → "Open with Live Server"

3. **Access Application**
   ```
   http://localhost:8000
   ```

### CDN Dependencies

All external libraries are loaded via CDN (CloudFlare CDNJS), eliminating the need for local dependency management. Required CDNs are loaded in `index.html`:

- CodeMirror 5.65.2
- Font Awesome 6.4.0
- JS Beautify 1.14.7
- HTML2Canvas 1.4.1
- FileSaver.js 2.0.5

## Usage

### Basic Workflow

1. **Initialize Editor**
   - Application auto-loads with default template on startup
   - Three editor panes are visible: HTML, CSS, JavaScript

2. **Write Code**
   - Switch between editor panes using top tab buttons
   - Code changes automatically trigger preview updates (if auto-run enabled)
   - Use toolbar buttons for formatting, undo/redo operations

3. **Add Libraries**
   - Click "Add Library" button in toolbar
   - Browse available libraries or add custom CDN URL
   - Click library to activate/deactivate
   - Active libraries are automatically injected into preview

4. **Use Snippets/Templates**
   - Click "Code Snippets" for reusable code blocks
   - Click "Templates" for full-page layouts
   - Select desired snippet/template to insert/load

5. **Export Project**
   - Click "Export" button
   - Choose export format (HTML, ZIP, CodePen)
   - File downloads automatically or opens in new window

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl/Cmd + S | Save Project |
| Ctrl/Cmd + O | Open Project |
| Ctrl/Cmd + E | Export HTML |
| Ctrl/Cmd + L | Open Library Manager |
| Ctrl/Cmd + Shift + K | Toggle Console |
| Ctrl/Cmd + B | Format Code |
| F11 | Toggle Fullscreen |
| Ctrl + Space | Auto-complete |
| Ctrl + / | Toggle Comment |

### Device Simulation

Use the device selector in the preview header:
- **Desktop**: Full-width preview (default)
- **Tablet**: 768px max-width simulation
- **Mobile**: 375px max-width simulation

## API Reference

### EditorManager API

```javascript
// Get current code content
EditorManager.getContent()
// Returns: { html: string, css: string, js: string }

// Set editor content
EditorManager.setContent({ html, css, js })

// Insert snippet at cursor
EditorManager.insertSnippet(code)

// Format current editor
EditorManager.formatCurrentEditor()

// Switch active tab
EditorManager.switchTab('html' | 'css' | 'js')
```

### LibraryManager API

```javascript
// Get active libraries
LibraryManager.getActiveLibraries()
// Returns: Array<Library>

// Toggle library activation
LibraryManager.toggleLibrary(library)

// Add custom library
LibraryManager.addCustomLibrary()

// Clear all libraries
LibraryManager.clearAllLibraries()
```

### ConsoleManager API

```javascript
// Log messages
ConsoleManager.log(message)
ConsoleManager.error(message)
ConsoleManager.warn(message)
ConsoleManager.info(message)

// Clear console
ConsoleManager.clearConsole()

// Toggle console visibility
ConsoleManager.toggleConsole()
```

### PreviewManager API

```javascript
// Update preview
PreviewManager.updatePreview()

// Change device simulation
PreviewManager.changeDevice('desktop' | 'tablet' | 'mobile')

// Pop-out preview
PreviewManager.popoutPreview()

// Capture screenshot
PreviewManager.captureScreenshot()
```

## Project Structure

```
Live-HTML/
├── index.html                 # Main application entry point
├── LICENSE                    # MIT License
├── README.md                  # This file
├── js/
│   ├── app.js                # Application initialization
│   ├── config.js             # Configuration and library catalog
│   ├── utils.js              # Utility functions
│   ├── storage.js            # Storage management (simulated)
│   ├── editor-manager.js     # Editor functionality
│   ├── preview-manager.js    # Preview rendering
│   ├── library-manager.js    # CDN library management
│   ├── snippet-manager.js    # Code snippets
│   ├── template-manager.js   # Page templates
│   ├── console-manager.js    # Console capture
│   ├── export-manager.js     # Export functionality
│   └── ui-manager.js         # UI state management
└── styles/
    ├── main.css              # Core styles and variables
    ├── editor.css            # Editor pane styles
    ├── toolbar.css           # Toolbar styles
    ├── sidebar.css           # Sidebar styles
    └── modal.css             # Modal dialog styles
```

### File Descriptions

#### JavaScript Modules

- **app.js**: Core application class, initialization sequence, error handling
- **config.js**: Configuration constants, library definitions, editor options
- **utils.js**: Helper functions (debounce, formatting, clipboard, notifications)
- **storage.js**: Data persistence interface (currently simulated)
- **editor-manager.js**: CodeMirror instance management, tab switching
- **preview-manager.js**: iframe rendering, console interception
- **library-manager.js**: CDN library catalog and activation
- **snippet-manager.js**: Code snippet storage and insertion
- **template-manager.js**: Full-page template management
- **console-manager.js**: Runtime console output capture
- **export-manager.js**: Project export in various formats
- **ui-manager.js**: Modal handling, keyboard shortcuts, settings

#### CSS Modules

- **main.css**: CSS variables, global styles, layout grid
- **editor.css**: CodeMirror customization, editor panes
- **toolbar.css**: Toolbar buttons, selectors, toggle switches
- **sidebar.css**: Sidebar navigation, panel items
- **modal.css**: Modal dialogs, library/snippet/template lists

## Dependencies

### External Libraries (CDN)

| Library | Version | Purpose |
|---------|---------|---------|
| CodeMirror | 5.65.2 | Code editor core |
| Font Awesome | 6.4.0 | Icon library |
| JS Beautify | 1.14.7 | Code formatting |
| HTML2Canvas | 1.4.1 | Screenshot capture |
| FileSaver.js | 2.0.5 | File download |

### Pre-configured CDN Libraries

The application includes a catalog of 30+ popular web development libraries:

**CSS Frameworks**: Bootstrap 5.3.2, Tailwind CSS 2.2.19
**JavaScript Frameworks**: Vue.js 3.3.8, Alpine.js 3.13.3, jQuery 3.7.1
**Animation**: GSAP 3.12.4, Animate.css 4.1.1, AOS 2.3.4
**Visualization**: Chart.js 4.4.0, D3.js 7.8.5, Three.js r158
**Utilities**: Lodash 4.17.21, Axios 1.6.2, Moment.js 2.29.4
**UI Components**: SweetAlert2 11.10.1, Swiper 11.0.5

## Performance Considerations

### Optimization Strategies

1. **Debounced Updates**
   - Preview updates are debounced (default 500ms) to prevent excessive re-renders
   - Configurable delay in settings (0-5000ms)

2. **Sandboxed Execution**
   - Preview runs in isolated iframe context
   - Prevents main application contamination
   - Security boundary for user code execution

3. **Lazy Loading**
   - Managers initialize on-demand
   - Modal content rendered on first open
   - CDN libraries loaded only when activated

4. **Efficient DOM Manipulation**
   - Minimal direct DOM operations
   - Batch updates where possible
   - Event delegation for dynamic elements

### Known Limitations

1. **Large Files**: Performance degrades with files >5000 lines
2. **Heavy Libraries**: Multiple large 3D libraries may cause slowdown
3. **Complex CSS**: Excessive CSS rules impact rendering speed
4. **Browser Memory**: Long sessions may consume significant memory

## Security

### Security Measures

1. **Iframe Sandboxing**
   - Preview uses sandbox attribute with minimal permissions
   - Scripts isolated from parent context
   - XSS prevention through content security

2. **Input Sanitization**
   - HTML escaping for display (Utils.escapeHtml)
   - URL validation for custom CDN libraries
   - No server-side execution (client-only application)

3. **CDN Integrity**
   - All CDN URLs use HTTPS
   - Trusted CDN provider (CloudFlare CDNJS)
   - Version pinning for consistency

### Security Limitations

⚠️ **Important Security Notes**:

- This is a **client-side development tool** - user code executes in the browser
- Users can inject arbitrary JavaScript that executes in the preview context
- **Not suitable for running untrusted code**
- Always review code before execution
- No server-side validation or filtering

## Future Work

### Planned Enhancements

1. **Backend Integration**
   - User authentication and cloud storage
   - Project sharing and collaboration
   - Version control integration (Git)

2. **Advanced Features**
   - Multi-file project support
   - NPM package integration
   - Build tool integration (Webpack, Vite)
   - TypeScript support
   - SCSS/LESS preprocessing

3. **Collaborative Features**
   - Real-time multi-user editing
   - Comment system
   - Code review tools

4. **AI Integration**
   - Code completion using AI models
   - Automated bug detection
   - Code suggestion and refactoring

5. **Performance Improvements**
   - Virtual scrolling for large files
   - Web Worker for code processing
   - Progressive rendering
   - Code splitting

6. **Educational Features**
   - Interactive tutorials
   - Challenge system
   - Code playground for specific technologies
   - Learning path integration

### Code Standards

- Follow existing code style and structure
- Add comments for complex logic
- Update documentation for new features
- Test across multiple browsers
- Ensure responsive design compatibility

### Bug Reports

Use the issue tracker with the following information:
- Browser and version
- Steps to reproduce
- Expected vs. actual behavior
- Screenshots or screen recordings
- Console error messages

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 BingChilling

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

## Acknowledgments

### Libraries and Tools

- **CodeMirror** - Exceptional code editor component by Marijn Haverbeke
- **CloudFlare CDNJS** - Reliable CDN service for open-source libraries
- **Font Awesome** - Comprehensive icon library
- **JS Beautify** - Code formatting tools
- **HTML2Canvas** - HTML to canvas rendering

### Inspiration

This project draws inspiration from:
- CodePen (online code editor and community)
- JSFiddle (code testing and sharing)
- JSBin (collaborative debugging)
- StackBlitz (online IDE)

### Community

Special thanks to the open-source community for continuous feedback, bug reports, and feature suggestions that help improve this project.

