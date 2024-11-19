chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.type !== "text-getter-selected-text")
		return;
	
	let apiKey = "";
	chrome.storage.local.get("text-summarizer-api-key", (res) => {
		if (res)
			apiKey = res["text-summarizer-api-key"];
		
		if (!apiKey){
			sendResponse({"type": "service-worker-summary-result", "data": "Could not get apikey, click on the extension and enter your Google Gemini API key to run this extension"});
			return true;
		}
		
		const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
		
		fetch(url, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				"contents": [
					{
						"parts": [
							{
								"text": `Summarize the following text: \"${message.data}\"`
							}
						]
					}
				]
			})
		}).then(response => {
			if(!response.ok) {
				throw new Error(`HTTP error: ${response.status}`);
			}
			return response.json();
		}).then(data => {
			sendResponse({"type": "service-worker-summary-result", "data": data.candidates[0].content.parts[0].text});
		}).catch(error => {
			sendResponse({"type": "service-worker-summary-result", "data": error});
		});
		return true;
	});
	return true;
});