let changeColor = document.getElementById("changeColor");


// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log("laotie 666")
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: setPageBackgroundColor,
    });
  });
  
  // The body of this function will be executed as a content script inside the
  // current page
function setPageBackgroundColor() {
chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
});
}