// Standard Bulma Navbar Burger & Dropdown Handler (Zero External Dependencies)
document.addEventListener('DOMContentLoaded', () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  $navbarBurgers.forEach(el => {
    el.addEventListener('click', () => {
      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      if ($target) {
        $target.classList.toggle('is-active');
      }
    });
  });

  // Dark mode theme switch handler
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const savedTheme = localStorage.getItem('tf-theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.body.classList.add('dark-theme');
      themeToggle.checked = true;
    } else if (savedTheme === 'light') {
      document.body.classList.remove('dark-theme');
      themeToggle.checked = false;
    }

    themeToggle.addEventListener('change', () => {
      if (themeToggle.checked) {
        document.body.classList.add('dark-theme');
        localStorage.setItem('tf-theme', 'dark');
      } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('tf-theme', 'light');
      }
    });
  }
});
