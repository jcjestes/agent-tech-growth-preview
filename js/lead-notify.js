// Universal Speed-to-Lead Alert Dispatcher for Real Wolf Pack
// Dispatches lead payloads to James's personal Google Apps Script Webhook.

export const NOTIFY_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxuFPDdYZXZKuWceyxxkSZhAlCVe0oJKQdHNu9aijYKRqHM0fofsPhF9UHmDgxid8BdJw/exec";

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
