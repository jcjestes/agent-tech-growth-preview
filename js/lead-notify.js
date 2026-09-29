// Universal Speed-to-Lead Alert Dispatcher for Real Wolf Pack
// Dual-writes lead payloads to personal Google Apps Script Webhook
// with graceful fallback.

export const NOTIFY_WEBHOOK_URL = ""; // Drop your Google Apps Script Web App URL here

export async function sendLeadNotification(payload) {
  if (!NOTIFY_WEBHOOK_URL) {
    console.info("Lead captured in Firestore. Note: Email webhook URL not configured yet.");
    return;
  }
  
  try {
    await fetch(NOTIFY_WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    console.log("Lead notification dispatched successfully.");
  } catch (err) {
    console.warn("Lead notification failed:", err);
  }
}
