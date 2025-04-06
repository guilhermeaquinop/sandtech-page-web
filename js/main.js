// Inicializa as animações AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Navbar scroll effect
function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    const width = window.innerWidth;
    
    if (width <= 991.98) {
        navbar.classList.add('scrolled');
    } else {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}

// Atualiza o navbar no carregamento e no resize
document.addEventListener('DOMContentLoaded', updateNavbar);
window.addEventListener('load', updateNavbar);
window.addEventListener('resize', updateNavbar);
window.addEventListener('scroll', updateNavbar);

// Controle do menu mobile
const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .navbar-nav .btn');
const menuButton = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

// Adiciona delay na animação dos itens do menu
navLinks.forEach((link, index) => {
    const parent = link.parentElement;
    parent.style.transitionDelay = `${index * 0.1}s`;
});

// Fecha o menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
            menuButton.click();
        }
    });
});

// Toggle do menu
menuButton.addEventListener('click', function() {
    document.body.style.overflow = this.classList.contains('collapsed') ? 'hidden' : '';
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

// Processamento do formulário de contato
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');
        const buttonText = submitButton.querySelector('.button-text');
        const spinner = submitButton.querySelector('.spinner-border');
        
        // Desabilita o botão e mostra o spinner
        submitButton.disabled = true;
        buttonText.style.opacity = '0';
        spinner.classList.remove('d-none');

        try {
            // Verifica se o EmailJS está inicializado
            if (typeof emailjs === 'undefined') {
                throw new Error('Serviço de email não inicializado corretamente.');
            }

            const nome = form.querySelector('[name="from_name"]').value.trim();
            const emailResposta = form.querySelector('[name="from_email"]').value.trim();
            const mensagem = form.querySelector('[name="message"]').value.trim();

            // Validação adicional
            if (!nome || !emailResposta || !mensagem) {
                throw new Error('Por favor, preencha todos os campos.');
            }

            // Log para debug
            console.log('Preparando envio de email...');

            // Envia o email usando EmailJS
            const response = await emailjs.send(
                "service_4u6ql3n",
                "template_r40gijt",
                {
                    to_name: "Sandtech",
                    to_email: "sandtechautomacoes@gmail.com",
                    from_name: nome,
                    from_email: emailResposta, // Email do formulário como remetente
                    message: mensagem
                }
            ).catch(err => {
                console.error('Erro EmailJS:', err);
                throw new Error(err.text || 'Falha ao enviar mensagem');
            });

            console.log('Resposta:', response);

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Mensagem enviada!',
                    text: 'Agradecemos seu contato. Retornaremos em breve.',
                    confirmButtonColor: '#00ADF0'
                });
                form.reset();
            } else {
                throw new Error('Erro ao enviar mensagem. Status: ' + response.status);
            }
        } catch (error) {
            console.error('Erro detalhado:', error);
            Swal.fire({
                icon: 'error',
                title: 'Ops!',
                text: error.message || 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.',
                confirmButtonColor: '#00ADF0'
            });
        } finally {
            // Reativa o botão e esconde o spinner
            submitButton.disabled = false;
            buttonText.style.opacity = '1';
            spinner.classList.add('d-none');
        }
    });
}); 