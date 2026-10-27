
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  const progress = document.getElementById('progress');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progress.style.width = scrolled + '%';
  });
  const glow = document.getElementById('cursorGlow');
  let gx = 0, gy = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', e => { gx = e.clientX; gy = e.clientY; glow.style.opacity = 1; });
  document.addEventListener('mouseleave', () => glow.style.opacity = 0);
  (function loop(){ cx += (gx-cx)*0.12; cy += (gy-cy)*0.12; glow.style.left = cx+'px'; glow.style.top = cy+'px'; requestAnimationFrame(loop); })();
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  const countEls = document.querySelectorAll('[data-count]');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.dataset.count);
      const isFloat = String(target).includes('.');
      const duration = 1400;
      const start = performance.now();
      function tick(now){
        const t = Math.min((now-start)/duration, 1);
        const eased = 1 - Math.pow(1-t, 3);
        const val = target * eased;
        el.textContent = isFloat ? val.toFixed(1) : Math.floor(val);
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = isFloat ? target.toFixed(1) : target;
      }
      requestAnimationFrame(tick);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  countEls.forEach(el => countObserver.observe(el));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
