document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    const navItems = document.querySelectorAll('.nav-links a');
    const contactForm = document.getElementById('contactForm');
    
    // Función para alternar el menú móvil
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Cambiar estilo del header al hacer scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Actualizar enlace activo según la sección visible
        updateActiveNavLink();
    });
    
    // Función para actualizar el enlace activo en la navegación
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }
    
    // Desplazamiento suave para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Validación del formulario de contacto
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores del formulario
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validación básica
            if (name === '' || email === '' || subject === '' || message === '') {
                showAlert('Por favor, completa todos los campos', 'error');
                return;
            }
            
            // Validar formato de email
            if (!isValidEmail(email)) {
                showAlert('Por favor, ingresa un email válido', 'error');
                return;
            }
            
            // Simulación de envío exitoso (aquí se conectaría con un backend real)
            showAlert('¡Mensaje enviado con éxito! Te contactaré pronto.', 'success');
            contactForm.reset();
        });
    }
    
    // Función para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Función para mostrar alertas
    function showAlert(message, type) {
        // Eliminar alertas previas
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Crear nueva alerta
        const alert = document.createElement('div');
        alert.className = `alert ${type}`;
        alert.textContent = message;
        
        // Insertar alerta antes del formulario
        if (contactForm) {
            contactForm.parentNode.insertBefore(alert, contactForm);
        }
        
        // Eliminar alerta después de 3 segundos
        setTimeout(() => {
            alert.remove();
        }, 3000);
    }
    
    // Animación de elementos al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.passion-card, .about-img, .about-text, .work-text, .gallery-item, .contact-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Ejecutar animación al cargar y al hacer scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Inicializar la navegación activa al cargar la página
    updateActiveNavLink();
});

// Añadir estilos CSS para las alertas y animaciones
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .alert {
            padding: 1rem;
            margin-bottom: 1rem;
            border-radius: 5px;
            text-align: center;
        }
        
        .alert.success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .alert.error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        
        .passion-card, .about-img, .about-text, .work-text, .gallery-item, .contact-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .passion-card.animate, .about-img.animate, .about-text.animate, .work-text.animate, .gallery-item.animate, .contact-item.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .passion-card:nth-child(2), .gallery-item:nth-child(2), .contact-item:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .passion-card:nth-child(3), .gallery-item:nth-child(3), .contact-item:nth-child(3) {
            transition-delay: 0.4s;
        }
        
        .gallery-item:nth-child(4) {
            transition-delay: 0.6s;
        }
        
        .menu-toggle.active i {
            transform: rotate(90deg);
        }
    `;
    document.head.appendChild(style);
});