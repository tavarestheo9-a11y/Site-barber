document.addEventListener('DOMContentLoaded', () => {

  /* --- 1. Loader --- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => loader.style.display = 'none', 500);
    }, 400);
  });

  /* --- 2. Menu Mobile Navigation --- */
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');
  const navLinks = document.querySelectorAll('.nav__link');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.add('show-menu');
    });
  }

  if (navClose) {
    navClose.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
    });
  });

  /* --- 3. Sticky Header & Back to Top --- */
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }

    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  /* --- 4. Lightbox Galeria --- */
  const galleryItems = document.querySelectorAll('.gallery__item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-src');
      lightboxImg.setAttribute('src', src);
      lightbox.classList.add('active');
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });
  }

  /* --- 5. Contadores Animados (Stats) --- */
  const statsNumbers = document.querySelectorAll('.stats__number');
  let animated = false;

  const animateCounters = () => {
    statsNumbers.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const isFloat = target % 1 !== 0;
      let count = 0;
      const speed = target / 50;

      const updateCount = () => {
        count += speed;
        if (count < target) {
          counter.innerText = isFloat ? count.toFixed(1) : Math.ceil(count);
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  window.addEventListener('scroll', () => {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
      const sectionPos = statsSection.getBoundingClientRect().top;
      const screenPos = window.innerHeight / 1.3;

      if (sectionPos < screenPos && !animated) {
        animateCounters();
        animated = true;
      }
    }
  });

  /* --- 6. Agendamento com Envio Direct para WhatsApp --- */
  const bookingForm = document.getElementById('booking-form');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = document.getElementById('nome').value;
      const telefone = document.getElementById('telefone').value;
      const servico = document.getElementById('servico').value;
      const barbeiro = document.getElementById('barbeiro').value;
      const data = document.getElementById('data').value;
      const horario = document.getElementById('horario').value;

      const phoneBarber = "5511999998888"; // Insira o número do WhatsApp da barbearia aqui

      const message = `Olá, gostaria de realizar um agendamento!\n\n` +
        `*Nome:* ${nome}\n` +
        `*Telefone:* ${telefone}\n` +
        `*Serviço:* ${servico}\n` +
        `*Barbeiro:* ${barbeiro}\n` +
        `*Data:* ${data}\n` +
        `*Horário:* ${horario}`;

      const whatsappUrl = `https://wa.me/${phoneBarber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    });
  }

  /* --- 7. Cursor Personalizado --- */
  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.custom-cursor-follower');

  if (cursor && follower) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      follower.style.left = `${e.clientX}px`;
      follower.style.top = `${e.clientY}px`;
    });
  }
});
