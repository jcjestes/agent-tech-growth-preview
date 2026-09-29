/**
 * RealWolfPack.com · Unified Component Loader & Navigation Engine
 * Automatically hydrates Header, Dropdowns, Active States, and Footer across all pages.
 * Ensures you never have to re-write header, footer, or navigation when creating new pages.
 */

const RWP_PUBLIC_HEADER = `<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand-link" href="/" aria-label="Real Wolf Pack Home">
      <span class="brand-monogram">JJ<span>.</span></span>
      <div class="brand-text">
        <strong>REAL WOLF PACK</strong>
        <small>JAMES JESTES · eXp REALTY</small>
      </div>
    </a>
    
    <button class="nav-toggle" aria-label="Toggle navigation menu" onclick="toggleMobileNav()">
      <span></span><span></span><span></span>
    </button>
    
    <nav class="site-nav" id="site-nav">
      <!-- The Model Dropdown -->
      <div class="nav-dropdown">
        <button class="nav-drop-btn" onclick="toggleDropdown(this)">
          The Model <span class="drop-arrow">▾</span>
        </button>
        <div class="nav-drop-menu">
          <a class="drop-item" href="/exp-explained.html">
            <span class="drop-icon">📊</span>
            <div>
              <strong>eXp Realty Explained</strong>
              <small>80/20 split, $16k cap & cloud model</small>
            </div>
          </a>
          <a class="drop-item" href="/compare.html">
            <span class="drop-icon">⚖️</span>
            <div>
              <strong>Brokerage Comparison</strong>
              <small>Side-by-side vs traditional franchises</small>
            </div>
          </a>
          <a class="drop-item" href="/calculator.html">
            <span class="drop-icon">🧮</span>
            <div>
              <strong>Cap Calculator</strong>
              <small>Calculate your exact annual savings</small>
            </div>
          </a>
        </div>
      </div>

      <!-- Strategy & Niches Dropdown -->
      <div class="nav-dropdown">
        <button class="nav-drop-btn" onclick="toggleDropdown(this)">
          Strategy & Niches <span class="drop-arrow">▾</span>
        </button>
        <div class="nav-drop-menu">
          <a class="drop-item" href="/airbnb-agent.html">
            <span class="drop-icon">🌊</span>
            <div>
              <strong>STR & Condotels</strong>
              <small>Salt Air Sessions investor workflows</small>
            </div>
          </a>
          <a class="drop-item" href="/audit.html">
            <span class="drop-icon">⚡</span>
            <div>
              <strong>15-Minute Tech Audit</strong>
              <small>Free 1-on-1 CRM & pipeline diagnostic</small>
            </div>
          </a>
          <a class="drop-item" href="/free-pack.html">
            <span class="drop-icon">📦</span>
            <div>
              <strong>Free AI Prompt Pack</strong>
              <small>108 real estate AI prompts & playbooks</small>
            </div>
          </a>
        </div>
      </div>

      <!-- Direct Links -->
      <a class="nav-link-direct" href="/training/index.html">Training Hub</a>
      <a class="nav-link-direct" href="/about.html">About James</a>

      <!-- Action Buttons -->
      <div class="nav-actions">
        <a class="btn-nav-outline" href="/login.html">Member Login</a>
        <a class="btn-nav-primary" href="/request-access.html">Join The Pack ↗</a>
      </div>
    </nav>
  </div>
</header>`;

const RWP_MEMBER_HEADER = `<header class="site-header member-header">
  <div class="wrap header-inner">
    <a class="brand-link" href="/members/index.html" aria-label="Real Wolf Pack Member Portal">
      <span class="brand-monogram">JJ<span>.</span></span>
      <div class="brand-text">
        <strong>REAL WOLF PACK</strong>
        <small>MEMBER COMMAND BASE</small>
      </div>
    </a>
    
    <button class="nav-toggle" aria-label="Toggle navigation menu" onclick="toggleMobileNav()">
      <span></span><span></span><span></span>
    </button>
    
    <nav class="site-nav" id="site-nav">
      <a class="nav-link-direct" href="/members/index.html">Dashboard</a>
      <a class="nav-link-direct" href="/training/index.html">Training Hub</a>
      <a class="nav-link-direct" href="/members/downloads.html">Resource Vault</a>
      <a class="nav-link-direct" href="/members/ai-prompts.html">AI Prompts</a>
      <a class="nav-link-direct" href="/members/scripts.html">Toolkits</a>
      <a class="nav-link-direct" href="/members/master-playbook.html">Playbook</a>
      <a class="nav-link-direct" href="/members/profile.html">My Link</a>
      
      <div class="nav-actions">
        <a class="btn-nav-outline" href="/members/admin.html" id="nav-admin-link">Admin Panel</a>
        <a class="btn-nav-primary" href="/" style="background:#475569">Public Site</a>
      </div>
    </nav>
  </div>
</header>`;

const RWP_FOOTER = `<footer class="site-footer">
  <div class="wrap footer-grid">
    <div class="footer-col brand-col">
      <div class="footer-brand">
        <span class="brand-monogram">JJ<span>.</span></span>
        <strong>REAL WOLF PACK</strong>
      </div>
      <p class="footer-bio">Personal agent attraction portal and member command base operated by James Jestes, Certified eXp Mentor and Top Producing Realtor. Connecting agents into Mike Sherrard's 3,300+ Agent Wolf Pack ecosystem with direct veteran mentorship and modern systems.</p>
      <div class="footer-badges">
        <span>Top Producing Realtor</span>
        <span>15 Yrs Licensed · 25+ Yrs Investing</span>
        <span>U.S. Military Veteran</span>
      </div>
    </div>

    <div class="footer-col">
      <h4>Explore The Model</h4>
      <ul>
        <li><a href="/exp-explained.html">eXp Realty Explained</a></li>
        <li><a href="/compare.html">Brokerage Comparison Matrix</a></li>
        <li><a href="/calculator.html">Commission Split & Cap Calculator</a></li>
        <li><a href="/airbnb-agent.html">Short-Term Rentals & Condotels</a></li>
        <li><a href="/audit.html">15-Minute Tech & Marketing Audit</a></li>
        <li><a href="/free-pack.html">Free Agent AI Prompt Pack</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h4>Training & Systems</h4>
      <ul>
        <li><a href="/training/index.html">Curated Training Library</a></li>
        <li><a href="/training/real-wolf-pack-business-foundation-page.html">Business Foundation Track</a></li>
        <li><a href="/training/fast-momentum-series.html">Fast Momentum Track</a></li>
        <li><a href="/training/organic-lead-gen-series.html">Organic Inbound Track</a></li>
        <li><a href="/presentation.html">Interactive Zoom Presentation</a></li>
        <li><a href="/faq.html">Frequently Asked Questions</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h4>Organization & Access</h4>
      <ul>
        <li><a href="/request-access.html">Apply to Partner with James</a></li>
        <li><a href="/login.html">Member Sign In / Register</a></li>
        <li><a href="/privacy.html">Privacy Policy</a></li>
        <li><a href="/terms.html">Terms of Service</a></li>
        <li><a href="mailto:james@jamesjestes.com">james@jamesjestes.com</a></li>
        <li><span style="color:#94a3b8;font-size:13px">Greater Daytona & Coastal Florida</span></li>
      </ul>
    </div>
  </div>

  <div class="wrap footer-bottom">
    <p class="disclaimer">RealWolfPack.com is an independent agent attraction and member resource portal operated by James Jestes, Broker Associate with eXp Realty. Agent Wolf Pack is an organization of 3,300+ independent real estate agents within eXp Realty founded by Mike Sherrard and Connor Steinbrook. eXp Realty is an Equal Housing Opportunity brokerage. All commission math, splits, and training access are subject to eXp Realty policies.</p>
    <p class="copyright">© 2026 RealWolfPack.com. All rights reserved. Zero em dashes.</p>
  </div>
</footer>`;

function initRWPComponents() {
  const isPresentation = window.location.pathname.includes('presentation.html');
  if (isPresentation) return;

  const isMemberPage = window.location.pathname.includes('/members/');

  // 1. Inject or verify Header
  const existingHeader = document.querySelector('header.site-header');
  if (!existingHeader) {
    const headerHTML = isMemberPage ? RWP_MEMBER_HEADER : RWP_PUBLIC_HEADER;
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
  }

  // 2. Inject or verify Footer
  const existingFooter = document.querySelector('footer.site-footer');
  if (!existingFooter) {
    document.body.insertAdjacentHTML('beforeend', RWP_FOOTER);
  }

  // 3. Highlight Active Navigation Links
  const curPath = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
  document.querySelectorAll('.site-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    const aPath = href.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
    if ((curPath === '/' && aPath === '/') || (aPath !== '/' && aPath !== '#' && curPath.startsWith(aPath))) {
      a.classList.add('active');
      const drop = a.closest('.nav-dropdown');
      if (drop) {
        const btn = drop.querySelector('.nav-drop-btn');
        if (btn) btn.style.color = 'var(--orange)';
      }
    }
  });
}

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

window.toggleMobileNav = toggleMobileNav;
window.toggleDropdown = toggleDropdown;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRWPComponents);
} else {
  initRWPComponents();
}
