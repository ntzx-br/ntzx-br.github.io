const carrosseis = document.querySelectorAll('.carrossel');

carrosseis.forEach((carrossel) => {
  const slides = carrossel.querySelector('.slides');
  const prevBtn = carrossel.querySelector('.prev');
  const nextBtn = carrossel.querySelector('.next');
  const imagens = slides.querySelectorAll('img');
  let currentIndex = 0;

  function updateCarrossel() {
    const slideWidth = imagens[0].clientWidth; // Largura de uma imagem
    slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + imagens.length) % imagens.length;
    updateCarrossel();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % imagens.length;
    updateCarrossel();
  });

  // Atualiza o tamanho do carrossel ao redimensionar a janela
  window.addEventListener('resize', updateCarrossel);
});
