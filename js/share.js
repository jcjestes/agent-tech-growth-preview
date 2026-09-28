export function initShareButton() {
  const shareBtns = document.querySelectorAll("[data-share-btn]");
  shareBtns.forEach((btn) => {
    btn.onclick = async (e) => {
      e.preventDefault();
      const title = document.title || "Real Wolf Pack";
      const url = window.location.href;
      const text = btn.dataset.shareText || "Check out Real Wolf Pack with James Jestes: free training, templates, and mentorship at eXp Realty.";

      if (navigator.share) {
        try {
          await navigator.share({ title, text, url });
          return;
        } catch (err) {
          // Fall back to clipboard if user dismissed or cancelled
        }
      }

      // Clipboard fallback
      navigator.clipboard.writeText(url).then(() => {
        const orig = btn.innerHTML;
        btn.innerHTML = `Link Copied! <span aria-hidden="true">✓</span>`;
        btn.style.background = "#22c55e";
        btn.style.color = "#ffffff";
        setTimeout(() => {
          btn.innerHTML = orig;
          btn.style.background = "";
          btn.style.color = "";
        }, 2000);
      });
    };
  });
}

document.addEventListener("DOMContentLoaded", initShareButton);
