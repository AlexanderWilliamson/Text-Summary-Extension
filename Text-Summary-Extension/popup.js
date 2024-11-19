document.getElementById("button").addEventListener("click", function(){
	chrome.runtime.sendMessage({"type": "text-getter-selected-text", "data": "button popup!"});
});
chrome.storage.local.get("text-summarizer-api-key", (res) => {
	console.log(res);
	if (res){
		document.getElementById("apikeyInput").placeholder = "(Optional) Update OpenAI API key";
	}
	else{
		document.getElementById("apikeyInput").placeholder = "Enter OpenAI API key";
	}
});