document.addEventListener("keyup", function(event) {
	event.preventDefault();
	
	if (!(event.ctrlKey && event.altKey && event.key === 'z')) 
		return;
	
	const selectedText = window.getSelection().toString();
	
	if (!selectedText)
		return;
	
	chrome.runtime.sendMessage({"type": "text-getter-selected-text", "data": selectedText ? selectedText : ""}, (response) => {
		if (document.getElementById("iooigashoW$#Gdgsx-botdiv-textsummarydiv")){
			document.getElementById("iooigashoW$#Gdgsx-botdiv-textsummarydiv").innerHTML = response.data;
		}
		else{
			const div = document.createElement("div");
			const topdiv = document.createElement("div");
			const botdiv = document.createElement("div");
			const btn = document.createElement("button");
			const title = document.createElement("p");

			div.style = "position:fixed; top:50px; right:0px; width:25em; max-width:25em; height:25em; overflow:auto; z-index:999; background-color:white; border:3px black solid;"

			topdiv.innerHTML = "Text Summarizer";
			topdiv.style = "position:absolute; top:0px; width:98%; background-color:black; color:white; font-weight:bold; padding-left:2%";

			botdiv.innerHTML = response.data;
			botdiv.style = "position:absolute; top:20px; width:97%; white-space: normal; overflow-x:hidden; word-wrap: break-word; padding-left:2%";
			botdiv.id = "iooigashoW$#Gdgsx-botdiv-textsummarydiv";

			btn.innerHTML = "X";
			btn.style = "position:absolute; top:0px; right:0px; background:red; width:1.2em; height:1.2em; text-align:center; padding:0;";
			btn.addEventListener("click", (evt) => {div.remove();});

			topdiv.appendChild(btn);

			div.appendChild(topdiv);
			div.appendChild(botdiv);

			document.body.appendChild(div);
		}
	});
});