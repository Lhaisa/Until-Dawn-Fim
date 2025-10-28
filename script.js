document.addEventListener('DOMContentLoaded', () => {
  // Efeito de partículas no loader
  function createLoadingParticle() {
    const particle = document.createElement("div");
    const size = Math.random() * 8 + 4;
    const duration = Math.random() * 3 + 2;
    const left = Math.random() * 100;

    particle.classList.add("particle");
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}vw`;
    particle.style.animationDuration = `${duration}s`;

    document.getElementById("loading-screen").appendChild(particle);

    setTimeout(() => particle.remove(), duration * 1500); // mais tempo para subir
    
  }

  // Inicia partículas no loader
  setInterval(createLoadingParticle, 5);

  // Exibe conteúdo após 2 segundos
  setTimeout(() => {
    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("content").style.display = "flex";
    document.querySelector(".carousel-container").style.display = "flex";
  }, 2000);

  // Carrossel de cartas
  const cardContainers = document.querySelectorAll('.card-container');
  const nextButton = document.querySelector('.next-button');
  const prevButton = document.querySelector('.prev-button');
  let currentCardIndex = 0;

  if (!nextButton || !prevButton || cardContainers.length === 0) return;

  cardContainers[0].classList.add('active');
  createParticles(cardContainers[0]);

  function showCard(index) {
    cardContainers.forEach(card => {
      card.classList.remove('active', 'flipped', 'activated');
      const inner = card.querySelector('.card-inner');
      if (inner) inner.style.transform = '';
    });

    const currentCard = cardContainers[index];
    currentCard.classList.add('active');
    createParticles(currentCard);
  }

  nextButton.addEventListener('click', () => {
    currentCardIndex = (currentCardIndex + 1) % cardContainers.length;
    showCard(currentCardIndex);
  });

  prevButton.addEventListener('click', () => {
    currentCardIndex = (currentCardIndex - 1 + cardContainers.length) % cardContainers.length;
    showCard(currentCardIndex);
  });

  function createParticles(cardContainer) {
    const magicParticles = cardContainer.querySelector('.magic-particles');
    const magicGlow = cardContainer.querySelector('.magic-glow');
    if (!magicParticles || !magicGlow) return;

    magicParticles.innerHTML = '';
    const particleCount = 50;
    let particleClass = '';

    if (magicGlow.classList.contains('red-glow')) particleClass = 'red-particle';
    else if (magicGlow.classList.contains('blue-glow')) particleClass = 'blue-particle';
    else if (magicGlow.classList.contains('white-glow')) particleClass = 'white-particle';

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      if (particleClass) particle.classList.add(particleClass);

      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;

      const duration = Math.random() * 3 + 2;
      const delay = Math.random() * 2;

      particle.style.animation = `
        particle-fade ${duration}s ease-out ${delay}s infinite,
        particle-move ${duration}s ease-out ${delay}s infinite
      `;

      magicParticles.appendChild(particle);
    }
  }

  cardContainers.forEach(cardContainer => {
    const cardInner = cardContainer.querySelector('.card-inner');

    cardContainer.addEventListener('click', () => {
      if (cardContainer.classList.contains('active')) {
        cardContainer.classList.toggle('flipped');
        if (cardInner) cardInner.style.transform = 'rotateY(180deg)';
      }
    });

    cardContainer.addEventListener('dblclick', () => {
      if (cardContainer.classList.contains('active') && cardContainer.classList.contains('flipped')) {
        cardContainer.classList.toggle('activated');
        if (cardContainer.classList.contains('activated')) {
          createParticles(cardContainer);
        }
      }
    });

    cardContainer.addEventListener('mousemove', (e) => {
      if (cardContainer.classList.contains('active') &&
          cardContainer.classList.contains('flipped') &&
          !cardContainer.classList.contains('activated')) {

        const rect = cardContainer.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const tiltX = (y - 0.5) * 20;
        const tiltY = (0.5 - x) * 20;

        if (cardInner) {
          cardInner.style.transform = `rotateY(180deg) rotateX(${tiltX}deg) rotateZ(${tiltY}deg)`;
        }
      }
    });

    cardContainer.addEventListener('mouseleave', () => {
      if (cardContainer.classList.contains('active')) {
        if (cardInner) {
          if (cardContainer.classList.contains('flipped') && !cardContainer.classList.contains('activated')) {
            cardInner.style.transform = 'rotateY(180deg)';
          } else {
            cardInner.style.transform = '';
          }
        }
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextButton.click();
    else if (e.key === 'ArrowLeft') prevButton.click();
  });
});

