// Unified Site Navigation & Mobile Menu Controller
function toggleMobileNav() {
  const nav = document.querySelector('#site-nav');
  if (nav) nav.classList.toggle('open');
}

// Highlight active nav link automatically
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
  const links = document.querySelectorAll('.site-nav a');
  links.forEach(a => {
    const aPath = a.getAttribute('href').replace(/\/index\.html$/, '/').replace(/\.html$/, '');
    if ((path === '/' && aPath === '/') || (aPath !== '/' && aPath !== '#' && path.startsWith(aPath))) {
      a.classList.add('active');
    }
  });
});

window.toggleMobileNav = toggleMobileNav;
