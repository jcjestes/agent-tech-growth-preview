import { auth, db, onAuthStateChanged, signOut, doc, getDoc } from "./firebase-init.js";

/**
 * Universal content gate for RealWolfPack pages.
 * Handles showing the pitch overlay to unauthenticated visitors
 * and seamlessly revealing actual member assets (Drive links, Canva templates) to active members.
 */
export function initContentGate(options = {}) {
  // Inject gating CSS if not already present
  if (!document.getElementById("content-gate-styles")) {
    const style = document.createElement("style");
    style.id = "content-gate-styles";
    style.textContent = `
      .gate-overlay {
        background: linear-gradient(145deg, #102f6c, #19469D);
        border: 2px solid #F5821F;
        border-radius: 28px;
        padding: 32px 24px;
        text-align: center;
        color: #ffffff;
        box-shadow: 0 24px 60px rgba(16, 47, 108, 0.25);
        margin: 24px 0;
        position: relative;
        overflow: hidden;
      }
      .gate-overlay:before {
        content: "";
        position: absolute;
        inset: -20% -20% auto auto;
        width: 14rem;
        height: 14rem;
        background: #F5821F;
        opacity: 0.18;
        border-radius: 50%;
      }
      .gate-overlay h3 {
        color: #ffffff;
        font-size: clamp(24px, 5vw, 36px);
        line-height: 1;
        letter-spacing: -0.05em;
        margin: 10px 0 12px;
      }
      .gate-overlay h3 em {
        color: #ffd0a3;
        font-style: normal;
      }
      .gate-overlay p {
        color: #e8f0ff;
        font-size: 16px;
        max-width: 600px;
        margin: 0 auto 20px;
        line-height: 1.55;
      }
      .gate-actions {
        display: flex;
        gap: 12px;
        justify-content: center;
        flex-wrap: wrap;
      }
      .gate-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: #F5821F;
        color: #2f1700;
        border-radius: 999px;
        padding: 13px 22px;
        font-weight: 900;
        text-decoration: none;
        box-shadow: 0 10px 25px rgba(245, 130, 31, 0.3);
        transition: transform 0.18s ease;
      }
      .gate-btn:hover {
        transform: translateY(-2px);
      }
      .gate-btn.ghost {
        background: #F5E9D0;
        color: #102f6c;
        box-shadow: none;
      }
      .member-unlocked-card {
        background: #f0fdf4;
        border: 2px solid #86efac;
        border-radius: 24px;
        padding: 24px;
        margin: 20px 0;
      }
      .member-unlocked-card h4 {
        color: #166534;
        font-size: 20px;
        margin: 0 0 8px;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .member-unlocked-card p {
        color: #15803d;
        margin: 0 0 16px;
        font-size: 15px;
      }
      [data-member-content] {
        display: none;
      }
      [data-pitch-overlay] {
        display: block;
      }
      .authed [data-member-content] {
        display: block !important;
      }
      .authed [data-pitch-overlay] {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  onAuthStateChanged(auth, async (user) => {
    const nav = document.querySelector("header nav");

    if (!user) {
      document.body.classList.remove("authed");
      updateNavForPublic(nav);
      return;
    }

    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const data = userDoc.exists() ? userDoc.data() : { role: "pending" };
      const isAuthorized = data.role === "member" || data.role === "admin";

      if (isAuthorized) {
        document.body.classList.add("authed");
        updateNavForMember(nav, user, data);
      } else {
        document.body.classList.remove("authed");
        updateNavForPending(nav, user);
      }
    } catch (err) {
      console.warn("Gate auth error:", err);
      document.body.classList.remove("authed");
    }
  });
}

function updateNavForPublic(nav) {
  if (!nav) return;
  let authEl = nav.querySelector("#nav-auth-section");
  if (!authEl) {
    authEl = document.createElement("span");
    authEl.id = "nav-auth-section";
    nav.appendChild(authEl);
  }
  authEl.innerHTML = ` &nbsp; <a href="/login.html" style="font-weight:900;color:var(--dark);text-decoration:none">Login</a>`;
}

function updateNavForPending(nav, user) {
  if (!nav) return;
  let authEl = nav.querySelector("#nav-auth-section");
  if (!authEl) {
    authEl = document.createElement("span");
    authEl.id = "nav-auth-section";
    nav.appendChild(authEl);
  }
  authEl.innerHTML = `
    &nbsp; <span style="font-size:12px;background:#fef3c7;color:#92400e;padding:5px 10px;border-radius:999px;font-weight:900">Pending Review</span>
    &nbsp; <button id="btn-signout" style="border:0;background:var(--sand);color:var(--dark);padding:5px 12px;border-radius:999px;font-weight:900;cursor:pointer">Sign Out</button>
  `;
  const signout = authEl.querySelector("#btn-signout");
  if (signout) signout.onclick = () => signOut(auth).then(() => window.location.reload());
}

function updateNavForMember(nav, user, data) {
  if (!nav) return;
  let authEl = nav.querySelector("#nav-auth-section");
  if (!authEl) {
    authEl = document.createElement("span");
    authEl.id = "nav-auth-section";
    nav.appendChild(authEl);
  }
  const name = data.displayName || user.email.split("@")[0];
  const isAdmin = data.role === "admin";
  authEl.innerHTML = `
    &nbsp; ${isAdmin ? '<a href="/members/admin.html" style="background:var(--orange);color:#2f1700;padding:5px 12px;border-radius:999px;font-weight:900;text-decoration:none;font-size:12px">Admin Hub</a> &nbsp;' : ''}
    <a href="/members/index.html" style="font-weight:900;color:var(--dark);text-decoration:none">Dashboard</a> &nbsp;
    <span style="font-size:13px;font-weight:900;color:var(--orange)">Wolf Pack Member: ${name}</span> &nbsp;
    <button id="btn-signout" style="border:0;background:var(--sand);color:var(--dark);padding:5px 12px;border-radius:999px;font-weight:900;cursor:pointer">Sign Out</button>
  `;
  const signout = authEl.querySelector("#btn-signout");
  if (signout) signout.onclick = () => signOut(auth).then(() => window.location.reload());
}
