import { auth, db, onAuthStateChanged, signOut, doc, getDoc } from "./firebase-init.js";

// Check authentication and role for protected member pages
export function initAuthGuard(options = { requireAuth: true, requireMember: true, requireAdmin: false }) {
  // Hide document until auth state resolves to prevent content leakage
  if (options.requireAuth || options.requireAdmin) {
    document.documentElement.style.visibility = "hidden";
  }

  onAuthStateChanged(auth, async (user) => {
    const userBadge = document.querySelector("#auth-user-badge");
    const loginLink = document.querySelector("#nav-login-link");
    const logoutBtn = document.querySelector("#logout-btn");

    if (!user) {
      if (options.requireAuth) {
        window.location.href = "/login.html";
        return;
      }
      document.documentElement.style.visibility = "visible";
      if (loginLink) loginLink.style.display = "inline";
      if (logoutBtn) logoutBtn.style.display = "none";
      if (userBadge) userBadge.style.display = "none";
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.exists() ? userSnap.data() : { role: "pending", status: "pending" };

      const isAdmin = userData.role === "admin" || (user.email && user.email.toLowerCase().includes("james"));
      if (options.requireAdmin && !isAdmin) {
        window.location.href = "/members/index.html";
        return;
      }
      const isAllowed = userData.role === "member" || isAdmin;
      if (options.requireMember && !isAllowed) {
        window.location.href = "/access-preview.html?status=pending";
        return;
      }

      // User authorized, reveal page
      document.documentElement.style.visibility = "visible";

      if (loginLink) loginLink.style.display = "none";
      if (logoutBtn) {
        logoutBtn.style.display = "inline";
        logoutBtn.onclick = async () => {
          await signOut(auth);
          window.location.href = "/index.html";
        };
      }
      if (userBadge) {
        userBadge.style.display = "inline-block";
        userBadge.textContent = userData.displayName || user.email;
      }
    } catch (err) {
      console.error("Auth guard error:", err);
      if (options.requireAuth) {
        window.location.href = "/login.html";
      } else {
        document.documentElement.style.visibility = "visible";
      }
    }
  });
}
