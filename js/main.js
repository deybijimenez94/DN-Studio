// 1. Seleccionamos elementos del HTML
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

// ===== FORMULARIO DE CONTACTO =====
const contactForm = document.querySelector('#contact-form');
contactForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const message = document.querySelector('#message').value.trim();

    let valid = true;
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));

    if (name === '') { showError('name', 'Por favor escribe tu nombre.');
        valid = false; }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) { showError('email', 'Escribe un correo válido.');
        valid = false; }

    if (message.length < 10) { showError('message', 'Cuéntanos un poco más (mínimo 10 caracteres).');
        valid = false; }

    if (!valid) return;

    // Todo válido: enviamos con fetch
    const button = contactForm.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = 'Enviando...';

    try {
        const response = await fetch('https://formsubmit.co/ajax/d61b4bad1fbdda8aedb5fe6d3fd850b9', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message,
                _subject: 'Nuevo mensaje desde DN-Studio'
            })
        });

        if (!response.ok) throw new Error('Error en el envío');

        contactForm.innerHTML = '<p class="form-success">¡Mensaje enviado! Te responderemos en menos de 24 horas.</p>';
    } catch (error) {
        button.disabled = false;
        button.textContent = 'Enviar mensaje';
        showError('message', 'Hubo un problema al enviar. Escríbenos por WhatsApp.');
    }
});


function showError(fieldId, text) {
    const field = document.querySelector('#' + fieldId);
    const error = document.createElement('p');
    error.className = 'error-message';
    error.textContent = text;
    field.after(error);
    field.classList.add('input-error');
}


// 2. Cuando hagan clic en el botón...
menuToggle.addEventListener('click', () => {
    // 3. ...prende o apaga la clase 'active'
    navLinks.classList.toggle('active');
});