document.getElementById("button").addEventListener("click", function(){
	chrome.runtime.sendMessage({"type": "text-getter-selected-text", "data": "button popup!"});
});
