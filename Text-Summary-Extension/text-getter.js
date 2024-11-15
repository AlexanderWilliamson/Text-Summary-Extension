document.addEventListener("keyup", function(event) {
  if (event.altKey && event.key === 'y') {
    const selectedText = window.getSelection().toString();
    console.log("Selected text:", selectedText);

    if (selectedText) {
      chrome.runtime.sendMessage({type: "text-getter-selected-text", data: selectedText});
    } 
	else {
      chrome.runtime.sendMessage({type: "text-getter-selected-text", data: "no text highlighted"});
    }
  }
});