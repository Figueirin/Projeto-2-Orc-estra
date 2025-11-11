document.addEventListener('DOMContentLoaded', function () {
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
});
