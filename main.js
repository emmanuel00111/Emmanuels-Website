// THEME TOGGLE
(function () {
  const root = document.documentElement;
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (storedTheme === 'light' || storedTheme === 'dark') {
    root.classList.toggle('light-theme', storedTheme === 'light');
  } else {
    // default based on system preference
    root.classList.toggle('light-theme', !prefersDark);
  }

  const toggleBtn = document.querySelector('#theme-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isLight = root.classList.toggle('light-theme');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      toggleBtn.innerText = isLight ? '🌙 Dark' : '☀️ Light';
    });

    // set correct label on load
    toggleBtn.innerText = root.classList.contains('light-theme') ? '🌙 Dark' : '☀️ Light';
  }
})();

// SCROLL PROGRESS + BACK TO TOP
(function () {
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  document.body.appendChild(progressBar);

  const backToTop = document.createElement('button');
  backToTop.id = 'back-to-top';
  backToTop.innerHTML = '↑';
  document.body.appendChild(backToTop);

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const onScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;

    if (scrollTop > 200) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', onScroll);
  onScroll();
})();

// SIMPLE FADE-IN ON SCROLL
(function () {
  const animatedEls = document.querySelectorAll('[data-animate]');
  if (!('IntersectionObserver' in window) || animatedEls.length === 0) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  animatedEls.forEach(el => observer.observe(el));
})();
