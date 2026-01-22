const CONFIG = {
    autoRunDelay: 500,
    defaultTheme: 'monokai',
    defaultFontSize: 14,
    autoSaveInterval: 30000,
    
    libraries: [
        {
            name: 'jQuery',
            version: '3.7.1',
            type: 'js',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js',
            description: 'Fast, small, and feature-rich JavaScript library'
        },
        {
            name: 'Bootstrap',
            version: '5.3.2',
            type: 'css',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css',
            description: 'Popular CSS framework for responsive design'
        },
        {
            name: 'Bootstrap JS',
            version: '5.3.2',
            type: 'js',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/js/bootstrap.bundle.min.js',
            description: 'Bootstrap JavaScript components'
        },
        {
            name: 'Tailwind CSS',
            version: '3.3.5',
            type: 'css',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css',
            description: 'Utility-first CSS framework'
        },
        {
            name: 'Font Awesome',
            version: '6.4.2',
            type: 'css',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css',
            description: 'Icon font and CSS toolkit'
        },
        {
            name: 'Animate.css',
            version: '4.1.1',
            type: 'css',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
            description: 'Cross-browser CSS animations'
        },
        {
            name: 'Vue.js',
            version: '3.3.8',
            type: 'js',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.3.8/vue.global.prod.min.js',
            description: 'Progressive JavaScript framework'
        },
        {
            name: 'Alpine.js',
            version: '3.13.3',
            type: 'js',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/alpinejs/3.13.3/cdn.min.js',
            description: 'Lightweight JavaScript framework'
        },
        {
            name: 'Axios',
            version: '1.6.2',
            type: 'js',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/axios/1.6.2/axios.min.js',
            description: 'Promise-based HTTP client'
        },
        {
            name: 'Lodash',
            version: '4.17.21',
            type: 'js',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js',
            description: 'JavaScript utility library'
        },
        {
            name: 'Moment.js',
            version: '2.29.4',
            type: 'js',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js',
            description: 'Parse, validate, and manipulate dates'
        },
        {
            name: 'Chart.js',
            version: '4.4.0',
            type: 'js',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js',
            description: 'Simple yet flexible charting library'
        },
        {
            name: 'Three.js',
            version: 'r158',
            type: 'js',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r158/three.min.js',
            description: '3D graphics library'
        },
        {
            name: 'GSAP',
            version: '3.12.4',
            type: 'js',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/gsap.min.js',
            description: 'Professional-grade animation library'
        },
        {
            name: 'Swiper',
            version: '11.0.5',
            type: 'css',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.min.css',
            description: 'Modern mobile touch slider'
        },
        {
            name: 'Swiper JS',
            version: '11.0.5',
            type: 'js',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.min.js',
            description: 'Swiper JavaScript library'
        },
        {
            name: 'AOS',
            version: '2.3.4',
            type: 'css',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css',
            description: 'Animate on scroll library'
        },
        {
            name: 'AOS JS',
            version: '2.3.4',
            type: 'js',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js',
            description: 'AOS JavaScript library'
        },
        {
            name: 'Particles.js',
            version: '2.0.0',
            type: 'js',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/particlesjs/2.2.3/particles.min.js',
            description: 'Lightweight particle animation library'
        },
        {
            name: 'Typed.js',
            version: '2.1.0',
            type: 'js',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.1.0/typed.umd.js',
            description: 'Typing animation library'
        },
        {
            name: 'Highlight.js',
            version: '11.9.0',
            type: 'js',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js',
            description: 'Syntax highlighting library'
        },
        {
            name: 'Highlight.js CSS',
            version: '11.9.0',
            type: 'css',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css',
            description: 'Highlight.js default theme'
        },
        {
            name: 'SweetAlert2',
            version: '11.10.1',
            type: 'js',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/sweetalert2/11.10.1/sweetalert2.all.min.js',
            description: 'Beautiful, responsive popup boxes'
        },
        {
            name: 'Toastify',
            version: '1.12.0',
            type: 'js',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/toastify-js/1.12.0/toastify.js',
            description: 'Simple toast notifications'
        },
        {
            name: 'Toastify CSS',
            version: '1.12.0',
            type: 'css',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/toastify-js/1.12.0/toastify.min.css',
            description: 'Toastify styles'
        },
        {
            name: 'Sortable.js',
            version: '1.15.1',
            type: 'js',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.15.1/Sortable.min.js',
            description: 'Drag and drop library'
        },
        {
            name: 'Hammer.js',
            version: '2.0.8',
            type: 'js',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js',
            description: 'Touch gesture library'
        },
        {
            name: 'D3.js',
            version: '7.8.5',
            type: 'js',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js',
            description: 'Data visualization library'
        },
        {
            name: 'Lottie',
            version: '5.12.2',
            type: 'js',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js',
            description: 'Airbnb animation library'
        },
        {
            name: 'Prism.js',
            version: '1.29.0',
            type: 'js',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js',
            description: 'Lightweight syntax highlighter'
        },
        {
            name: 'Prism CSS',
            version: '1.29.0',
            type: 'css',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css',
            description: 'Prism default theme'
        }
    ],
    
    editorOptions: {
        lineNumbers: true,
        mode: 'htmlmixed',
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
};