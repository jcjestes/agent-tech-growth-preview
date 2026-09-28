import { auth, db, onAuthStateChanged, signOut, doc, getDoc } from "./firebase-init.js";

// Check authentication and role for protected member pages
export function initAuthGuard(options = { requireAuth: true, requireMember: true }) {
  onAuthStateChanged(auth, async (user) => {
    const userBadge = document.querySelector("#auth-user-badge");
    const loginLink = document.querySelector("#nav-login-link");
    const logoutBtn = document.querySelector("#logout-btn");

    if (!user) {
      if (options.requireAuth) {
        window.location.href = "/login.html";
        return;
      }
      if (loginLink) loginLink.style.display = "inline";
      if (logoutBtn) logoutBtn.style.display = "none";
      if (userBadge) userBadge.style.display = "none";
      return;
    }

    // User is logged in, fetch user record from Firestore
    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.exists() ? userSnap.data() : { role: "pending", status: "pending" };

      if (options.requireMember && userData.role !== "member" && userData.role !== "admin") {
        // Logged in but not yet an authorized organization member
        window.location.href = "/access-preview.html?status=pending";
        return;
      }

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
    }
  });
}
