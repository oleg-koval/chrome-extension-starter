import { displayPageTitle } from "../domain/page-title.js";

const inspectButton = document.querySelector("#inspect");
const result = document.querySelector("#result");

if (!(inspectButton instanceof HTMLButtonElement)) {
  throw new Error("Inspect button is missing from the popup");
}

if (!(result instanceof HTMLElement)) {
  throw new Error("Result element is missing from the popup");
}

const button = inspectButton;
const status = result;

button.addEventListener("click", () => {
  void inspectActiveTab();
});

async function inspectActiveTab(): Promise<void> {
  button.disabled = true;
  status.textContent = "Reading active tab…";

  try {
    const [activeTab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });

    if (!activeTab) {
      status.textContent = "No active tab is available.";
      return;
    }

    status.textContent = displayPageTitle(activeTab.title);
  } catch (error: unknown) {
    console.error("Could not read the active tab", error);
    status.textContent = "Could not read this tab. Try a regular web page.";
  } finally {
    button.disabled = false;
  }
}
