// Unified Site Navigation & Mobile Menu Controller
function toggleMobileNav() {
  const nav = document.querySelector('#site-nav');
  if (nav) nav.classList.toggle('open');
}

function toggleDropdown(btn) {
  if (window.innerWidth <= 1080) {
    const menu = btn.nextElementSibling;
    if (menu) {
      const isVisible = menu.style.display === 'flex';
      menu.style.display = isVisible ? 'none' : 'flex';
      const arrow = btn.querySelector('.drop-arrow');
      if (arrow) arrow.style.transform = isVisible ? 'none' : 'rotate(180deg)';
    }
  }
}

// Highlight active nav link automatically
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
  const links = document.querySelectorAll('.site-nav a');
  links.forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    const aPath = href.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
    if ((path === '/' && aPath === '/') || (aPath !== '/' && aPath !== '#' && path.startsWith(aPath))) {
      a.classList.add('active');
      // If inside dropdown, highlight parent button
      const parentDrop = a.closest('.nav-dropdown');
      if (parentDrop) {
        const btn = parentDrop.querySelector('.nav-drop-btn');
        if (btn) btn.style.color = 'var(--orange)';
      }
    }
  });
});

window.toggleMobileNav = toggleMobileNav;
window.toggleDropdown = toggleDropdown;
