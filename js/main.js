// Inicializa as animações AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Navbar scroll effect
function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    const isMobile = window.innerWidth < 992;
    
    if (isMobile || window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Atualiza o navbar no carregamento e no resize
document.addEventListener('DOMContentLoaded', updateNavbar);
window.addEventListener('load', updateNavbar);
window.addEventListener('resize', updateNavbar);
window.addEventListener('scroll', updateNavbar);

// Controle do menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .navbar-nav .btn');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const body = document.body;

    // Adiciona delay na animação dos itens do menu
    navLinks.forEach((link, index) => {
        const parent = link.parentElement;
        parent.style.transitionDelay = `${index * 0.1}s`;
    });

    // Fecha o menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                navbarCollapse.classList.remove('show');
                navbarToggler.classList.add('collapsed');
                body.style.overflow = '';
            }
        });
    });

    // Toggle do menu
    navbarToggler.addEventListener('click', () => {
        const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';
        body.style.overflow = isExpanded ? '' : 'hidden';
    });
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Aqui você pode adicionar a lógica de envio do formulário
        alert('Mensagem enviada com sucesso!');
        form.reset();
    });
} 