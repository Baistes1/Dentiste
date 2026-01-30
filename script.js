
document.addEventListener('DOMContentLoaded', function() {
    // ========================
    // MOBILE MENU TOGGLE
    // ========================
    // Menu mobile (stable)
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

const setOpen = (open) => {
  nav.classList.toggle('active', open);
  hamburger.innerHTML = open
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
  document.body.style.overflow = open ? 'hidden' : '';
};

hamburger.addEventListener('click', () => {
  setOpen(!nav.classList.contains('active'));
});

document.querySelectorAll('.nav-link').forEach(a => {
  a.addEventListener('click', () => setOpen(false));
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setOpen(false);
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) setOpen(false);
});

    
    // ========================
    // HEADER SCROLL EFFECT
    // ========================
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // ========================
    // TESTIMONIAL SLIDER
    // ========================
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slides = document.querySelectorAll('.testimonial-slide');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    function updateSlider() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    });
    
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlider();
    });
    
    // Auto-slide every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    }, 5000);
    
    // ========================
    // APPOINTMENT FORM
    // ========================
    const appointmentForm = document.getElementById('rdvForm');
    
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            date: document.getElementById('date').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        
        // Basic validation
        if (!formData.name || !formData.phone || !formData.email || !formData.date) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }
        
        // In a real application, you would send this data to a server
        console.log('Rendez-vous demandé:', formData);
        
        // Show success message
        alert('Votre demande de rendez-vous a été envoyée avec succès ! Nous vous contacterons dans les plus brefs délais pour confirmer.');
        
        // Reset form
        appointmentForm.reset();
    });
    
    // ========================
    // UPDATE CURRENT YEAR
    // ========================
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // ========================
    // SMOOTH SCROLL
    // ========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================
    // ACTIVE NAV LINK ON SCROLL
    // ========================
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Initial check
    updateActiveNavLink();
    
    // ========================
    // DATE INPUT MIN VALUE
    // ========================
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
});
