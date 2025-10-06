document.addEventListener('DOMContentLoaded', function() {
    const loader = document.querySelector('.loader');
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
    const scrollTop = document.getElementById('scrollTop');
    const themeToggle = document.getElementById('themeToggle');
    const themeModal = document.getElementById('themeModal');
    const closeModal = document.getElementById('closeModal');
    const themeOptions = document.querySelectorAll('.theme-option');

    setTimeout(() => {
        loader.classList.add('fade-out');
    }, 1500);

    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.5,
                    random: true
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        if (cursorDot) {
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
        }

        if (cursorOutline) {
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: 'forwards' });
        }
    });

    const interactiveElements = document.querySelectorAll('a, button, .service-box, .project-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursorOutline) {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            }
        });
        el.addEventListener('mouseleave', () => {
            if (cursorOutline) {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            scrollTop.classList.add('active');
        } else {
            header.classList.remove('scrolled');
            scrollTop.classList.remove('active');
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    if (scrollTop) {
        scrollTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    let counterActivated = false;

    const runCounter = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(() => runCounter(), 1);
            } else {
                counter.innerText = target;
            }
        });
    };

    window.addEventListener('scroll', () => {
        const statsSection = document.querySelector('.stats');
        if (statsSection && !counterActivated) {
            const statsPosition = statsSection.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;

            if (statsPosition < screenPosition) {
                runCounter();
                counterActivated = true;
            }
        }
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const serviceBoxes = document.querySelectorAll('.service-box');
    serviceBoxes.forEach(box => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(50px)';
        box.style.transition = 'all 0.6s ease';
        observer.observe(box);
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    const skillBoxes = document.querySelectorAll('.skill-box');
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                const width = progressBar.style.width;
                progressBar.style.width = '0';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
            }
        });
    }, observerOptions);

    skillBoxes.forEach(box => {
        skillObserver.observe(box);
    });

    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hide');
                    card.style.display = 'block';
                } else {
                    card.classList.add('hide');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-btn.prev');
    const nextBtn = document.querySelector('.testimonial-btn.next');
    const dotsContainer = document.querySelector('.testimonial-dots');
    let currentTestimonial = 0;

    testimonialCards.forEach((card, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showTestimonial(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.testimonial-dots .dot');

    function showTestimonial(index) {
        testimonialCards.forEach(card => {
            card.classList.remove('active', 'prev');
        });
        dots.forEach(dot => dot.classList.remove('active'));

        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        });
    }

    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            button.textContent = 'Sending...';
            button.disabled = true;

            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 3000);
        });
    }

    const words = ['Developer', 'Designer', 'Freelancer', 'Creator'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedWordElement = document.querySelector('.typed-word');

    if (typedWordElement) {
        function typeEffect() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                typedWordElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedWordElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = 150;

            if (isDeleting) {
                typeSpeed /= 2;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(typeEffect, typeSpeed);
        }

        typeEffect();
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            themeModal.classList.add('active');
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            themeModal.classList.remove('active');
        });
    }

    themeModal.addEventListener('click', (e) => {
        if (e.target === themeModal) {
            themeModal.classList.remove('active');
        }
    });

    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            document.body.className = '';

            if (theme !== 'default') {
                document.body.classList.add(`theme-${theme}`);
            }

            localStorage.setItem('portfolio-theme', theme);

            themeModal.classList.remove('active');
        });
    });

    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme && savedTheme !== 'default') {
        document.body.classList.add(`theme-${savedTheme}`);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
});
