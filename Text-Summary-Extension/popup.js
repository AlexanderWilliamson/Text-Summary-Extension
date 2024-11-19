const apikeyInput = document.getElementById("apikeyInput");
document.getElementById("button").addEventListener("click", (evt) =>{
	if (!apikeyInput.value)
		return;
	
	if (!/^aiza.+$/i.test(apikeyInput.value))
		return;
	
	chrome.storage.local.set({"text-summarizer-api-key":apikeyInput.value});
	apikeyInput.value = "";
	apikeyInput.placeholder = "(Optional) Update Google Gemini API key";
});
chrome.storage.local.get("text-summarizer-api-key", (res) => {
	if (res["text-summarizer-api-key"]){
		apikeyInput.placeholder = "(Optional) Update Google Gemini API key";
	}
	else{
		apikeyInput.placeholder = "Enter Google Gemini API key";
	}
});