    // Small helpers
    const root = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');

    // Theme persistence
    const savedTheme = localStorage.getItem('site-theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    root.setAttribute('data-theme', savedTheme);

    function toggleTheme(){
      const cur = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', cur);
      localStorage.setItem('site-theme', cur);
      themeToggle.setAttribute('aria-pressed', cur === 'dark' ? 'false' : 'true');
    }
    themeToggle.addEventListener('click', toggleTheme);

    // Active nav as user scrolls
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = Array.from(navLinks).map(a => document.querySelector(a.getAttribute('href')));

    function onScroll(){
      const scrollY = window.scrollY + 130;
      let currentIndex = 0;
      sections.forEach((sec, i) => {
        if(sec && sec.offsetTop <= scrollY) currentIndex = i;
      });
      navLinks.forEach((a,i) => a.classList.toggle('active', i === currentIndex));
    }
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if(id.length > 1){
          e.preventDefault();
          document.querySelector(id).scrollIntoView({behavior:'smooth', block:'start'});
        }
      });
    });

    // IntersectionObserver reveal animation
    const reveals = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if(e.isIntersecting){
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, {threshold:0.12});
    reveals.forEach(el => io.observe(el));

    // small UX touches
    document.getElementById('year').textContent = new Date().getFullYear();

    // Responsive mobile toggle (optional)
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    mobileToggle?.addEventListener('click', () => {
      const nav = document.querySelector('.nav-links');
      const opened = nav.style.display === 'flex';
      nav.style.display = opened ? 'none' : 'flex';
      mobileToggle.setAttribute('aria-expanded', !opened);
    });