// Standard Bulma Navbar Burger & Theme Handler (Zero External Dependencies)
(() => {
  const savedTheme = localStorage.getItem('tf-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isInitialDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

  if (isInitialDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        const active = el.classList.toggle('is-active');
        el.setAttribute('aria-expanded', String(active));
        if ($target) {
          $target.classList.toggle('is-active');
        }
      });
    });

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.checked = true;
      } else if (currentTheme === 'light') {
        document.body.classList.remove('dark-theme');
        themeToggle.checked = false;
      }

      themeToggle.addEventListener('change', () => {
        const mode = themeToggle.checked ? 'dark' : 'light';
        document.body.classList.toggle('dark-theme', themeToggle.checked);
        document.documentElement.setAttribute('data-theme', mode);
        localStorage.setItem('tf-theme', mode);
      });
    }
  });
})();
