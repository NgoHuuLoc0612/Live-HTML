const TemplateManager = {
    modal: null,
    
    templates: [
        {
            name: 'Blank',
            icon: '📄',
            html: '',
            css: '',
            js: ''
        },
        {
            name: 'Landing Page',
            icon: '🚀',
            html: `<div class="landing">
    <header class="header">
        <nav>
            <div class="logo">YourBrand</div>
            <ul class="nav-links">
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <section class="hero">
        <h1>Welcome to the Future</h1>
        <p>Build amazing things with our platform</p>
        <button class="cta">Get Started</button>
    </section>
    
    <section id="features" class="features">
        <h2>Features</h2>
        <div class="feature-grid">
            <div class="feature">
                <i class="fas fa-rocket"></i>
                <h3>Fast</h3>
                <p>Lightning fast performance</p>
            </div>
            <div class="feature">
                <i class="fas fa-shield-alt"></i>
                <h3>Secure</h3>
                <p>Enterprise-grade security</p>
            </div>
            <div class="feature">
                <i class="fas fa-cog"></i>
                <h3>Flexible</h3>
                <p>Highly customizable</p>
            </div>
        </div>
    </section>
</div>`,
            css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
}

.header {
    background: #fff;
    padding: 20px 50px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 24px;
    font-weight: bold;
    color: #667eea;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 30px;
}

.nav-links a {
    text-decoration: none;
    color: #333;
    transition: color 0.3s;
}

.nav-links a:hover {
    color: #667eea;
}

.hero {
    text-align: center;
    padding: 100px 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.hero h1 {
    font-size: 48px;
    margin-bottom: 20px;
}

.hero p {
    font-size: 20px;
    margin-bottom: 30px;
}

.cta {
    padding: 15px 40px;
    font-size: 18px;
    background: white;
    color: #667eea;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: transform 0.3s;
}

.cta:hover {
    transform: scale(1.05);
}

.features {
    padding: 80px 50px;
    text-align: center;
}

.features h2 {
    font-size: 36px;
    margin-bottom: 50px;
}

.feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
}

.feature {
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    transition: transform 0.3s;
}

.feature:hover {
    transform: translateY(-10px);
}

.feature i {
    font-size: 48px;
    color: #667eea;
    margin-bottom: 20px;
}

.feature h3 {
    font-size: 24px;
    margin-bottom: 10px;
}`,
            js: `document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

document.querySelector('.cta').addEventListener('click', () => {
    alert('Welcome aboard! 🚀');
});`
        },
        {
            name: 'Portfolio',
            icon: '💼',
            html: `<div class="portfolio">
    <header>
        <h1>John Doe</h1>
        <p>Full Stack Developer</p>
    </header>
    
    <section class="about">
        <h2>About Me</h2>
        <p>I'm a passionate developer with experience in modern web technologies.</p>
    </section>
    
    <section class="projects">
        <h2>Projects</h2>
        <div class="project-grid">
            <div class="project-card">
                <h3>Project 1</h3>
                <p>An awesome web application</p>
            </div>
            <div class="project-card">
                <h3>Project 2</h3>
                <p>Mobile-first design</p>
            </div>
            <div class="project-card">
                <h3>Project 3</h3>
                <p>E-commerce platform</p>
            </div>
        </div>
    </section>
    
    <section class="contact">
        <h2>Contact</h2>
        <p>Email: john@example.com</p>
    </section>
</div>`,
            css: `body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    background: #f5f5f5;
}

header {
    background: #2c3e50;
    color: white;
    text-align: center;
    padding: 100px 20px;
}

header h1 {
    font-size: 48px;
    margin-bottom: 10px;
}

section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 60px 20px;
}

h2 {
    font-size: 32px;
    margin-bottom: 30px;
    text-align: center;
}

.project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.project-card {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s;
}

.project-card:hover {
    transform: translateY(-5px);
}

.contact {
    text-align: center;
    background: #2c3e50;
    color: white;
}`,
            js: `console.log('Portfolio loaded');`
        },
        {
            name: 'Dashboard',
            icon: '📊',
            html: `<div class="dashboard">
    <aside class="sidebar">
        <h2>Dashboard</h2>
        <nav>
            <a href="#" class="active">Overview</a>
            <a href="#">Analytics</a>
            <a href="#">Reports</a>
            <a href="#">Settings</a>
        </nav>
    </aside>
    
    <main class="content">
        <h1>Overview</h1>
        <div class="stats">
            <div class="stat-card">
                <h3>Users</h3>
                <p class="stat-number">1,234</p>
            </div>
            <div class="stat-card">
                <h3>Revenue</h3>
                <p class="stat-number">$45,678</p>
            </div>
            <div class="stat-card">
                <h3>Orders</h3>
                <p class="stat-number">567</p>
            </div>
        </div>
    </main>
</div>`,
            css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.dashboard {
    display: flex;
    height: 100vh;
}

.sidebar {
    width: 250px;
    background: #2c3e50;
    color: white;
    padding: 20px;
}

.sidebar h2 {
    margin-bottom: 30px;
}

.sidebar nav {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.sidebar a {
    padding: 12px;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: background 0.3s;
}

.sidebar a:hover,
.sidebar a.active {
    background: #34495e;
}

.content {
    flex: 1;
    padding: 40px;
    background: #ecf0f1;
}

.content h1 {
    margin-bottom: 30px;
}

.stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
}

.stat-card {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.stat-number {
    font-size: 32px;
    font-weight: bold;
    color: #3498db;
    margin-top: 10px;
}`,
            js: `document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.sidebar a').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});`
        },
        {
            name: 'Blog',
            icon: '📝',
            html: `<div class="blog">
    <header class="blog-header">
        <h1>My Blog</h1>
        <p>Thoughts and stories</p>
    </header>
    
    <main class="blog-content">
        <article class="post">
            <h2>Blog Post Title</h2>
            <div class="post-meta">
                <span>January 22, 2026</span>
                <span>By John Doe</span>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
            <a href="#" class="read-more">Read More</a>
        </article>
        
        <article class="post">
            <h2>Another Great Post</h2>
            <div class="post-meta">
                <span>January 20, 2026</span>
                <span>By John Doe</span>
            </div>
            <p>Sed do eiusmod tempor incididunt ut labore et dolore...</p>
            <a href="#" class="read-more">Read More</a>
        </article>
    </main>
</div>`,
            css: `body {
    font-family: 'Georgia', serif;
    margin: 0;
    background: #fafafa;
}

.blog-header {
    background: #333;
    color: white;
    text-align: center;
    padding: 60px 20px;
}

.blog-header h1 {
    font-size: 48px;
    margin-bottom: 10px;
}

.blog-content {
    max-width: 800px;
    margin: 40px auto;
    padding: 0 20px;
}

.post {
    background: white;
    padding: 40px;
    margin-bottom: 30px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.post h2 {
    font-size: 32px;
    margin-bottom: 15px;
    color: #333;
}

.post-meta {
    color: #666;
    margin-bottom: 20px;
    font-size: 14px;
}

.post-meta span {
    margin-right: 15px;
}

.read-more {
    color: #3498db;
    text-decoration: none;
    font-weight: bold;
}

.read-more:hover {
    text-decoration: underline;
}`,
            js: `console.log('Blog loaded');`
        }
    ],

    init() {
        this.modal = document.getElementById('templateModal');
        this.setupEventListeners();
    },

    setupEventListeners() {
        document.getElementById('templateBtn').addEventListener('click', () => {
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
        this.renderTemplates();
    },

    closeModal() {
        this.modal.classList.remove('active');
    },

    renderTemplates() {
        const container = document.getElementById('templateList');
        container.innerHTML = '';

        this.templates.forEach(template => {
            const item = document.createElement('div');
            item.className = 'template-item';
            item.innerHTML = `
                <div class="template-icon">${template.icon}</div>
                <div class="template-name">${template.name}</div>
            `;

            item.addEventListener('click', () => {
                this.loadTemplate(template);
            });

            container.appendChild(item);
        });
    },

    loadTemplate(template) {
        if (confirm('This will replace your current code. Continue?')) {
            EditorManager.setContent({
                html: template.html,
                css: template.css,
                js: template.js
            });
            
            PreviewManager.updatePreview();
            this.closeModal();
            Utils.showNotification(`${template.name} template loaded!`, 'success');
        }
    }
};