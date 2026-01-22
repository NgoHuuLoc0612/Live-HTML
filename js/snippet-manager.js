const SnippetManager = {
    modal: null,
    currentCategory: 'html',
    
    snippets: {
        html: [
            {
                title: 'HTML5 Boilerplate',
                description: 'Basic HTML5 document structure',
                code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>`
            },
            {
                title: 'Flexbox Container',
                description: 'Flex container with centered items',
                code: `<div class="flex-container">
    <div class="flex-item">Item 1</div>
    <div class="flex-item">Item 2</div>
    <div class="flex-item">Item 3</div>
</div>`
            },
            {
                title: 'Card Component',
                description: 'Responsive card with image',
                code: `<div class="card">
    <img src="image.jpg" alt="Card image">
    <div class="card-body">
        <h3 class="card-title">Card Title</h3>
        <p class="card-text">Card description goes here</p>
        <button class="btn">Read More</button>
    </div>
</div>`
            },
            {
                title: 'Navigation Bar',
                description: 'Responsive navigation menu',
                code: `<nav class="navbar">
    <div class="nav-brand">Logo</div>
    <ul class="nav-menu">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
    </ul>
</nav>`
            },
            {
                title: 'Hero Section',
                description: 'Landing page hero section',
                code: `<section class="hero">
    <div class="hero-content">
        <h1>Welcome to Our Site</h1>
        <p>Your journey starts here</p>
        <button class="cta-button">Get Started</button>
    </div>
</section>`
            }
        ],
        css: [
            {
                title: 'Flexbox Center',
                description: 'Center content with flexbox',
                code: `.flex-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}`
            },
            {
                title: 'Grid Layout',
                description: 'Responsive grid system',
                code: `.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}`
            },
            {
                title: 'Gradient Background',
                description: 'Modern gradient background',
                code: `.gradient-bg {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}`
            },
            {
                title: 'Card Style',
                description: 'Modern card design',
                code: `.card {
    background: white;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    padding: 20px;
    transition: transform 0.3s;
}

.card:hover {
    transform: translateY(-5px);
}`
            },
            {
                title: 'Button Style',
                description: 'Modern button with hover effect',
                code: `.btn {
    padding: 12px 30px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
}

.btn:hover {
    background: #764ba2;
    transform: scale(1.05);
}`
            }
        ],
        js: [
            {
                title: 'DOM Ready',
                description: 'Wait for DOM to load',
                code: `document.addEventListener('DOMContentLoaded', () => {
    // Your code here
});`
            },
            {
                title: 'Fetch API',
                description: 'Fetch data from API',
                code: `fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });`
            },
            {
                title: 'Event Listener',
                description: 'Add click event listener',
                code: `const button = document.querySelector('.button');
button.addEventListener('click', (e) => {
    console.log('Button clicked!');
});`
            },
            {
                title: 'Toggle Class',
                description: 'Toggle class on element',
                code: `const element = document.querySelector('.element');
element.classList.toggle('active');`
            },
            {
                title: 'Smooth Scroll',
                description: 'Smooth scroll to element',
                code: `function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}`
            },
            {
                title: 'Local Storage',
                description: 'Save and load from local storage',
                code: `// Save data (Note: localStorage not supported in Claude artifacts)
const data = { name: 'John', age: 30 };
// localStorage.setItem('user', JSON.stringify(data));

// Load data
// const saved = JSON.parse(localStorage.getItem('user'));
// console.log(saved);`
            }
        ]
    },

    init() {
        this.modal = document.getElementById('snippetModal');
        this.setupEventListeners();
    },

    setupEventListeners() {
        document.getElementById('snippetBtn').addEventListener('click', () => {
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
    },

    openModal() {
        this.modal.classList.add('active');
        this.renderCategories();
        this.renderSnippets();
    },

    closeModal() {
        this.modal.classList.remove('active');
    },

    renderCategories() {
        const container = this.modal.querySelector('.snippet-categories');
        container.innerHTML = '';

        const categories = ['html', 'css', 'js'];
        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = 'category-btn';
            btn.textContent = cat.toUpperCase();
            
            if (cat === this.currentCategory) {
                btn.classList.add('active');
            }

            btn.addEventListener('click', () => {
                this.currentCategory = cat;
                this.renderCategories();
                this.renderSnippets();
            });

            container.appendChild(btn);
        });
    },

    renderSnippets() {
        const container = document.getElementById('snippetList');
        container.innerHTML = '';

        const snippets = this.snippets[this.currentCategory] || [];

        snippets.forEach(snippet => {
            const item = document.createElement('div');
            item.className = 'snippet-item';
            item.innerHTML = `
                <div class="snippet-title">${snippet.title}</div>
                <div class="snippet-description">${snippet.description}</div>
                <div class="snippet-code">${Utils.escapeHtml(snippet.code)}</div>
            `;

            item.addEventListener('click', () => {
                this.insertSnippet(snippet.code);
            });

            container.appendChild(item);
        });
    },

    insertSnippet(code) {
        EditorManager.insertSnippet(code);
        this.closeModal();
        Utils.showNotification('Snippet inserted!', 'success');
    },

    addCustomSnippet(category, title, description, code) {
        if (!this.snippets[category]) {
            this.snippets[category] = [];
        }

        this.snippets[category].push({
            title,
            description,
            code,
            custom: true
        });

        this.renderSnippets();
        Utils.showNotification('Custom snippet added!', 'success');
    }
};