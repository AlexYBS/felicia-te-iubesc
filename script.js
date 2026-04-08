/* ==============================
   ROMANTIC WEBSITE - SCRIPTS
   Pentru Felicia cu dragoste ❤️
   ============================== */

document.addEventListener('DOMContentLoaded', () => {

    // ===== LIVE COUNTER — 19 Noiembrie 2025 =====
    const coupleDate = new Date('2025-11-19T00:00:00');
    const counterDays = document.getElementById('counter-days');
    const counterHours = document.getElementById('counter-hours');
    const counterMinutes = document.getElementById('counter-minutes');
    const counterSeconds = document.getElementById('counter-seconds');
    const statHeartbeats = document.getElementById('stat-heartbeats');

    function updateCounter() {
        const now = new Date();
        const diff = now - coupleDate;
        
        if (diff < 0) return;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if (counterDays) counterDays.textContent = days;
        if (counterHours) counterHours.textContent = String(hours).padStart(2, '0');
        if (counterMinutes) counterMinutes.textContent = String(minutes).padStart(2, '0');
        if (counterSeconds) counterSeconds.textContent = String(seconds).padStart(2, '0');

        // Heartbeats (~100,000 per day)
        if (statHeartbeats) {
            const totalHeartbeats = Math.floor(diff / 1000 * 1.15); // ~1.15 beats per second
            statHeartbeats.textContent = totalHeartbeats.toLocaleString('ro-RO');
        }
    }

    updateCounter();
    setInterval(updateCounter, 1000);

    // ===== Gallery Filters =====
    const filterBtns = document.querySelectorAll('.gallery-filter');
    const galleryAll = document.querySelectorAll('.gallery-item[data-category]');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            
            galleryAll.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden-filter');
                    item.style.animation = 'zoomInGallery 0.4s ease forwards';
                } else {
                    item.classList.add('hidden-filter');
                }
            });
        });
    });

    // ===== Video Section — hide placeholder if video loads =====
    const coupleVideo = document.getElementById('couple-video');
    const videoNoFile = document.getElementById('video-no-file');
    if (coupleVideo && videoNoFile) {
        coupleVideo.addEventListener('loadeddata', () => {
            videoNoFile.style.display = 'none';
        });
        coupleVideo.addEventListener('error', () => {
            videoNoFile.style.display = 'flex';
            coupleVideo.style.display = 'none';
        });
        // If no source, show placeholder
        if (!coupleVideo.querySelector('source[src]') || coupleVideo.networkState === 3) {
            videoNoFile.style.display = 'flex';
        }
    }

    // ===== Before / After Slider =====
    const baSlider = document.getElementById('ba-slider');
    const baHandle = document.getElementById('ba-handle');
    
    if (baSlider && baHandle) {
        let isDragging = false;
        
        function updateSlider(x) {
            const rect = baSlider.getBoundingClientRect();
            let pos = (x - rect.left) / rect.width;
            pos = Math.max(0.05, Math.min(0.95, pos));
            
            const before = baSlider.querySelector('.ba-before');
            if (before) {
                before.style.clipPath = `inset(0 ${(1 - pos) * 100}% 0 0)`;
            }
            baHandle.style.left = (pos * 100) + '%';
        }
        
        baSlider.addEventListener('mousedown', (e) => {
            isDragging = true;
            updateSlider(e.clientX);
        });
        
        document.addEventListener('mousemove', (e) => {
            if (isDragging) updateSlider(e.clientX);
        });
        
        document.addEventListener('mouseup', () => isDragging = false);
        
        // Touch support
        baSlider.addEventListener('touchstart', (e) => {
            isDragging = true;
            updateSlider(e.touches[0].clientX);
        });
        
        document.addEventListener('touchmove', (e) => {
            if (isDragging) updateSlider(e.touches[0].clientX);
        });
        
        document.addEventListener('touchend', () => isDragging = false);
    }

    // Add gallery zoom animation
    const galleryAnimStyle = document.createElement('style');
    galleryAnimStyle.textContent = `
        @keyframes zoomInGallery {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
        }
    `;
    document.head.appendChild(galleryAnimStyle);

    // ===== Floating Hearts Background =====
    const heartsBg = document.getElementById('hearts-bg');
    const heartSymbols = ['♥', '♡', '❤', '💕', '💗'];
    
    function createFloatingHeart() {
        const heart = document.createElement('span');
        heart.classList.add('floating-heart');
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 30 + 15) + 'px';
        heart.style.animationDuration = (Math.random() * 15 + 10) + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heartsBg.appendChild(heart);

        setTimeout(() => heart.remove(), 25000);
    }

    // Create initial hearts
    for (let i = 0; i < 15; i++) {
        setTimeout(createFloatingHeart, i * 800);
    }
    // Keep creating hearts
    setInterval(createFloatingHeart, 2000);

    // ===== Hero Petals =====
    const petalsContainer = document.getElementById('hero-petals');
    
    function createPetal() {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 5 + 5) + 's';
        petal.style.animationDelay = Math.random() * 3 + 's';
        petal.style.width = (Math.random() * 10 + 8) + 'px';
        petal.style.height = petal.style.width;
        petal.style.opacity = Math.random() * 0.6 + 0.2;
        petalsContainer.appendChild(petal);

        setTimeout(() => petal.remove(), 10000);
    }

    for (let i = 0; i < 20; i++) {
        setTimeout(createPetal, i * 500);
    }
    setInterval(createPetal, 800);

    // ===== Navbar scroll effect =====
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===== Mobile navigation toggle =====
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.textContent = '☰';
        });
    });

    // ===== Scroll Animations (custom AOS-like) =====
    const animatedElements = document.querySelectorAll('[data-aos]');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    // ===== Gallery Lightbox =====
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    // ===== Smooth parallax on hero =====
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
        }
    });

    // ===== Typing effect for hero subtitle =====
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const originalText = heroSubtitle.textContent;
    
    // Add a sparkle cursor effect on mouse move (only on desktop)
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            // Throttle sparkle creation
            if (Math.random() > 0.92) {
                const sparkle = document.createElement('div');
                sparkle.style.cssText = `
                    position: fixed;
                    left: ${e.clientX}px;
                    top: ${e.clientY}px;
                    width: 5px;
                    height: 5px;
                    background: ${Math.random() > 0.5 ? '#ff6b9d' : '#e8a0bf'};
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    animation: sparkle 0.8s ease forwards;
                `;
                document.body.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), 800);
            }
        });

        // Add sparkle animation
        const sparkleStyle = document.createElement('style');
        sparkleStyle.textContent = `
            @keyframes sparkle {
                0% { transform: scale(1); opacity: 1; }
                100% { transform: scale(0) translateY(-20px); opacity: 0; }
            }
        `;
        document.head.appendChild(sparkleStyle);
    }

    // ===== Counter animation for "reasons" numbers =====
    const reasonNumbers = document.querySelectorAll('.reason-number');
    const reasonObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                let count = 0;
                const interval = setInterval(() => {
                    count++;
                    entry.target.textContent = count;
                    if (count >= target) clearInterval(interval);
                }, 100);
                reasonObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    reasonNumbers.forEach(num => reasonObserver.observe(num));

    // ===== Active nav link highlight on scroll =====
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            
            if (navLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLink.style.color = navbar.classList.contains('scrolled') ? '#c2185b' : '#fce4ec';
                } else {
                    navLink.style.color = '';
                }
            }
        });
    });

    // ===== Bucket List Checkbox Toggle =====
    const bucketItems = document.querySelectorAll('.bucket-item');
    bucketItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('checked');
            const checkbox = item.querySelector('.bucket-checkbox');
            if (item.classList.contains('checked')) {
                checkbox.textContent = '☑';
                // Add celebration effect
                for (let i = 0; i < 8; i++) {
                    const confetti = document.createElement('span');
                    confetti.textContent = ['❤️', '✨', '💕', '🎉', '💗'][Math.floor(Math.random() * 5)];
                    confetti.style.cssText = `
                        position: fixed;
                        left: ${item.getBoundingClientRect().right}px;
                        top: ${item.getBoundingClientRect().top}px;
                        font-size: 1.2rem;
                        pointer-events: none;
                        z-index: 9999;
                        animation: confettiBurst 1s ease forwards;
                        --angle: ${(Math.random() * 360)}deg;
                        --distance: ${50 + Math.random() * 80}px;
                    `;
                    document.body.appendChild(confetti);
                    setTimeout(() => confetti.remove(), 1000);
                }
            } else {
                checkbox.textContent = '☐';
            }
        });
    });

    // Add confetti animation
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes confettiBurst {
            0% { transform: translate(0, 0) scale(1); opacity: 1; }
            100% { 
                transform: translate(
                    calc(cos(var(--angle)) * var(--distance)), 
                    calc(sin(var(--angle)) * var(--distance) - 50px)
                ) scale(0); 
                opacity: 0; 
            }
        }
    `;
    document.head.appendChild(confettiStyle);

    // ===== Oath lines - appear one by one with emphasis =====
    const oathLines = document.querySelectorAll('.oath-line');
    const oathObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.borderLeftColor = '#c2185b';
                entry.target.style.background = 'rgba(252, 228, 236, 0.3)';
                oathObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    oathLines.forEach(line => oathObserver.observe(line));

    // ===== Typewriter effect for final message =====
    const finalText = document.querySelector('.final-text');
    if (finalText) {
        const finalObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInSlow 2s ease forwards';
                    finalObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        finalObserver.observe(finalText);
    }

    // Add fadeInSlow animation
    const fadeStyle = document.createElement('style');
    fadeStyle.textContent = `
        @keyframes fadeInSlow {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(fadeStyle);

    // ===== Preloader =====
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1800);
    }

    // ===== Back to Top Button =====
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== Floating Music Button =====
    const musicToggle = document.getElementById('music-toggle');
    let ambientAudio = null;
    let isMusicPlaying = false;

    if (musicToggle) {
        // Create a gentle ambient audio using oscillator (no external file needed)
        const AudioContext = window.AudioContext || window.webkitAudioContext;

        musicToggle.addEventListener('click', () => {
            if (!ambientAudio) {
                try {
                    ambientAudio = new AudioContext();
                    // Create a gentle, dreamy pad sound
                    function createPad(freq, gain) {
                        const osc = ambientAudio.createOscillator();
                        const gainNode = ambientAudio.createGain();
                        osc.type = 'sine';
                        osc.frequency.value = freq;
                        gainNode.gain.value = gain;
                        osc.connect(gainNode);
                        gainNode.connect(ambientAudio.destination);
                        osc.start();
                        return { osc, gainNode };
                    }
                    // Soft chord: C major with added 9th
                    createPad(261.63, 0.02); // C4
                    createPad(329.63, 0.015); // E4
                    createPad(392.00, 0.015); // G4
                    createPad(293.66, 0.01); // D4 (add9)
                    isMusicPlaying = true;
                    musicToggle.classList.add('playing');
                } catch(e) {
                    // Audio not supported
                }
            } else if (isMusicPlaying) {
                ambientAudio.suspend();
                isMusicPlaying = false;
                musicToggle.classList.remove('playing');
            } else {
                ambientAudio.resume();
                isMusicPlaying = true;
                musicToggle.classList.add('playing');
            }
        });
    }

    // ===== Custom Heart Cursor Trail (desktop only) =====
    if (window.innerWidth > 768) {
        const cursorTrails = [];
        const trailCount = 5;

        for (let i = 0; i < trailCount; i++) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.width = (8 - i * 1.2) + 'px';
            trail.style.height = (8 - i * 1.2) + 'px';
            trail.style.opacity = (0.4 - i * 0.07);
            document.body.appendChild(trail);
            cursorTrails.push({ el: trail, x: 0, y: 0 });
        }

        let mouseX = 0, mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursorTrail() {
            let prevX = mouseX, prevY = mouseY;
            cursorTrails.forEach((trail, i) => {
                const speed = 0.3 - i * 0.04;
                trail.x += (prevX - trail.x) * speed;
                trail.y += (prevY - trail.y) * speed;
                trail.el.style.left = trail.x + 'px';
                trail.el.style.top = trail.y + 'px';
                prevX = trail.x;
                prevY = trail.y;
            });
            requestAnimationFrame(animateCursorTrail);
        }
        animateCursorTrail();
    }

    // ===== Secret Love Notes — Click to Reveal =====
    const envelopes = document.querySelectorAll('.secret-envelope');
    envelopes.forEach(envelope => {
        envelope.addEventListener('click', () => {
            envelope.classList.toggle('opened');
            if (envelope.classList.contains('opened')) {
                // Heart burst effect
                for (let i = 0; i < 12; i++) {
                    const heart = document.createElement('span');
                    heart.textContent = ['💕', '💌', '✨', '💗', '❤️'][Math.floor(Math.random() * 5)];
                    heart.style.cssText = `
                        position: fixed;
                        left: ${envelope.getBoundingClientRect().left + envelope.offsetWidth / 2}px;
                        top: ${envelope.getBoundingClientRect().top + envelope.offsetHeight / 2}px;
                        font-size: 1.5rem;
                        pointer-events: none;
                        z-index: 9999;
                        transition: all 1s ease;
                        opacity: 1;
                    `;
                    document.body.appendChild(heart);
                    const angle = (i / 12) * Math.PI * 2;
                    const distance = 60 + Math.random() * 60;
                    requestAnimationFrame(() => {
                        heart.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance - 30}px)`;
                        heart.style.opacity = '0';
                    });
                    setTimeout(() => heart.remove(), 1000);
                }
            }
        });
    });

    // ===== Love Poem — Typewriter Reveal on Scroll =====
    const poemWrapper = document.querySelector('.poem-wrapper');
    const poemLines = document.querySelectorAll('.poem-line');
    
    if (poemWrapper && poemLines.length) {
        const poemObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    poemWrapper.classList.add('active');
                    poemLines.forEach(line => {
                        const delay = parseInt(line.getAttribute('data-delay')) || 0;
                        setTimeout(() => {
                            line.classList.add('visible');
                        }, delay);
                    });
                    poemObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        poemObserver.observe(poemWrapper);
    }

    // ===== Love Quiz =====
    const quizQuestions = [
        {
            q: 'Ce culoare au ochii mei preferați din lume?',
            options: ['Albaștri', 'Verzi', 'Ai tăi — oricum ar fi', 'Căprui'],
            correct: 2
        },
        {
            q: 'Ce aș face dacă ar trebui să aleg între tot aurul din lume și tine?',
            options: ['Aș lua aurul', 'Te-aș alege pe tine fără ezitare', 'Aș negocia', 'M-aș gândi'],
            correct: 1
        },
        {
            q: 'Care e momentul meu preferat din zi?',
            options: ['Dimineața la cafea', 'Când vorbesc cu tine', 'Seara la culcare', 'Pauza de prânz'],
            correct: 1
        },
        {
            q: 'Dacă aș putea opri un singur moment pentru totdeauna, care ar fi?',
            options: ['Vacanța perfectă', 'Prima noastră întâlnire', 'Orice moment cu tine', 'Un concert'],
            correct: 2
        },
        {
            q: 'Câte lucruri iubesc la tine?',
            options: ['10', '100', '1000', 'Infinite — nu se pot număra'],
            correct: 3
        },
        {
            q: 'Ce mi-aș dori cel mai mult în viitor?',
            options: ['O mașină scumpă', 'Să călătoresc singur', 'Să îmbătrânim împreună', 'Faimă'],
            correct: 2
        },
        {
            q: 'Care e cea mai frumoasă zi din viața mea?',
            options: ['Ziua mea de naștere', '19 Noiembrie 2025', 'Revelionul', 'Prima zi de școală'],
            correct: 1
        },
        {
            q: 'Ce simt când te văd zâmbind?',
            options: ['Nimic special', 'Puțină bucurie', 'Inima mea se oprește și lumea devine perfectă', 'Mă sperii'],
            correct: 2
        }
    ];

    let quizCurrent = 0;
    let quizScore = 0;
    const quizContainer = document.getElementById('quiz-container');
    const quizQuestion = document.getElementById('quiz-question');
    const quizOptions = document.getElementById('quiz-options');
    const quizNum = document.getElementById('quiz-num');
    const quizProgressBar = document.getElementById('quiz-progress-bar');
    const quizResult = document.getElementById('quiz-result');
    const quizScoreText = document.getElementById('quiz-score-text');
    const quizResultMsg = document.getElementById('quiz-result-msg');
    const quizRestart = document.getElementById('quiz-restart');

    function loadQuizQuestion() {
        if (!quizQuestion || !quizOptions) return;
        
        const q = quizQuestions[quizCurrent];
        quizQuestion.textContent = q.q;
        quizNum.textContent = `Întrebarea ${quizCurrent + 1} / ${quizQuestions.length}`;
        quizProgressBar.style.width = ((quizCurrent) / quizQuestions.length * 100) + '%';
        quizOptions.innerHTML = '';
        
        q.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option';
            btn.textContent = opt;
            btn.addEventListener('click', () => selectAnswer(i, btn));
            quizOptions.appendChild(btn);
        });
    }

    function selectAnswer(index, btn) {
        const q = quizQuestions[quizCurrent];
        const allBtns = quizOptions.querySelectorAll('.quiz-option');
        allBtns.forEach(b => b.style.pointerEvents = 'none');

        if (index === q.correct) {
            btn.classList.add('correct');
            quizScore++;
        } else {
            btn.classList.add('wrong');
            allBtns[q.correct].classList.add('correct');
        }

        setTimeout(() => {
            quizCurrent++;
            if (quizCurrent < quizQuestions.length) {
                loadQuizQuestion();
            } else {
                showQuizResult();
            }
        }, 1200);
    }

    function showQuizResult() {
        if (!quizResult) return;
        quizQuestion.style.display = 'none';
        quizOptions.style.display = 'none';
        quizNum.style.display = 'none';
        quizProgressBar.style.width = '100%';
        quizResult.style.display = 'block';
        quizScoreText.textContent = `${quizScore}/${quizQuestions.length}`;

        if (quizScore === quizQuestions.length) {
            quizResultMsg.textContent = 'Mă cunoști perfect! Suntem suflete pereche! 💕';
        } else if (quizScore >= quizQuestions.length * 0.7) {
            quizResultMsg.textContent = 'Mă cunoști foarte bine! Inima mea e a ta! 🥰';
        } else if (quizScore >= quizQuestions.length * 0.4) {
            quizResultMsg.textContent = 'Destul de bine! Dar mai avem multe de descoperit... 💝';
        } else {
            quizResultMsg.textContent = 'Hai să ne cunoaștem mai bine... dar te iubesc oricum! ❤️';
        }
    }

    if (quizRestart) {
        quizRestart.addEventListener('click', () => {
            quizCurrent = 0;
            quizScore = 0;
            quizQuestion.style.display = '';
            quizOptions.style.display = '';
            quizNum.style.display = '';
            quizResult.style.display = 'none';
            loadQuizQuestion();
        });
    }

    loadQuizQuestion();

    // ===== Fireworks Canvas =====
    const fwCanvas = document.getElementById('fireworks-canvas');
    if (fwCanvas) {
        const fwCtx = fwCanvas.getContext('2d');
        let fireworks = [];
        let particles = [];
        let fwRunning = false;

        function resizeFwCanvas() {
            const section = document.getElementById('fireworks-section');
            if (section) {
                fwCanvas.width = section.offsetWidth;
                fwCanvas.height = section.offsetHeight;
            }
        }
        resizeFwCanvas();
        window.addEventListener('resize', resizeFwCanvas);

        class Particle {
            constructor(x, y, color) {
                this.x = x;
                this.y = y;
                this.color = color;
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 5 + 2;
                this.vx = Math.cos(angle) * speed;
                this.vy = Math.sin(angle) * speed;
                this.alpha = 1;
                this.decay = Math.random() * 0.02 + 0.015;
                this.size = Math.random() * 3 + 1;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.vy += 0.05;
                this.vx *= 0.99;
                this.alpha -= this.decay;
            }
            draw(ctx) {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        class Firework {
            constructor(x, targetY) {
                this.x = x;
                this.y = fwCanvas.height;
                this.targetY = targetY;
                this.speed = 4 + Math.random() * 3;
                this.done = false;
                this.color = `hsl(${Math.random() * 60 + 320}, 100%, 65%)`;
                this.trail = [];
            }
            update() {
                this.trail.push({ x: this.x, y: this.y });
                if (this.trail.length > 8) this.trail.shift();
                this.y -= this.speed;
                if (this.y <= this.targetY) {
                    this.done = true;
                    this.explode();
                }
            }
            explode() {
                const colors = [
                    `hsl(${Math.random() * 60 + 320}, 100%, 65%)`,
                    `hsl(${Math.random() * 60 + 320}, 100%, 75%)`,
                    '#ff6b9d', '#fce4ec', '#f48fb1', '#e91e63', '#fff'
                ];
                for (let i = 0; i < 60; i++) {
                    particles.push(new Particle(
                        this.x, this.y,
                        colors[Math.floor(Math.random() * colors.length)]
                    ));
                }
            }
            draw(ctx) {
                // Trail
                for (let i = 0; i < this.trail.length; i++) {
                    ctx.save();
                    ctx.globalAlpha = i / this.trail.length * 0.5;
                    ctx.fillStyle = this.color;
                    ctx.beginPath();
                    ctx.arc(this.trail[i].x, this.trail[i].y, 2, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                }
                // Head
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function fwAnimate() {
            if (!fwRunning) return;
            fwCtx.fillStyle = 'rgba(10, 0, 21, 0.15)';
            fwCtx.fillRect(0, 0, fwCanvas.width, fwCanvas.height);

            fireworks = fireworks.filter(fw => {
                fw.update();
                if (!fw.done) fw.draw(fwCtx);
                return !fw.done;
            });

            particles = particles.filter(p => {
                p.update();
                if (p.alpha > 0) p.draw(fwCtx);
                return p.alpha > 0;
            });

            if (fireworks.length > 0 || particles.length > 0) {
                requestAnimationFrame(fwAnimate);
            } else {
                fwRunning = false;
            }
        }

        function launchFirework(clientX, clientY) {
            const rect = fwCanvas.getBoundingClientRect();
            const x = clientX - rect.left;
            const y = clientY - rect.top;
            fireworks.push(new Firework(x, y));
            if (!fwRunning) {
                fwRunning = true;
                fwAnimate();
            }
        }

        // Click to launch fireworks
        const fwSection = document.getElementById('fireworks-section');
        fwSection.addEventListener('click', (e) => {
            launchFirework(e.clientX, e.clientY);
            // Launch a few more nearby for effect
            setTimeout(() => launchFirework(e.clientX - 50 + Math.random() * 100, e.clientY - 30 + Math.random() * 60), 200);
            setTimeout(() => launchFirework(e.clientX - 80 + Math.random() * 160, e.clientY - 50 + Math.random() * 40), 400);
        });

        // Auto-launch fireworks when section is in view
        const fwObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let count = 0;
                    const autoLaunch = setInterval(() => {
                        launchFirework(
                            Math.random() * fwCanvas.width,
                            Math.random() * fwCanvas.height * 0.6
                        );
                        count++;
                        if (count >= 5) clearInterval(autoLaunch);
                    }, 600);
                    fwObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });
        fwObserver.observe(fwSection);
    }

    console.log('💕 Website-ul de dragoste pentru Felicia e gata! 💕');
});
