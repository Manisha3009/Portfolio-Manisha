const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {entry.target.classList.add('visible'); observer.unobserve(entry.target);}
}), {threshold: .09});
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
const sections = document.querySelectorAll('main section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) navItems.forEach(a => a.classList.toggle('active', a.hash === '#' + entry.target.id));
}), {rootMargin:'-35% 0px -55% 0px'});
sections.forEach(section => sectionObserver.observe(section));
document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('copyEmail').addEventListener('click', async event => {
  try {
    await navigator.clipboard.writeText('manishaanbu30@gmail.com');
    event.currentTarget.textContent = 'Copied ✓';
  } catch {
    window.location.href = 'mailto:manishaanbu30@gmail.com';
  }
});

// CINEMATIC PARALLAX — graceful enhancement; respects motion preferences.
const motionAllowed = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
if (motionAllowed && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const portraitSurface = document.querySelector('.hero-visual');
  if (portraitSurface) {
    portraitSurface.addEventListener('pointermove', event => {
      const r = portraitSurface.getBoundingClientRect();
      const x = (event.clientX - r.left) / r.width - 0.5;
      const y = (event.clientY - r.top) / r.height - 0.5;
      portraitSurface.style.setProperty('--portrait-rotate-x', `${(-y * 5).toFixed(2)}deg`);
      portraitSurface.style.setProperty('--portrait-rotate-y', `${(x * 6).toFixed(2)}deg`);
    });
    portraitSurface.addEventListener('pointerleave', () => {
      portraitSurface.style.setProperty('--portrait-rotate-x', '0deg');
      portraitSurface.style.setProperty('--portrait-rotate-y', '0deg');
    });
  }
  document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.addEventListener('pointermove', event => {
      const r = card.getBoundingClientRect();
      const x = (event.clientX - r.left) / r.width - 0.5;
      const y = (event.clientY - r.top) / r.height - 0.5;
      card.style.setProperty('--tilt-x', `${(-y * 3.5).toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${(x * 4).toFixed(2)}deg`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    });
  });
}
