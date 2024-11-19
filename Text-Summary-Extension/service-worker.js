chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.type !== "text-getter-selected-text")
		return;
	
	console.log(message);
	const apiKey;
	/*chrome.storage.sync.get("text-summarizer-api-key", function(res){
		if (res)
			apiKey = res;
	});*/
	
	if (!apiKey){
		sendResponse({"type": "service-worker-summary-result", "data": "Could not get apikey, click on the extension and enter apikey to run this extension"});
		return;
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
		console.log("We got to the http error check");
		if(!response.ok) {
			throw new Error(`HTTP error: ${response.status}`);
		}
		return response.json();
	}).then(data => {
		console.log("success, we are outputting the result");
		sendResponse({"type": "service-worker-summary-result", "data": data.candidates[0].content.parts[0].text});
	}).catch(error => {
		console.log("womp womp error happened");
		sendResponse({"type": "service-worker-summary-result", "data": error});
	});
	return true;
});