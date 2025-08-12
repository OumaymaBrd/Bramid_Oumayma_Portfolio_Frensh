
        // GSAP ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);
        
        // Typing Animation
        const texts = [
            "Développeuse Full-Stack",
            "Créatrice d'Expériences Web",
            "Spécialiste React & Node.js",
            "Passionnée d'Innovation"
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingElement = document.getElementById('typing-text');
        
        function typeText() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }
            
            setTimeout(typeText, typeSpeed);
        }
        
        typeText();
        
        // Three.js Scene
        let scene, camera, renderer, particles, geometries = [];
        
        function initThreeJS() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.getElementById('canvas-container').appendChild(renderer.domElement);
            
            // Particles
            const particleGeometry = new THREE.BufferGeometry();
            const particleCount = 2000;
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);
            
            for (let i = 0; i < particleCount * 3; i += 3) {
                positions[i] = (Math.random() - 0.5) * 200;
                positions[i + 1] = (Math.random() - 0.5) * 200;
                positions[i + 2] = (Math.random() - 0.5) * 200;
                
                colors[i] = Math.random() * 0.5 + 0.5;
                colors[i + 1] = Math.random() * 0.5 + 0.5;
                colors[i + 2] = 1;
            }
            
            particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            
            const particleMaterial = new THREE.PointsMaterial({
                size: 2,
                vertexColors: true,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending
            });
            
            particles = new THREE.Points(particleGeometry, particleMaterial);
            scene.add(particles);
            
            // Floating Geometries
            const shapes = [
                new THREE.BoxGeometry(2, 2, 2),
                new THREE.SphereGeometry(1.5, 16, 16),
                new THREE.ConeGeometry(1, 2, 8),
                new THREE.OctahedronGeometry(1.5)
            ];
            
            const materials = [
                new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.3, wireframe: true }),
                new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.3, wireframe: true }),
                new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.3, wireframe: true }),
                new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.3, wireframe: true })
            ];
            
            for (let i = 0; i < 8; i++) {
                const geometry = shapes[Math.floor(Math.random() * shapes.length)];
                const material = materials[Math.floor(Math.random() * materials.length)];
                const mesh = new THREE.Mesh(geometry, material);
                
                mesh.position.set(
                    (Math.random() - 0.5) * 100,
                    (Math.random() - 0.5) * 100,
                    (Math.random() - 0.5) * 100
                );
                
                mesh.rotation.set(
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    Math.random() * Math.PI
                );
                
                geometries.push(mesh);
                scene.add(mesh);
            }
            
            camera.position.z = 50;
            animate();
        }
        
        function animate() {
            requestAnimationFrame(animate);
            
            // Rotate particles
            particles.rotation.x += 0.0005;
            particles.rotation.y += 0.001;
            
            // Animate floating geometries
            geometries.forEach((mesh, index) => {
                mesh.rotation.x += 0.01 + index * 0.001;
                mesh.rotation.y += 0.01 + index * 0.001;
                mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
            });
            
            renderer.render(scene, camera);
        }
        
        // Smooth scrolling
        function scrollToSection(sectionId) {
            document.getElementById(sectionId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Active navigation
        function updateActiveNav() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', updateActiveNav);
        
        // GSAP Animations
        gsap.from(".floating-card", {
            scrollTrigger: {
                trigger: ".floating-card",
                start: "top 80%"
            },
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out"
        });
        
        // GSAP Animations - Commenté temporairement pour debug
        /*
        gsap.from(".project-card", {
            scrollTrigger: {
                trigger: "#projects",
                start: "top 80%"
            },
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power2.out"
        });
        */
        
        // Form submission
        function handleFormSubmit(event) {
            event.preventDefault();
            
            // Show success message
            const button = event.target.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;
            
            button.innerHTML = '<i class="fas fa-check mr-2"></i>Message Envoyé !';
            button.classList.add('bg-green-500');
            button.disabled = true;
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.classList.remove('bg-green-500');
                button.disabled = false;
                event.target.reset();
            }, 3000);
        }
        
        // Download CV function
        function downloadCV() {
            // Create a temporary link to download CV
            const link = document.createElement('a');
            link.href = '#'; // Replace with actual CV URL
            link.download = 'Oumayma_Bramid_CV.pdf';
            link.click();
        }
        
        // Mobile menu toggle
        const menuToggle = document.getElementById('menu-toggle');
        const nav = document.querySelector('nav');
        
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('mobile-menu-open');
        });
        
        // Parallax effect
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.getElementById('canvas-container');
            const speed = scrolled * 0.2;
            parallax.style.transform = `translateY(${speed}px)`;
        });
        
        // Debug function pour vérifier les projets
        function debugProjects() {
            const projectCards = document.querySelectorAll('.project-card');
            console.log(`Nombre de cartes de projets trouvées: ${projectCards.length}`);
            projectCards.forEach((card, index) => {
                console.log(`Projet ${index + 1}:`, card.querySelector('h3')?.textContent);
                console.log(`Visible:`, window.getComputedStyle(card).display !== 'none');
            });
        }
        
        // Initialize everything
        window.addEventListener('load', () => {
            initThreeJS();
            updateActiveNav();
            debugProjects(); // Ajout de la fonction de debug
        });
        
        // Responsive handling
        window.addEventListener('resize', () => {
            if (camera && renderer) {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }
        });
        
        // Cursor trail effect
        let mouseX = 0, mouseY = 0;
        let cursorTrail = [];
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            const trail = document.createElement('div');
            trail.className = 'fixed w-1 h-1 bg-purple-400 rounded-full pointer-events-none z-40 opacity-70';
            trail.style.left = mouseX + 'px';
            trail.style.top = mouseY + 'px';
            trail.style.transform = 'translate(-50%, -50%)';
            document.body.appendChild(trail);
            
            cursorTrail.push(trail);
            
            if (cursorTrail.length > 20) {
                const oldTrail = cursorTrail.shift();
                oldTrail.remove();
            }
            
            setTimeout(() => {
                trail.style.opacity = '0';
                setTimeout(() => trail.remove(), 300);
            }, 100);
        });
        
        // Skill bars animation
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBars = entry.target.querySelectorAll('.skill-bar div');
                    skillBars.forEach((bar, index) => {
                        setTimeout(() => {
                            bar.style.transform = 'scaleX(1)';
                            bar.style.transformOrigin = 'left';
                            bar.style.transition = 'transform 1s ease-out';
                        }, index * 200);
                    });
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('#skills .glass-morphism').forEach(card => {
            skillObserver.observe(card);
        });
        
        // Console easter egg
        console.log(`
        🚀 Portfolio d'Oumayma Bramid
        ================================
        
        Développeuse Full-Stack passionnée
        
        Projets en ligne:
        • Architecture Microservices: https://oumaymabrd.github.io/Architecture-Microservices-Interactive/
        • Makete Animé: https://oumaymabrd.github.io/makete_anime/
        • Chat Temps Réel: https://github.com/OumaymaBrd/Chat_temps_reel
        
        Contactez-moi: oumaymabramid@gmail.com
        GitHub: github.com/OumaymaBrd
        
        Merci de visiter mon portfolio ! 💜
        `);
    