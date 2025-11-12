document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector('.menu-mobile-btn');
  const sidebar = document.querySelector('.sidebar');

  menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('show');
  });

  // Opcional: fecha o menu clicando fora da sidebar
  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
      sidebar.classList.remove('show');
    }
  });

 const track = document.querySelector(".parceiros-track");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");
  let cards = Array.from(track.children);

  // Duplicamos os cards uma vez para criar o looping contínuo
  const clones = cards.map(card => card.cloneNode(true));
  clones.forEach(clone => track.appendChild(clone));
  cards = Array.from(track.children);

  let cardWidth;
  let position = 0;

  // Atualiza métricas de largura
  function updateMetrics() {
    const style = window.getComputedStyle(cards[0]);
    cardWidth = cards[0].offsetWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight);
  }

  // Movimentos suaves e infinitos
  function moveNext() {
    position -= cardWidth;
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(${position}px)`;

    // quando atingir metade (fim dos originais), reposiciona suavemente
    if (Math.abs(position) >= cardWidth * (cards.length / 2)) {
      setTimeout(() => {
        track.style.transition = "none";
        position = 0;
        track.style.transform = `translateX(${position}px)`;
      }, 500);
    }
  }

  function movePrev() {
    // se está no começo, volta ao meio
    if (position >= 0) {
      track.style.transition = "none";
      position = -cardWidth * (cards.length / 2);
      track.style.transform = `translateX(${position}px)`;
    }
    setTimeout(() => {
      track.style.transition = "transform 0.5s ease";
      position += cardWidth;
      track.style.transform = `translateX(${position}px)`;
    }, 20);
  }

  prevBtn.addEventListener("click", movePrev);
  nextBtn.addEventListener("click", moveNext);

  // Responsividade
  window.addEventListener("resize", updateMetrics);

  // Inicialização
  updateMetrics();
});