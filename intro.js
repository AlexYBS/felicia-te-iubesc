/* ==============================
   CINEMATIC INTRO — Controller
   ============================== */

document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('intro-overlay');
    const mainWebsite = document.getElementById('main-website');
    const skipBtn = document.getElementById('intro-skip');
    const starsContainer = document.getElementById('intro-stars');
    const progressDots = document.querySelectorAll('.progress-dot');
    
    let currentScreen = 0;
    const totalScreens = 9; // 0 through 8
    let isTransitioning = false;
    let introFinished = false;

    // Date they became a couple
    const coupleDate = new Date('2025-11-19T00:00:00');

    // ===== Create stars =====
    function createStars() {
        for (let i = 0; i < 120; i++) {
            const star = document.createElement('div');
            star.classList.add('intro-star');
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.setProperty('--dur', (1.5 + Math.random() * 3) + 's');
            star.style.setProperty('--max-op', (0.3 + Math.random() * 0.7));
            star.style.animationDelay = Math.random() * 3 + 's';
            
            // Some bigger stars
            if (Math.random() > 0.9) {
                star.style.width = '3px';
                star.style.height = '3px';
                star.style.boxShadow = '0 0 6px rgba(255,255,255,0.3)';
            }
            
            starsContainer.appendChild(star);
        }
    }
    createStars();

    // ===== Update progress dots =====
    function updateProgress(screen) {
        progressDots.forEach((dot, i) => {
            dot.classList.remove('active', 'passed');
            if (i === screen) {
                dot.classList.add('active');
            } else if (i < screen) {
                dot.classList.add('passed');
            }
        });
    }

    // ===== Show a specific story screen =====
    function showScreen(index) {
        if (isTransitioning || index >= totalScreens || introFinished) return;
        isTransitioning = true;

        // Hide current screen
        const current = document.getElementById('story-' + currentScreen);
        if (current) {
            current.classList.remove('active');
        }

        // Show new screen after fade
        setTimeout(() => {
            currentScreen = index;
            const next = document.getElementById('story-' + index);
            if (next) {
                next.classList.add('active');
            }
            updateProgress(index);

            // Special handling for days counter screen (story-5)
            if (index === 5) {
                const daysCount = document.getElementById('story-days-count');
                if (daysCount) {
                    const now = new Date();
                    const days = Math.floor((now - coupleDate) / (1000 * 60 * 60 * 24));
                    animateNumber(daysCount, days, 2000);
                }
            }

            // Special handling for ring screen (story-7)
            if (index === 7) {
                triggerRingAnimation();
            }

            isTransitioning = false;
        }, 600);
    }

    // ===== Animate number counting =====
    function animateNumber(element, target, duration) {
        const start = 0;
        const startTime = performance.now();
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quad
            const eased = 1 - (1 - progress) * (1 - progress);
            const current = Math.floor(start + (target - start) * eased);
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = target;
            }
        }
        requestAnimationFrame(updateNumber);
    }

    // ===== Ring animation sequence =====
    function triggerRingAnimation() {
        const lid = document.getElementById('ring-box-lid');
        const ring = document.getElementById('ring');
        const ringText = document.getElementById('ring-text');

        // Step 1: Open lid after 1s
        setTimeout(() => {
            lid.classList.add('open');
        }, 1000);

        // Step 2: Show ring after lid opens
        setTimeout(() => {
            ring.classList.add('visible');
        }, 2000);

        // Step 3: Typewriter text
        setTimeout(() => {
            typeWriter(ringText, 'Vrei să fii a mea... pentru totdeauna?', 60);
        }, 3000);
    }

    // ===== Typewriter effect =====
    function typeWriter(element, text, speed) {
        let i = 0;
        element.innerHTML = '<span class="typewriter-cursor"></span>';
        
        function type() {
            if (i < text.length) {
                const cursor = element.querySelector('.typewriter-cursor');
                element.insertBefore(document.createTextNode(text.charAt(i)), cursor);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // ===== Navigate to next screen =====
    function nextScreen() {
        if (introFinished) return;
        
        if (currentScreen === totalScreens - 1) {
            // Last screen — finish intro
            finishIntro();
        } else {
            showScreen(currentScreen + 1);
        }
    }

    // ===== Finish intro & reveal website =====
    function finishIntro() {
        if (introFinished) return;
        introFinished = true;

        // Create a burst of particles
        createFinishParticles();

        // Fade out overlay
        setTimeout(() => {
            overlay.classList.add('hidden');
            mainWebsite.classList.add('visible');
        }, 600);

        // Remove overlay from DOM after animation
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 2000);
    }

    // ===== Finish particles =====
    function createFinishParticles() {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            const hearts = ['❤️', '💕', '✨', '💗', '♥'];
            particle.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            particle.style.cssText = `
                position: fixed;
                left: 50%;
                top: 50%;
                font-size: ${1 + Math.random() * 1.5}rem;
                pointer-events: none;
                z-index: 10001;
                transition: all ${1 + Math.random()}s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                opacity: 1;
            `;
            overlay.appendChild(particle);

            // Animate outward
            requestAnimationFrame(() => {
                const angle = (i / 30) * Math.PI * 2;
                const distance = 100 + Math.random() * 300;
                particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
                particle.style.opacity = '0';
            });
        }
    }

    // ===== Event Listeners =====
    
    // Click/tap to advance
    overlay.addEventListener('click', (e) => {
        // Don't advance if clicking skip
        if (e.target === skipBtn || skipBtn.contains(e.target)) return;
        nextScreen();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (introFinished) return;
        if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') {
            e.preventDefault();
            nextScreen();
        }
        if (e.key === 'Escape') {
            finishIntro();
        }
    });

    // Skip button
    skipBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        finishIntro();
    });

    // Prevent scrolling during intro
    function preventScroll(e) {
        if (!introFinished) {
            e.preventDefault();
        }
    }
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });

    // Remove scroll lock after intro
    const checkIntro = setInterval(() => {
        if (introFinished) {
            window.removeEventListener('wheel', preventScroll);
            window.removeEventListener('touchmove', preventScroll);
            clearInterval(checkIntro);
        }
    }, 500);

    // ===== Shooting stars occasionally =====
    function createShootingStar() {
        if (introFinished) return;
        
        const star = document.createElement('div');
        const startX = Math.random() * 80 + 10;
        const startY = Math.random() * 40;
        
        star.style.cssText = `
            position: absolute;
            left: ${startX}%;
            top: ${startY}%;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            box-shadow: 0 0 6px white, -20px 0 10px rgba(255,255,255,0.3), -40px 0 6px rgba(255,255,255,0.1);
            animation: shootingStar 1s linear forwards;
            pointer-events: none;
            z-index: 1;
        `;
        starsContainer.appendChild(star);
        setTimeout(() => star.remove(), 1200);
    }

    // Add shooting star animation
    const shootingStarStyle = document.createElement('style');
    shootingStarStyle.textContent = `
        @keyframes shootingStar {
            0% { transform: translate(0, 0) rotate(-35deg); opacity: 1; }
            70% { opacity: 1; }
            100% { transform: translate(300px, 200px) rotate(-35deg); opacity: 0; }
        }
    `;
    document.head.appendChild(shootingStarStyle);

    // Random shooting stars
    setInterval(() => {
        if (Math.random() > 0.5) createShootingStar();
    }, 3000);

    // First shooting star after 2s
    setTimeout(createShootingStar, 2000);
});
