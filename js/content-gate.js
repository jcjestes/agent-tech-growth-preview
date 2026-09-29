import { auth, db, onAuthStateChanged, signOut, doc, getDoc } from "./firebase-init.js";

// Protected training resource vault (unlocked only after Firebase Auth verification)
const PROTECTED_RESOURCES = {
  // Cold Calling
  "cold-calling-replay": {
    url: "https://drive.google.com/file/d/1N_vH4OwsgbZ2iRT-HNxWpONvEVyAUeEo/view",
    label: "Watch Google Drive Replay"
  },
  "cold-calling-slides": {
    url: "https://drive.google.com/file/d/11amZTpi_b2bpXbIgUlpj9VBRNgfFKGoS/view?usp=sharing",
    label: "Download Presentation Slides"
  },
  // Moving Faster With AI
  "moving-faster-ai": {
    url: "https://drive.google.com/file/d/1VqGeUTsFG8Ag7eyMV0WDOkpGKa4vsGYR/view?usp=sharing",
    label: "Watch Google Drive Replay"
  },
  // Business Foundation Series
  "foundation-01": {
    url: "https://drive.google.com/file/d/1iC_pSVK_qdfZMwQ9UQsL2MUZSre7M_ft/view?usp=sharing",
    label: "Watch Training 01"
  },
  "foundation-02": {
    url: "https://drive.google.com/file/d/1ADWwQw--jC-SwYUb57rO02zdB-5x4pa5/view?usp=sharing",
    label: "Watch Training 02"
  },
  "foundation-03": {
    url: "https://drive.google.com/file/d/1t7U_Qj77uFDxuUTJBsXg0YBUD8_MgtAi/view?usp=sharing",
    label: "Watch Training 03"
  },
  "foundation-04": {
    url: "https://drive.google.com/file/d/1GzxFswdJRzG5MoS_3twTn_VFxzdA5xMu/view?usp=sharing",
    label: "Watch Training 04"
  },
  // Fast Momentum Series
  "momentum-01": {
    url: "https://drive.google.com/file/d/1RRbOCPM-uC5ps_PEmSmwTlNBQYFLDqCy/view?usp=sharing",
    label: "Watch Training 01"
  },
  "momentum-02": {
    url: "https://drive.google.com/file/d/1NMU3NAgcGHof_yZUvGmrHL8TAewLPNGw/view?usp=sharing",
    label: "Watch Training 02"
  },
  "momentum-03": {
    url: "https://drive.google.com/file/d/1ia_9bkot-fQAnVjRqJPYL0ksiQxfHhoJ/view?usp=sharing",
    label: "Watch Training 03"
  },
  "momentum-04": {
    url: "https://drive.google.com/file/d/1z7T-bwfKvWdH_WzvUtj1GhJ_rbwZUDmE/view?usp=sharing",
    label: "Watch Training 04"
  },
  // Organic Lead Gen Series
  "organic-01": {
    url: "https://drive.google.com/file/d/1Ha3H7KyMOLQEvqfgbY4Xgwm7NFLkFgBd/view?usp=sharing",
    label: "Watch Training 01"
  },
  "organic-02": {
    url: "https://drive.google.com/file/d/1vUSudyB5arbx8VcrNCp08N-RK661Aneh/view?usp=sharing",
    label: "Watch Training 02"
  },
  "organic-03": {
    url: "https://drive.google.com/file/d/1iQ-OJDPngPmvJasZIRuSBg85MhtalrLy/view?usp=sharing",
    label: "Watch Training 03"
  },
  "organic-04": {
    url: "https://drive.google.com/file/d/1m1YFEy3QA0e6MgpYWN3zzvl1bkdGCIgM/view?usp=sharing",
    label: "Watch Training 04"
  }
};

/**
 * Universal content gate for RealWolfPack pages.
 * Ensures zero raw Google Drive or proprietary links exist in public HTML.
 * Dynamically unlocks and injects links only for verified organization members.
 */
export function initContentGate(options = {}) {
  // Ensure default locked state on initial load
  lockAllProtectedLinks();

  onAuthStateChanged(auth, async (user) => {
    const nav = document.querySelector("header nav");

    if (!user) {
      document.body.classList.remove("authed");
      lockAllProtectedLinks();
      updateNavForPublic(nav);
      return;
    }

    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const data = userDoc.exists() ? userDoc.data() : { role: "pending" };
      const isAuthorized = ((data.role === "member" || data.role === "admin") && data.status === "active") || user.email === "james@jamesjestes.com";

      if (isAuthorized) {
        document.body.classList.add("authed");
        unlockAllProtectedLinks();
        updateNavForMember(nav, user, data);
      } else {
        document.body.classList.remove("authed");
        lockAllProtectedLinks();
        updateNavForPending(nav, user);
      }
    } catch (err) {
      console.warn("Gate auth verification failed:", err);
      document.body.classList.remove("authed");
      lockAllProtectedLinks();
    }
  });
}

function lockAllProtectedLinks() {
  document.querySelectorAll("[data-resource-key]").forEach((el) => {
    const isInsideMemberOnlySection = el.closest("[data-member-content]");
    if (isInsideMemberOnlySection) {
      el.removeAttribute("href");
      el.style.display = "none";
      return;
    }
    el.href = "/access-preview.html";
    el.target = "_self";
    el.rel = "";
    el.innerHTML = `Member access required to watch <span aria-hidden="true">↗</span>`;
  });
}

function unlockAllProtectedLinks() {
  document.querySelectorAll("[data-resource-key]").forEach((el) => {
    const key = el.dataset.resourceKey;
    const item = PROTECTED_RESOURCES[key];
    if (item) {
      el.href = item.url;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
      el.style.display = "inline-flex";
      const customLabel = el.dataset.unlockLabel || item.label;
      el.innerHTML = `${customLabel} <span aria-hidden="true">↗</span>`;
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
